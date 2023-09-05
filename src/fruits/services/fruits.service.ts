import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from '../entities/fruit.entity';
import { CreateFruitDto } from '../dto/fruit.dto';
import { HandleErrorService } from 'src/common/errors/handle-errors.service';

@Injectable()
export class FruitsService {
  constructor(
    @InjectRepository(Fruit)
    private fruitRepository: Repository<Fruit>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  findAll(): Promise<Fruit[]> {
    return this.fruitRepository.find();
  }

  async findOne(name: string): Promise<Fruit> {
    if (!name) throw new NotFoundException('Name not provided');

    const fruit = await this.fruitRepository.findOne({ where: { name: name } });

    if (!fruit)
      throw new NotFoundException(`Fruit with name ${name} not found`);

    return fruit;
  }

  async create(createFruitDto: CreateFruitDto): Promise<Fruit> {
    try {
      const existingFruit = await this.fruitRepository.findOne({
        where: { name: createFruitDto.name },
      });

      if (existingFruit)
        throw new ConflictException(
          `Fruit with name ${createFruitDto.name} already exists`,
        );

      const fruit = new Fruit();
      fruit.name = createFruitDto.name;
      return this.fruitRepository.save(fruit);
    } catch (error) {
      throw this.handleErrorService.handleErrorExceptions(
        'FruitService',
        'create',
        error,
      );
    }
  }
}
