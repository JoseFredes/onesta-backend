import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Fruit } from './fruit.entity';
import { Variety } from './variety.entity';
import { Farm } from 'src/farming/entities/farm.entity';
import { Farmer } from 'src/farming/entities/farmer.entity';
import { Client } from 'src/clients/entities/client.entity';

@Entity('harvests')
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Farmer, (farmer) => farmer.harvests)
  @JoinColumn({ name: 'farmer' })
  farmer: string;

  @ManyToOne(() => Client, (client) => client.harvests)
  @JoinColumn({ name: 'client' })
  client: string;

  @ManyToOne(() => Farm, (farm) => farm.harvests)
  @JoinColumn({ name: 'farm' })
  farm: string;

  @ManyToOne(() => Fruit, (fruit) => fruit.harvests)
  @JoinColumn({ name: 'fruit' })
  fruit: string;

  @ManyToOne(() => Variety, (variety) => variety.harvests)
  @JoinColumn({ name: 'variety' })
  variety: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
