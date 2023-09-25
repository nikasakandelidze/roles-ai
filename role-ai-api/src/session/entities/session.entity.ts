import { Character } from "./../../character/entities/character.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Chat } from "../../chat/entities/chat.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  title: string;

  @ManyToOne(() => Character, (character) => character.sessions)
  character: Character;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @OneToMany(() => Chat, (chat) => chat.session)
  chat: Chat[];

  @Column({ type: "jsonb", nullable: true })
  discussionTopics: DiscussionTopics[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}

export type DiscussionTopics = {
  topic: string;
};
