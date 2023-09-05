import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Farm } from './farm.entity';
import { Harvest } from 'src/fruits/entities/harvest.entity';

@Entity('farmers')
@Unique(['email'])
export class Farmer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @OneToMany(() => Farm, (farm) => farm.farmer)
  farms: Farm[];

  @OneToMany(() => Harvest, (harvest) => harvest.farmer)
  harvests: Harvest[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
