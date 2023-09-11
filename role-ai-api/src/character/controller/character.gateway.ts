import { CharacterService } from './../service/character.service';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CharacterGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

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

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): void {
    this.characterService.handlePrompt(JSON.parse(data)['prompt'], this.server);
  }
}
