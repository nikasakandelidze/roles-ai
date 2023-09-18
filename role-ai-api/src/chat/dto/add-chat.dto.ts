export class AddChatDto {
  content: string;
  sessionId: string;
  userId?: string | null; //if null then it's bot/AI
  visible?: boolean;
  isSystemMessage?: boolean;
}
