import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Farmer } from './farmer.entity';
import { Harvest } from 'src/fruits/entities/harvest.entity';

@Entity('farms')
@Unique(['name', 'location'])
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToOne(() => Farmer, (farmer) => farmer.farms)
  farmer: Farmer;

  @OneToMany(() => Harvest, (harvest) => harvest.farm)
  harvests: Harvest[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
