import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Character } from "../../character/entities/character.entity";
import { Session } from "../../session/entities/session.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ name: "first_name", nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  lastName: string;

  @Column({ name: "password", nullable: true })
  password?: string;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({
    name: "is_active",
    nullable: false,
    default: true,
    type: "boolean",
  })
  isActive: boolean;

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

  @Column({ name: "auth_token", nullable: true })
  authToken: string;

  @Column({ name: "access_token", nullable: true })
  accessToken: string;

  @Column({ name: "profile_image", nullable: true })
  profileImageLink: string;

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session;
}
