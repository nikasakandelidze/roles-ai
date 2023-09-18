import { Module } from "@nestjs/common";
import { Chat } from "./entities/chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatService } from "./service/chat.service";

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatService],
  exports: [ChatService, TypeOrmModule],
})
export class ChatModule {}
