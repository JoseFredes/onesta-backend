import { Harvest } from 'src/fruits/entities/harvest.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity('clients')
@Unique(['email'])
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @OneToMany(() => Harvest, (harvest) => harvest.client)
  harvests: Harvest[];
}
