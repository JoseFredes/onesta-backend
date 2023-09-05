import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HarvestService } from '../services/harvest.service';
import { CreateHarvestDto } from '../dto/harvest.dto';

@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  async create(@Body() createHarvestDto: CreateHarvestDto) {
    return await this.harvestService.create(createHarvestDto);
  }

  @Post('load-csv')
  @UseInterceptors(FileInterceptor('file'))
  async loadCsv(@UploadedFile() file) {
    const csv = file.buffer.toString('utf-8');
    await this.harvestService.loadCsv(csv);
    return { message: 'CSV successfully loaded' };
  }
}
