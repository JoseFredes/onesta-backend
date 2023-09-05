import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Fruit } from '../entities/fruit.entity';
import { FruitsService } from '../services/fruits.service';
import { CreateFruitDto } from '../dto/fruit.dto';
@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitService: FruitsService) {}

  @Get()
  findAll(): Promise<Fruit[]> {
    return this.fruitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Fruit> {
    return this.fruitService.findOne(id);
  }

  @Post()
  create(@Body() fruit: CreateFruitDto): Promise<Fruit> {
    return this.fruitService.create(fruit);
  }
}
