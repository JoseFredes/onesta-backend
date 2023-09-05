import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { FarmersService } from '../services/farmers.service';
import { Farmer } from '../entities/farmer.entity';
import { EmailDto } from 'src/common/dto/common.dto';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmerService: FarmersService) {}

  @Get()
  findAll(): Promise<Farmer[]> {
    return this.farmerService.findAll();
  }

  @Get(':email')
  async findOne(@Param() params: EmailDto): Promise<Farmer> {
    const email = params.email;
    if (!email) throw new BadRequestException('Invalid email format');

    try {
      const farmer = await this.farmerService.findOne(email);
      if (!farmer)
        throw new NotFoundException(`Farmer with ${email} not found`);

      return farmer;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error to get farmer');
    }
  }

  @Post()
  create(@Body(ValidationPipe) farmer: Farmer): Promise<Farmer> {
    try {
      return this.farmerService.createFarmer(farmer);
    } catch (error) {
      if (error.message.includes('Validation failed'))
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException('Error to create farmer');
    }
  }
}
