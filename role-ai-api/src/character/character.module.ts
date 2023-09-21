import { Module } from "@nestjs/common";
import { CharacterController } from "./controller/character.controller";
import { OpenAIModule } from "../openai/openai.module";
import { CharacterService } from "./service/character.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Character } from "./entities/character.entity";
import { TaskQueueModule } from "../task-queue/task-queue.module";
import { CharacterTaskConsumer } from "./service/character-task-consumer.service";

@Module({
  imports: [
    OpenAIModule,
    TypeOrmModule.forFeature([Character]),
    TaskQueueModule,
  ],
  providers: [CharacterService, CharacterTaskConsumer],
  controllers: [CharacterController],
  exports: [TypeOrmModule],
})
export class CharacterModule {}
