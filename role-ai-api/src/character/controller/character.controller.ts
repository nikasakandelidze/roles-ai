import { Controller, Get } from '@nestjs/common';

@Controller()
export class CharacterController {
  @Get('api/data')
  async test(): Promise<any> {
    return { invoked: true };
  }
}
