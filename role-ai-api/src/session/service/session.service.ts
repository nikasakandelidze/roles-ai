import { BadRequestException, Injectable } from "@nestjs/common";
import { StartSessionDto } from "../dto/start-session.dto";
import { Session } from "../entities/session.entity";
import { DataSource, EntityManager } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Character } from "../../character/entities/character.entity";
import { ChatService } from "../../chat/service/chat.service";
import { Chat } from "../../chat/entities/chat.entity";
import { Stream } from "openai/streaming";
import { ChatCompletionChunk } from "openai/resources/chat";
import { Socket } from "socket.io";
import { OpenAiService } from "../../openai/service/open-ai.service";

@Injectable()
export class SessionService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly chatService: ChatService,
    private readonly openAiService: OpenAiService,
  ) {}

  async startSession(startSessionDto: StartSessionDto): Promise<Session> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user: User = await entityManager.findOneBy(User, {
        id: startSessionDto.userId,
      });
      if (!user) {
        throw new BadRequestException("Specified user not found");
      }
      const character: Character = await entityManager.findOneBy(Character, {
        id: startSessionDto.characterId,
      });
      if (!character) {
        throw new BadRequestException("Specified character not found");
      }
      const session: Session = await entityManager.save(
        entityManager.create(Session, { user, character }),
      );
      await this.chatService.addNewChat(
        {
          sessionId: session.id,
          content: `${character.context} and ${character.audience}`,
          visible: false,
        },
        entityManager,
      );
      return session;
    });
  }

  async getSessionById(sessionId: string, userId: string): Promise<Session> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const session: Session = await entityManager.findOne(Session, {
        where: { id: sessionId },
        relations: ["user", "character", "chat"],
      });
      if (!session) {
        throw new BadRequestException("Specified session not found");
      }
      if (session.user.id !== userId) {
        throw new BadRequestException(
          "Specified user don't have permissions to access this session",
        );
      }
      session.chat.sort(
        (a: Chat, b: Chat) => a.createdAt.getTime() - b.createdAt.getTime(),
      );
      return session;
    });
  }

  async handlePrompt(input: string, client: Socket): Promise<void> {
    const resultStream: Stream<ChatCompletionChunk> =
      await this.openAiService.completeWithStream(input);

    let responseText = "";

    for await (const part of resultStream) {
      console.log(part.choices[0]?.delta?.content);
      const text: string = part.choices[0]?.delta?.content || "";
      client.emit("prompt", text);
      responseText += text;
    }
  }
}
