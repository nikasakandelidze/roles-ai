import { Controller, Post } from '@nestjs/common';

@Controller()
export class CharacterController {
  @Post('api/character')
  async createNewCharacter(): Promise<any> {
    return { invoked: true };
  }
}
