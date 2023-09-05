import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
    return this.varietyService.findOne(varietyName, fruitName);
  }

  @Post()
  create(@Body() createVarietyDto: CreateVarietyDto): Promise<Variety> {
    return this.varietyService.create(createVarietyDto);
  }
}
