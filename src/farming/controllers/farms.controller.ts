import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FarmsService } from '../services/farms.service';
import { CreateFarmDto } from '../dto/farm.dto';
import { Farm } from '../entities/farm.entity';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmService: FarmsService) {}

  @Get()
  findAll(): Promise<Farm[]> {
    return this.farmService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Farm> {
    return this.farmService.findOne(name);
  }

  @Post()
  create(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
    return this.farmService.createFarm(createFarmDto);
  }
}
