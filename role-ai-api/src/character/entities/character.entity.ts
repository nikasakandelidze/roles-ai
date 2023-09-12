import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  context: string;

  @Column({ name: 'character_image', nullable: true })
  characterImage: string;

  @ManyToOne(() => User, (user) => user.characters)
  user: User;
}
