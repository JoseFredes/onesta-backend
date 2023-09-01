import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Variety } from '../entities/variety.entity';
import { CreateVarietyDto, UpdateVarietyDto } from '../dto/variety.dto';

@Injectable()
export class VarietyService {
  constructor(
    @InjectRepository(Variety)
    private varietyRepository: Repository<Variety>,
  ) {}

  findAll(): Promise<Variety[]> {
    return this.varietyRepository.find();
  }

  findOne(id: string): Promise<Variety> {
    return this.varietyRepository.findOne({ where: { id } });
  }

  create(varietyPayload: CreateVarietyDto): Promise<Variety> {
    const variety = new Variety();
    variety.name = varietyPayload.name;
    variety.fruit = { id: varietyPayload.fruitId } as any;
    return this.varietyRepository.save(variety);
  }

  async update(id: string, varietyPayload: UpdateVarietyDto): Promise<Variety> {
    const variety = await this.varietyRepository.findOne({ where: { id } });
    if (varietyPayload.name) {
      variety.name = varietyPayload.name;
    }
    if (varietyPayload.fruitId) {
      variety.fruit = { id: varietyPayload.fruitId } as any;
    }
    return this.varietyRepository.save(variety);
  }

  async remove(id: string): Promise<void> {
    await this.varietyRepository.delete(id);
  }
}
