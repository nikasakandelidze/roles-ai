import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";
import { SessionService } from "../service/session.service";
import { ChatMessageDto } from "../dto/chat-message.dto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class SessionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger(SessionGateway.name);

  /*
    The difference between client.emit() and server.emit() is actually interesting. Research what are other use cases for each.
  */
  @WebSocketServer()
  server: Server;

  constructor(private readonly sessionService: SessionService) {}

  handleDisconnect(client: any) {
    console.log("Websocket disconnected");
  }

  handleConnection(client: any, ...args: any[]) {
    console.log("Websocket connection initialized");
  }

  afterInit(server: any) {
    console.log("Websocket server initialized");
  }

  @SubscribeMessage("CHAT_INPUT")
  handleEvent(
    @MessageBody() data: ChatMessageDto,
    @ConnectedSocket() client: Socket,
  ): any {
    if (!data) {
      this.logger.log("No data provided for websocket connection");
      return { message: "Payload not provided" };
    }
    console.log(data);
    // const chatData: ChatMessageDto = JSON.parse(data) as ChatMessageDto;
    console.log(data);
    this.sessionService.handleChatMessage(data, client);
  }
}
