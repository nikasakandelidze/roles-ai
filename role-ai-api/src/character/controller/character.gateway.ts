import { Logger } from '@nestjs/common';
import { CharacterService } from './../service/character.service';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CharacterGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  /*
    The difference between client.emit() and server.emit() is actually interesting. Research what are other use cases for each.
  */
  @WebSocketServer()
  server: Server;

  private readonly logger: Logger = new Logger(CharacterGateway.name);

  constructor(private readonly characterService: CharacterService) {}

  handleDisconnect(client: any) {
    console.log('Websocket disconnected');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Websocket connection initialized');
  }

  afterInit(server: any) {
    console.log('Websocket server initialized');
  }

  @SubscribeMessage('prompt')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): any {
    if (!data) {
      this.logger.log('No data provided for websocket connection');
      return { message: 'Payload not provided' };
    }
    const jsonData: object = JSON.parse(data);
    const prompt = jsonData['prompt'];
    if (!prompt) {
      this.logger.log('No prompt provided');
      return { message: 'Prompt parameter not provided' };
    }
    this.characterService.handlePrompt(prompt, client);
  }
}
