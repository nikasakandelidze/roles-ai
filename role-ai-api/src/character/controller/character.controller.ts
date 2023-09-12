import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { AuthGuard, JwtPayload } from '../../utils/crypto.service';
import { CharacterService } from '../service/character.service';
import { CreateCharacterDto } from '../dto/create-character.dto';

@Controller()
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(AuthGuard)
  @Post('/api/character')
  async createNewCharacter(
    @Request() request: any,
    @Body() createCharacterDto: CreateCharacterDto,
  ): Promise<any> {
    const jwtPayload: JwtPayload = request['user'];
    return this.characterService.createCharacter(
      jwtPayload.sub,
      createCharacterDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/api/character')
  async filterCharacters(@Request() request: any): Promise<any> {
    const jwtPayload: JwtPayload = request['user'];
    return this.characterService.filterCharacters({ userId: jwtPayload.sub });
  }
}
