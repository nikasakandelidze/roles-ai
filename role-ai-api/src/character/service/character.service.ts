import { Stream } from 'openai/streaming';
import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../../openai/service/open-ai.service';
import { ChatCompletionChunk } from 'openai/resources/chat';
import { Server } from 'socket.io';

@Injectable()
export class CharacterService {
  constructor(private readonly openAIService: OpenAiService) {}
  async handlePrompt(input: string, server: Server): Promise<void> {
    const resultStream: Stream<ChatCompletionChunk> =
      await this.openAIService.completeWithStream(input);
    for await (const part of resultStream) {
      server.emit('message', part.choices[0]?.delta?.content || '');
    }
  }
}
