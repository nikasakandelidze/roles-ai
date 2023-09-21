import { Module } from "@nestjs/common";
import { ChatModule } from "../chat/chat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Session } from "./entities/session.entity";
import { SessionService } from "./service/session.service";
import { SessionController } from "./controller/session.controller";
import { SessionGateway } from "./controller/session.gateway";
import { OpenAIModule } from "../openai/openai.module";
import { TaskQueueModule } from "../task-queue/task-queue.module";

@Module({
  imports: [
    ChatModule,
    OpenAIModule,
    TypeOrmModule.forFeature([Session]),
    TaskQueueModule,
  ],
  exports: [TypeOrmModule],
  providers: [SessionService, SessionGateway],
  controllers: [SessionController],
})
export class SessionModule {}
