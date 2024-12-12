import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Relation
} from 'typeorm';
import { Beer } from './Beer';
import { Pub } from './Pub';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 500, nullable: true })
  bio: string;

  @ManyToMany(() => Beer, beer => beer.users, { onDelete: 'CASCADE' })
  @JoinTable()
  beers: Relation<Beer>[];

  @ManyToMany(() => Pub, pub => pub.users, { onDelete: 'CASCADE' })
  @JoinTable()
  pubs: Relation<Pub>[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
