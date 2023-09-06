import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parse } from 'papaparse';
import { Harvest } from '../entities/harvest.entity';
import { CreateHarvestDto } from '../dto/harvest.dto';
import { Client } from 'src/clients/entities/client.entity';
import { Farm } from 'src/farming/entities/farm.entity';
import { Farmer } from 'src/farming/entities/farmer.entity';
import { Fruit } from '../entities/fruit.entity';
import { Variety } from '../entities/variety.entity';
import { HandleErrorService } from 'src/common/errors/handle-errors.service';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,

    @InjectRepository(Farmer)
    private readonly farmerRepository: Repository<Farmer>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,

    @InjectRepository(Fruit)
    private readonly fruitRepository: Repository<Fruit>,

    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,

    private readonly handleErrorService: HandleErrorService,
  ) {}

  async findAll(): Promise<Harvest[]> {
    try {
      return await this.harvestRepository.find();
    } catch (error) {
      throw this.handleErrorService.handleErrorExceptions(
        'HarvestService',
        'findAll',
        error,
      );
    }
  }

  async create(createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    try {
      const harvest = new Harvest();
      Object.assign(harvest, createHarvestDto);
      return await this.harvestRepository.save(harvest);
    } catch (error) {
      throw this.handleErrorService.handleErrorExceptions(
        'HarvestService',
        'create',
        error,
      );
    }
  }

  async loadCsv(csv: string): Promise<any> {
    const parseResult = parse(csv, { header: true, skipEmptyLines: true });
    const harvests = [];
    const errors = [];

    const findOrCreateEntity = async (repository, criteria, data) => {
      let entity = await repository.findOne({ where: criteria });

      if (repository === this.varietyRepository) {
        entity = await repository
          .createQueryBuilder('variety')
          .innerJoinAndSelect('variety.fruit', 'fruit')
          .where('variety.name = :varietyName', {
            varietyName: criteria.name,
          })
          .andWhere('fruit.name = :fruitName', {
            fruitName: criteria.fruit.name,
          })
          .getOne();
      } else {
        entity = await repository.findOne({ where: criteria });
      }

      if (!entity) {
        try {
          entity = await repository.save(data);
        } catch (error) {
          console.error(`Error saving entity: ${JSON.stringify(data)}`, error);
          return null;
        }
      }
      return entity;
    };
    for (const row of parseResult.data) {
      const essentialFields = [
        'Mail Agricultor',
        'Nombre Agricultor',
        'Apellido Agricultor',
        'Mail Cliente',
        'Nombre Cliente',
        'Apellido Cliente',
        'Nombre Campo',
        'Ubicación de Campo',
        'Fruta Cosechada',
        'Variedad Cosechada',
      ];

      if (essentialFields.some((field) => !row[field] || !row[field].trim())) {
        errors.push(`Row missing essential field: ${JSON.stringify(row)}`);
        continue;
      }

      const farmer = await findOrCreateEntity(
        this.farmerRepository,
        { email: row['Mail Agricultor'].trim() },
        {
          email: row['Mail Agricultor'].trim(),
          name: row['Nombre Agricultor'].trim(),
          lastName: row['Apellido Agricultor'].trim(),
        },
      );

      const client = await findOrCreateEntity(
        this.clientRepository,
        { email: row['Mail Cliente'].trim() },
        {
          email: row['Mail Cliente'].trim(),
          name: row['Nombre Cliente'].trim(),
          lastName: row['Apellido Cliente'].trim(),
        },
      );

      const farm = await findOrCreateEntity(
        this.farmRepository,
        { name: row['Nombre Campo'].trim() },
        {
          name: row['Nombre Campo'].trim(),
          location: row['Ubicación de Campo'].trim(),
          farmer: farmer,
        },
      );

      const fruit = await findOrCreateEntity(
        this.fruitRepository,
        { name: row['Fruta Cosechada'].trim() },
        {
          name: row['Fruta Cosechada'].trim(),
        },
      );

      const variety = await findOrCreateEntity(
        this.varietyRepository,
        {
          name: row['Variedad Cosechada'].trim(),
          fruit: { name: row['Fruta Cosechada'].trim() },
        },
        {
          name: row['Variedad Cosechada'].trim(),
          fruit: fruit,
        },
      );

      if (!farmer || !client || !farm || !fruit || !variety) {
        errors.push(
          `Failed to find or create entities for row: ${JSON.stringify(row)}`,
        );
        continue;
      }

      const createHarvestDto: CreateHarvestDto = {
        farmer: farmer.id,
        client: client.id,
        farm: farm.id,
        fruit: fruit.id,
        variety: variety.id,
      };

      harvests.push(createHarvestDto);
    }

    try {
      await this.harvestRepository.save(harvests);
    } catch (error) {
      console.error('Error saving harvests', error);
      errors.push('Error saving harvests');
    }

    return {
      success: harvests.length,
      errors: errors,
    };
  }
}
