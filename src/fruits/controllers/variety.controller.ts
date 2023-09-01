import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { VarietyService } from '../services/variety.service';
import { Variety } from '../entities/variety.entity';
import { CreateVarietyDto, UpdateVarietyDto } from '../dto/variety.dto';

@Controller('varieties')
export class VarietyController {
  constructor(private readonly varietyService: VarietyService) {}

  @Get()
  findAll(): Promise<Variety[]> {
    return this.varietyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Variety> {
    return this.varietyService.findOne(id);
  }

  @Post()
  create(@Body() createVarietyDto: CreateVarietyDto): Promise<Variety> {
    return this.varietyService.create(createVarietyDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVarietyDto: UpdateVarietyDto,
  ): Promise<Variety> {
    return this.varietyService.update(id, updateVarietyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.varietyService.remove(id);
  }
}
