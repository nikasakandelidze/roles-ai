import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({
    name: 'is_active',
    nullable: false,
    default: true,
    type: 'boolean',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'auth_token', nullable: true })
  authToken: string;

  @Column({ name: 'access_token', nullable: true })
  accessToken: string;

  @Column({ name: 'profile_image', nullable: true })
  profileImageLink: string;
}
