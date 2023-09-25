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
import { Session } from "../../session/entities/session.entity";

@Entity()
export class Character {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  context: string;

  @Column({ nullable: true })
  audience: string;

  @Column({ name: "character_image", nullable: true })
  characterImage: string;

  @ManyToOne(() => User, (user) => user.characters)
  user: User;

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

  @Column({ nullable: true, type: "jsonb" })
  suggestedPrompts: PromptSuggestions;

  @OneToMany(() => Session, (session) => session.character)
  sessions: Session[];
}

export type PromptSuggestions = {
  array: {
    content: string;
    metadata?: string;
  }[];
};
