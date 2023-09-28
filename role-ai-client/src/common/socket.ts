import { Socket, io } from "socket.io-client";

const URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export type SocketListenerData = {
  topic: string;
  handler: (input: any) => void;
};

export class SocketService {
  private socket: Socket | null = null;
  private handlers: SocketListenerData[] = [];

  connect(initialHandler?: SocketListenerData[]) {
    if (!this.socket) {
      this.socket = io(URL);
      initialHandler && this.handlers.push(...initialHandler);

      this.handlers.forEach((handlerData: SocketListenerData) => {
        this.socket?.on(handlerData.topic, handlerData.handler);
      });
    }
  }

  addHandler = (socketHandler: SocketListenerData) => {
    this.handlers.push(socketHandler);
  };

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  send(message: any, topic: string) {
    if (this.socket) {
      this.socket.emit(topic, message);
    }
  }
}
