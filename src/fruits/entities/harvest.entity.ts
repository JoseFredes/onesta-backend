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

  @ManyToOne(() => Farm, (farm) => farm.harvests)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @ManyToOne(() => Fruit, (fruit) => fruit.harvests)
  @JoinColumn({ name: 'fruitId' })
  fruit: Fruit;

  @ManyToOne(() => Variety, (variety) => variety.harvests)
  @JoinColumn({ name: 'varietyId' })
  variety: Variety;

  @ManyToOne(() => Client, (client) => client.harvests)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => Farmer, (farmer) => farmer.harvests)
  @JoinColumn({ name: 'farmerId' })
  farmer: Farmer;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
