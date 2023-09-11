import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionChunk } from 'openai/resources/chat';
import { Stream } from 'openai/streaming';

@Injectable()
export class OpenAiService {
  private openAiClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAiClient = new OpenAI({
      apiKey: this.configService.get('OPENAI_KEY'),
    });
  }

  async completeWithStream(
    input: string,
  ): Promise<Stream<ChatCompletionChunk>> {
    return this.openAiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [{ role: 'user', content: input }],
    });
  }
}
