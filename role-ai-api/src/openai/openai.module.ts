import { Module } from '@nestjs/common';
import { OpenAiService as OpenAIService } from './service/open-ai.service';

@Module({
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
