import { Stream } from 'openai/streaming';
import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../../openai/service/open-ai.service';
import { ChatCompletionChunk } from 'openai/resources/chat';
import { Socket } from 'socket.io';

@Injectable()
export class CharacterService {
  constructor(private readonly openAIService: OpenAiService) {}
  async handlePrompt(input: string, client: Socket): Promise<void> {
    const resultStream: Stream<ChatCompletionChunk> =
      await this.openAIService.completeWithStream(input);

    for await (const part of resultStream) {
      console.log(part.choices[0]?.delta?.content);
      client.emit('prompt', part.choices[0]?.delta?.content || '');
    }
  }
}
