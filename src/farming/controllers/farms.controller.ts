import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { FarmsService } from '../services/farms.service';
import { CreateFarmDto } from '../dto/farm.dto';
import { Farm } from '../entities/farm.entity';
import { NameDto } from 'src/common/dto/common.dto';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmService: FarmsService) {}

  @Get()
  findAll(): Promise<Farm[]> {
    return this.farmService.findAll();
  }

  @Get(':name')
  async findOne(@Param() params: NameDto): Promise<Farm> {
    const name = params.name;
    if (!name) throw new BadRequestException('Invalid farm name format');

    try {
      const farm = await this.farmService.findOne(name);
      if (!farm) {
        throw new NotFoundException(`Farm with name ${name} not found`);
      }
      return farm;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error to get farm');
    }
  }

  @Post()
  create(@Body(ValidationPipe) farm: CreateFarmDto): Promise<Farm> {
    try {
      return this.farmService.createFarm(farm);
    } catch (error) {
      if (error.message.includes('Validation failed')) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Error to create farm');
    }
  }
}
