import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Fruit } from '../entities/fruit.entity';
import { FruitsService } from '../services/fruits.service';
import { CreateFruitDto, UpdateFruitDto } from '../dto/fruit.dto';
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() fruit: UpdateFruitDto,
  ): Promise<Fruit> {
    return this.fruitService.update(id, fruit);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fruitService.remove(id);
  }
}
