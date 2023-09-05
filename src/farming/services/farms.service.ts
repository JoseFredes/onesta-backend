import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../entities/farm.entity';
import { CreateFarmDto } from '../dto/farm.dto';
import { HandleErrorService } from 'src/common/errors/handle-errors.service';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  findAll(): Promise<Farm[]> {
    return this.farmRepository.find();
  }

  async findOne(name: string): Promise<Farm> {
    if (!name) throw new NotFoundException('Name not provided');

    const farm = await this.farmRepository.findOne({ where: { name: name } });

    if (!farm) throw new NotFoundException(`Farm with name ${name} not found`);

    return farm;
  }

  async createFarm(farmData: CreateFarmDto): Promise<Farm> {
    try {
      const existingFarm = await this.farmRepository.findOne({
        where: { name: farmData.name },
      });

      if (existingFarm)
        throw new ConflictException(
          `Farm with name ${farmData.name} already exists`,
        );

      return this.farmRepository.save(farmData);
    } catch (error) {
      throw this.handleErrorService.handleErrorExceptions(
        'FarmService',
        'createFarm',
        error,
      );
    }
  }
}
