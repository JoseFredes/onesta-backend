import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from '../entities/farmer.entity';
import { CreateFarmerDto } from '../dto/farmer.dto';
import { HandleErrorService } from 'src/common/errors/handle-errors.service';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private readonly farmerRepository: Repository<Farmer>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  findAll(): Promise<Farmer[]> {
    return this.farmerRepository.find();
  }

  async findOne(email: string): Promise<Farmer> {
    if (!email) throw new NotFoundException('Email not provided');

    const farmer = await this.farmerRepository.findOne({
      where: { email: email },
    });

    if (!farmer)
      throw new NotFoundException(`Farmer with email ${email} not found`);

    return farmer;
  }

  async createFarmer(farmerData: CreateFarmerDto): Promise<Farmer> {
    try {
      const existingFarmer = await this.farmerRepository.findOne({
        where: { email: farmerData.email },
      });

      if (existingFarmer)
        throw new ConflictException(
          `Farmer with email ${farmerData.email} already exists`,
        );

      return this.farmerRepository.save(farmerData);
    } catch (error) {
      throw this.handleErrorService.handleErrorExceptions(
        'FarmerService',
        'createFarmer',
        error,
      );
    }
  }
}
