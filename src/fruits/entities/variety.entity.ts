import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fruit } from './fruit.entity';
import { Harvest } from './harvest.entity';

@Entity('varieties')
@Unique(['name', 'fruit'])
export class Variety {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Fruit, (fruit) => fruit.varieties)
  @JoinColumn({ name: 'fruitName', referencedColumnName: 'name' })
  fruit: Fruit;

  @OneToMany(() => Harvest, (harvest) => harvest.variety)
  harvests: Harvest[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
