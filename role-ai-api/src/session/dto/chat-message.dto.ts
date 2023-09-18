export class ChatMessageDto {
  sessionId: string;
  userId: string;
  chat: { content: string };
}
