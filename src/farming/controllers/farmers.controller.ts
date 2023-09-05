import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FarmersService } from '../services/farmers.service';
import { Farmer } from '../entities/farmer.entity';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmerService: FarmersService) {}

  @Get()
  findAll(): Promise<Farmer[]> {
    return this.farmerService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<Farmer> {
    return this.farmerService.findOne(email);
  }

  @Post()
  create(@Body() farmer: Farmer): Promise<Farmer> {
    return this.farmerService.createFarmer(farmer);
  }
}
