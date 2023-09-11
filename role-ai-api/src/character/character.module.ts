import { Module } from '@nestjs/common';
import { CharacterGateway } from './controller/character.gateway';
import { CharacterController } from './controller/character.controller';
import { OpenAIModule } from '../openai/openai.module';
import { CharacterService } from './service/character.service';

@Module({
  imports: [OpenAIModule],
  providers: [CharacterGateway, CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
