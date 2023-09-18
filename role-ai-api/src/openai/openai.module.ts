import { Module } from "@nestjs/common";
import { OpenAiService as OpenAIService } from "./service/open-ai.service";
import { ChatModule } from "../chat/chat.module";

@Module({
  imports: [ChatModule],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
