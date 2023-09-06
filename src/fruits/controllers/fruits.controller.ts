import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Fruit } from '../entities/fruit.entity';
import { CreateFruitDto } from '../dto/fruit.dto';
import { FruitsService } from '../services/fruits.service';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitService: FruitsService) {}

  @Get()
  findAll(): Promise<Fruit[]> {
    return this.fruitService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Fruit> {
    if (!name) throw new BadRequestException('Invalid name format');
    try {
      return this.fruitService.findOne(name);
    } catch (error) {
      throw new InternalServerErrorException('Error to get fruit');
    }
  }

  @Post()
  create(@Body(ValidationPipe) fruit: CreateFruitDto): Promise<Fruit> {
    try {
      return this.fruitService.create(fruit);
    } catch (error) {
      if (error.message.includes('Validation failed')) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Error to create fruit');
    }
  }
}
