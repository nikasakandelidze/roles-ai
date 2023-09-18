import { BadRequestException, Injectable } from "@nestjs/common";
import { AddChatDto } from "../dto/add-chat.dto";
import { DataSource, EntityManager } from "typeorm";
import { Chat } from "../entities/chat.entity";
import { User } from "../../user/entities/user.entity";
import { Session } from "../../session/entities/session.entity";

@Injectable()
export class ChatService {
  constructor(private readonly dataSource: DataSource) {}

  async addNewChat(addChatDto: AddChatDto, em?: EntityManager): Promise<Chat> {
    if (em) {
      return this.addNewChatHelper(addChatDto, em);
    } else {
      return this.dataSource.transaction(
        async (entityManager: EntityManager) => {
          return this.addNewChatHelper(addChatDto, entityManager);
        },
      );
    }
  }

  private async addNewChatHelper(
    addChatDto: AddChatDto,
    entityManager: EntityManager,
  ) {
    const user: User = await entityManager.findOne(User, {
      where: { id: addChatDto.userId },
    });
    if (!user) {
      throw new BadRequestException("User with specified id not found");
    }
    const session: Session = await entityManager.findOneBy(Session, {
      id: addChatDto.sessionId,
    });
    if (!session) {
      throw new BadRequestException("Specified session not found");
    }
    const chat: Chat = await entityManager.save(
      entityManager.create(Chat, { ...addChatDto, author: user, session }),
    );
    return chat;
  }
}
