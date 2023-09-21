import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

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
}

export type PromptSuggestions = {
  array: {
    content: string;
    metadata?: string;
  }[];
};
