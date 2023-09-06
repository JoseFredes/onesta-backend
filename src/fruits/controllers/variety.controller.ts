import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { VarietyService } from '../services/variety.service';
import { Variety } from '../entities/variety.entity';
import { CreateVarietyDto } from '../dto/variety.dto';

@Controller('varieties')
export class VarietyController {
  constructor(private readonly varietyService: VarietyService) {}

  @Get()
  findAll(): Promise<Variety[]> {
    return this.varietyService.findAll();
  }

  @Get(':fruit/:variety')
  findOne(
    @Param('fruit') fruitName: string,
    @Param('variety') varietyName: string,
  ): Promise<Variety> {
    if (!fruitName || !varietyName)
      throw new Error('Invalid fruit or variety format');
    try {
      return this.varietyService.findOne(fruitName, varietyName);
    } catch (error) {
      throw new Error('Error to get variety');
    }
  }

  @Post()
  create(
    @Body(ValidationPipe) createVarietyDto: CreateVarietyDto,
  ): Promise<Variety> {
    try {
      return this.varietyService.create(createVarietyDto);
    } catch (error) {
      throw new Error('Error to create variety');
    }
  }
}
