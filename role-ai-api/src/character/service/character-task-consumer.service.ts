import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { DataSource, EntityManager } from "typeorm";
import { Task } from "../../task-queue/entities/task.entity";
import {
  FILL_IN_SUGGESTED_PROMPTS,
  TASK_QUEUE_TOPICS,
} from "../../utils/constants";
import { OpenAiService } from "../../openai/service/open-ai.service";
import { Character } from "../entities/character.entity";
import { ChatCompletion } from "openai/resources/chat";

@Injectable()
export class CharacterTaskConsumer {
  private logger = new Logger(CharacterTaskConsumer.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly openAiService: OpenAiService,
  ) {}

  @Interval(10000)
  async handleCharacterFillSuggestionsTask() {
    this.logger.log("Starting cron job for task consumption");
    this.dataSource.transaction(async (entityManager: EntityManager) => {
      const tasks: Task[] = await entityManager.find(Task, {
        where: {
          type: TASK_QUEUE_TOPICS.CHARACTER_SUGGESTED_PROMPTS_FILL,
          done: false,
        },
      });
      for (const task of tasks) {
        const details: { character: Character } = task.data as {
          character: Character;
        };
        const id: string = details.character.id;
        const character: Character = await entityManager.findOne(Character, {
          where: { id },
        });
        if (!character) {
          console.log("Denying task, character couldn't be found");
          await entityManager.update(Task, { id: task.id }, { denied: true });
        }
        const output: ChatCompletion = await this.openAiService.generateOutput([
          {
            role: "user",
            content: FILL_IN_SUGGESTED_PROMPTS(
              character.context,
              character.audience,
            ),
          },
        ]);
        const outputContent = output.choices[0].message.content;
        const idx1 = outputContent.indexOf("1");
        const idx2 = outputContent.indexOf("2");
        const idx3 = outputContent.indexOf("3");
        const idx4 = outputContent.indexOf("4");
        const data: string[] = [
          outputContent.slice(idx1 + 1, idx2),
          outputContent.slice(idx2 + 1, idx3),
          outputContent.slice(idx3 + 1, idx4),
          outputContent.slice(idx4 + 1),
        ];
        await entityManager.update(
          Character,
          { id: character.id },
          {
            suggestedPrompts: {
              array: data.map((s) => ({
                content: s
                  .trim()
                  .replace(/"/g, "")
                  .trim()
                  .replace(".", "")
                  .trim(),
              })),
            },
          },
        );
        await entityManager.update(Task, { id: task.id }, { done: true });
      }
    });
  }
}
