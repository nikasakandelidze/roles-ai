import { OpenAiService } from "./../openai/service/open-ai.service";
import { Module } from "@nestjs/common";
import { ChatModule } from "../chat/chat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Session } from "./entities/session.entity";
import { SessionService } from "./service/session.service";
import { SessionController } from "./controller/session.controller";
import { SessionGateway } from "./controller/session.gateway";

@Module({
  imports: [ChatModule, OpenAiService, TypeOrmModule.forFeature([Session])],
  exports: [TypeOrmModule],
  providers: [SessionService, SessionGateway],
  controllers: [SessionController],
})
export class SessionModule {}
