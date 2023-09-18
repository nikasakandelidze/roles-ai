import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Session } from "../../session/entities/session.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  author: User;

  @Column({
    nullable: false,
    default: false,
  })
  isBot: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isSystemMessage: boolean;

  @Column({
    nullable: false,
  })
  content: string;

  @Column({
    nullable: false,
    default: true,
  })
  visible: boolean;

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

  @ManyToOne(() => Session, (session) => session.chat)
  session: Session;
}
