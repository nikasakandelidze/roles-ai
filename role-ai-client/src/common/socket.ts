import { Socket, io } from "socket.io-client";
import {
  BOT_FINISH_CHAT_UPDATE,
  BOT_MESSAGE_TOPIC_OUTPUT,
  USER_LATEST_CHAT_UPDATE,
} from "../state/sessions";
import { Chat, ChatMessageInput } from "./model";

const URL = "http://localhost:3001";

class SocketService {
  private socket: Socket | null = null;
  private botChatUpdateListeners: ((message: string) => void)[] = [];
  private userLastChatUpdateListeners: ((chat: Chat) => void)[] = [];
  private botFinishChatUpdateListeners: ((chat: Chat) => void)[] = [];

  connect(
    initHandler?: (message: string) => void,
    latestUserChatUpdateHandler?: (chat: Chat) => void,
    botChatOutputFinishedHandler?: (chat: Chat) => void,
  ) {
    if (!this.socket) {
      this.socket = io(URL);

      initHandler && this.botChatUpdateListeners.push(initHandler);

      latestUserChatUpdateHandler &&
        this.userLastChatUpdateListeners.push(latestUserChatUpdateHandler);

      botChatOutputFinishedHandler &&
        this.botFinishChatUpdateListeners.push(botChatOutputFinishedHandler);

      this.socket.on(BOT_MESSAGE_TOPIC_OUTPUT, (message: string) => {
        this.botChatUpdateListeners.forEach((listener) => listener(message));
      });

      this.socket.on(USER_LATEST_CHAT_UPDATE, (chat: Chat) => {
        this.userLastChatUpdateListeners.forEach((listener) => listener(chat));
      });

      this.socket.on(BOT_FINISH_CHAT_UPDATE, (chat: Chat) => {
        this.botFinishChatUpdateListeners.forEach((listener) => listener(chat));
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  send(message: ChatMessageInput, topic: string) {
    if (this.socket) {
      this.socket.emit(topic, message);
    }
  }

  addMessageListener(listener: (message: string) => void) {
    this.botChatUpdateListeners.push(listener);
  }
}

export const socketService = new SocketService();
