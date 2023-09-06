import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HarvestService } from '../services/harvest.service';
import { CreateHarvestDto } from '../dto/harvest.dto';

@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get()
  async findAll() {
    return await this.harvestService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) harvest: CreateHarvestDto) {
    try {
      return await this.harvestService.create(harvest);
    } catch (error) {
      if (error.message.includes('Validation failed')) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Error to create harvest');
    }
  }

  @Post('load-csv')
  @UseInterceptors(FileInterceptor('file'))
  async loadCsv(@UploadedFile() file) {
    if (!file) return { message: 'No file provided' };

    const csv = file.buffer.toString('utf-8');
    await this.harvestService.loadCsv(csv);
    return { message: 'CSV successfully loaded' };
  }
}
