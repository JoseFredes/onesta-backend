import { Module } from '@nestjs/common';
import { FruitsService } from './services/fruits.service';
import { FruitsController } from './controllers/fruits.controller';
import { Fruit } from './entities/fruit.entity';
import { Harvest } from './entities/harvest.entity';
import { Variety } from './entities/variety.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VarietyService } from './services/variety.service';
import { HarvestService } from './services/harvest.service';
import { HarvestController } from './controllers/harvest.controller';
import { VarietyController } from './controllers/variety.controller';
import { FarmersModule } from 'src/farming/farming.module';
import { ClientsModule } from 'src/clients/clients.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fruit, Harvest, Variety]),
    FarmersModule,
    ClientsModule,
    CommonModule,
  ],
  providers: [FruitsService, HarvestService, VarietyService],
  controllers: [FruitsController, HarvestController, VarietyController],
})
export class FruitsModule {}
