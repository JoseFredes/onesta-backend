import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Variety } from '../entities/variety.entity';
import { CreateVarietyDto } from '../dto/variety.dto';
import { Fruit } from '../entities/fruit.entity';

@Injectable()
export class VarietyService {
  constructor(
    @InjectRepository(Variety)
    private varietyRepository: Repository<Variety>,
    @InjectRepository(Fruit)
    private readonly fruitRepository: Repository<Fruit>,
  ) {}

  findAll(): Promise<Variety[]> {
    return this.varietyRepository.find();
  }

  async findOne(varietyName: string, fruitName: string): Promise<Variety> {
    const fruit = await this.fruitRepository.findOne({
      where: { name: fruitName },
    });
    if (!fruit) {
      throw new Error('Fruit not found');
    }
    const foundFuitName = fruit.name;
    return this.varietyRepository
      .createQueryBuilder('variety')
      .innerJoin('variety.fruit', 'fruit')
      .where('variety.name = :varietyName', { varietyName })
      .andWhere('fruit.name= :fruitName', { foundFuitName })
      .getOne();
  }

  async create(varietyPayload: CreateVarietyDto): Promise<Variety> {
    const fuitName = varietyPayload.fruit;
    const fruit = await this.fruitRepository.findOne({
      where: { name: fuitName },
    });

    if (!fruit) {
      throw new NotFoundException(
        `Fruit with name ${varietyPayload.fruit} not found`,
      );
    }

    const variety = new Variety();
    variety.name = varietyPayload.name;
    variety.fruit = fruit;

    return this.varietyRepository.save(variety);
  }
}
