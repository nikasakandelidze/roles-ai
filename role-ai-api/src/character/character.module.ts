import { Module } from "@nestjs/common";
import { CharacterController } from "./controller/character.controller";
import { OpenAIModule } from "../openai/openai.module";
import { CharacterService } from "./service/character.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Character } from "./entities/character.entity";

@Module({
  imports: [OpenAIModule, TypeOrmModule.forFeature([Character])],
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [TypeOrmModule],
})
export class CharacterModule {}
