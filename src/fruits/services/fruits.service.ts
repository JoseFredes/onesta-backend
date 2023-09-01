import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from '../entities/fruit.entity';
import { CreateFruitDto, UpdateFruitDto } from '../dto/fruit.dto';

@Injectable()
export class FruitsService {
  constructor(
    @InjectRepository(Fruit)
    private fruitRepository: Repository<Fruit>,
  ) {}

  findAll(): Promise<Fruit[]> {
    return this.fruitRepository.find();
  }

  findOne(id: string): Promise<Fruit> {
    return this.fruitRepository.findOne({ where: { id } });
  }

  create(createFruitDto: CreateFruitDto): Promise<Fruit> {
    const fruit = new Fruit();
    fruit.name = createFruitDto.name;
    return this.fruitRepository.save(fruit);
  }

  async update(id: string, updateFruitDto: UpdateFruitDto): Promise<Fruit> {
    const fruit = await this.fruitRepository.findOne({ where: { id } });
    if (updateFruitDto.name) {
      fruit.name = updateFruitDto.name;
    }
    return this.fruitRepository.save(fruit);
  }

  async remove(id: string): Promise<void> {
    await this.fruitRepository.delete(id);
  }
}
