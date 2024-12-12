import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany
} from 'typeorm';
import { Brewery } from './Brewery';
import { User } from './User';
import { Pub } from './Pub';

@Entity('beer')
export class Beer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Brewery, { nullable: false })
  brewery: Brewery;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  abv: number;

  @Column({ type: 'int', nullable: true })
  ibu: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Pub, pub => pub.beers)
  pubs: Pub[];

  @ManyToMany(() => User, user => user.beers)
  users: User[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
