import { BadRequestException, Injectable } from "@nestjs/common";
import { StartSessionDto } from "../dto/start-session.dto";
import { Session } from "../entities/session.entity";
import { DataSource, EntityManager } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Character } from "../../character/entities/character.entity";
import { ChatService } from "../../chat/service/chat.service";
import { Chat } from "../../chat/entities/chat.entity";
import { Stream } from "openai/streaming";
import { ChatCompletion, ChatCompletionChunk } from "openai/resources/chat";
import { Socket } from "socket.io";
import {
  OpenAIChatInput,
  OpenAiService,
} from "../../openai/service/open-ai.service";
import { ChatMessageDto } from "../dto/chat-message.dto";
import { FilterSession } from "../dto/filter-session.dto";
import { SUMMARY_PROMPT } from "../../utils/constants";

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
          isSystemMessage: true,
        },
        entityManager,
      );
      const resultSession: Session = await entityManager.findOne(Session, {
        where: { id: session.id },
        relations: ["user", "chat", "character"],
      });
      const { password, ...rest } = resultSession.user;
      return { ...resultSession, user: { ...rest } };
    });
  }

  async filterSessions(
    filterSessionDto: FilterSession,
  ): Promise<{ sessions: Session[] }> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user: User = await entityManager.findOneBy(User, {
        id: filterSessionDto.userId,
      });
      if (!user) {
        throw new BadRequestException("Specified user not found");
      }
      const sessions: Session[] = await entityManager.find(Session, {
        where: { user: { id: filterSessionDto.userId } },
        relations: ["user", "chat", "character"],
      });
      return { sessions: sessions };
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
      const { password, ...rest } = session.user;
      return { ...session, user: { ...rest } };
    });
  }

  async finishSession(sessionId: string, userId: string): Promise<Session> {
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
      const summary: string = await this.summarizeConversation(session.chat);
      const summaryJSON = JSON.parse(summary);
      await entityManager.update(
        Session,
        { id: session.id },
        { discussionTopics: summaryJSON },
      );
      return { ...session, discussionTopics: summaryJSON };
    });
  }

  async summarizeConversation(chat: Chat[]): Promise<string> {
    const input = [
      ...chat.map((e: Chat) => {
        return {
          role: e.isSystemMessage ? "system" : e.isBot ? "assistant" : "user",
          content: e.content,
        };
      }),
      { role: "user", content: SUMMARY_PROMPT },
    ] as OpenAIChatInput[];
    const result: ChatCompletion = await this.openAiService.generateOutput(
      input,
    );
    return result.choices[0].message.content;
  }

  async handleChatMessage(
    chatMessage: ChatMessageDto,
    client: Socket,
  ): Promise<void> {
    this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user: User = await entityManager.findOneBy(User, {
        id: chatMessage.userId,
      });
      if (user) {
        const session: Session = await entityManager.findOne(Session, {
          where: { id: chatMessage.sessionId },
          relations: ["user"],
        });
        if (session && session.user.id === chatMessage.userId) {
          const userChat: Chat = await entityManager.save(
            entityManager.create(Chat, {
              ...chatMessage,
              content: chatMessage.chat.content,
              author: user,
              session,
            }),
          );
          client.emit("USER_CHAT_UPDATE", userChat);
          const sessionChat: Chat[] = await entityManager.find(Chat, {
            where: { session: { id: session.id } },
            order: { createdAt: "ASC" },
          });
          await this.generateOutput(
            sessionChat,
            client,
            user,
            session,
            entityManager,
          );
        }
      }
    });
  }

  private async generateOutput(
    chat: Chat[],
    client: Socket,
    user: User,
    session: Session,
    entityManager?: EntityManager,
  ) {
    const resultStream: Stream<ChatCompletionChunk> =
      await this.openAiService.generateStreamingOutput(chat);

    let responseText = "";

    for await (const part of resultStream) {
      const text: string = part.choices[0]?.delta?.content || "";
      console.log(text);
      client.emit("CHAT_OUTPUT", text);
      responseText += text;
    }

    if (entityManager) {
      const chat: Chat = await entityManager.save(
        entityManager.create(Chat, {
          author: user,
          content: responseText,
          isBot: true,
          session,
        }),
      );
      client.emit("CHAT_OUTPUT_FINISH", chat);
    }
  }
}
