import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Variety } from './variety.entity';
import { Harvest } from './harvest.entity';

@Entity('fruits')
@Unique(['name'])
export class Fruit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Variety, (variety) => variety.fruit)
  varieties: Variety[];

  @OneToMany(() => Harvest, (harvest) => harvest.farm)
  harvests: Harvest[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
