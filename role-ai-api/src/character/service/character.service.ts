import { FilterCharacterDto } from './../dto/filter-character.dto';
import { Stream } from 'openai/streaming';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenAiService } from '../../openai/service/open-ai.service';
import { ChatCompletionChunk } from 'openai/resources/chat';
import { Socket } from 'socket.io';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { Character } from '../entities/character.entity';
import { DataSource, EntityManager } from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Injectable()
export class CharacterService {
  constructor(
    private readonly openAIService: OpenAiService,
    private readonly dataSource: DataSource,
  ) {}
  async handlePrompt(input: string, client: Socket): Promise<void> {
    const resultStream: Stream<ChatCompletionChunk> =
      await this.openAIService.completeWithStream(input);

    for await (const part of resultStream) {
      console.log(part.choices[0]?.delta?.content);
      client.emit('prompt', part.choices[0]?.delta?.content || '');
    }
  }

  async createCharacter(
    userId: string,
    createCharacterDto: CreateCharacterDto,
  ): Promise<Character> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user: User = await entityManager.findOneBy(User, { id: userId });
      if (!user) {
        throw new BadRequestException('User with specified id not found');
      }
      const character: Character = await entityManager.findOneBy(Character, {
        name: createCharacterDto.name,
      });
      if (character) {
        throw new BadRequestException(
          'Character with specified name already exists',
        );
      }
      return await entityManager.save(
        entityManager.create(Character, { ...createCharacterDto, user: user }),
      );
    });
  }

  async filterCharacters(filter: FilterCharacterDto): Promise<Character[]> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user: User = await entityManager.findOneBy(User, {
        id: filter.userId,
      });
      if (!user) {
        throw new BadRequestException('User with specified id not found');
      }
      return entityManager.find(Character, {
        where: { user: { id: user.id } },
        relations: ['user'],
      });
    });
  }
}
