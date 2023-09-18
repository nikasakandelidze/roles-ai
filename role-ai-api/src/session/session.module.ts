import { Module } from "@nestjs/common";
import { ChatModule } from "../chat/chat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Session } from "./entities/session.entity";
import { SessionService } from "./service/session.service";
import { SessionController } from "./controller/session.controller";
import { SessionGateway } from "./controller/session.gateway";
import { OpenAIModule } from "../openai/openai.module";

@Module({
  imports: [ChatModule, OpenAIModule, TypeOrmModule.forFeature([Session])],
  exports: [TypeOrmModule],
  providers: [SessionService, SessionGateway],
  controllers: [SessionController],
})
export class SessionModule {}
