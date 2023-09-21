import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionChunk } from "openai/resources/chat";
import { Stream } from "openai/streaming";
import { Chat } from "../../chat/entities/chat.entity";

export type OpenAIChatInput = {
  content: string;
  role: "system" | "user" | "assistant";
};

@Injectable()
export class OpenAiService {
  private openAiClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAiClient = new OpenAI({
      apiKey: this.configService.get("OPENAI_KEY"),
    });
  }

  async generateStreamingOutput(
    chatMessages: Chat[],
  ): Promise<Stream<ChatCompletionChunk>> {
    return this.openAiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: chatMessages.map((chat: Chat) => {
        return {
          role: chat.isSystemMessage
            ? "system"
            : chat.isBot
            ? "assistant"
            : "user",
          content: chat.content,
        };
      }),
    });
  }

  async generateOutput(inputs: OpenAIChatInput[]): Promise<ChatCompletion> {
    return this.openAiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: inputs,
    });
  }
}
