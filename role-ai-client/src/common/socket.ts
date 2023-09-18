import { Socket, io } from "socket.io-client";
import { MESSAGE_TOPIC } from "../state/sessions";

const URL = "http://localhost:3001";

class SocketService {
  private socket: Socket | null = null;
  private messageListeners: ((message: string) => void)[] = [];

  connect(initHandler?: (message: string) => void) {
    if (!this.socket) {
      this.socket = io(URL);
      initHandler && this.messageListeners.push(initHandler);
      this.socket.on(MESSAGE_TOPIC, (message: string) => {
        this.handleMessage(message);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  send(message: string, topic: string) {
    if (this.socket) {
      this.socket.emit(topic, message);
    }
  }

  addMessageListener(listener: (message: string) => void) {
    this.messageListeners.push(listener);
  }

  // Handle incoming messages
  private handleMessage(message: string) {
    this.messageListeners.forEach((listener) => listener(message));
  }
}

export const socketService = new SocketService();
