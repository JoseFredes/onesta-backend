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

@Module({
  imports: [TypeOrmModule.forFeature([Fruit, Harvest, Variety])],
  providers: [FruitsService, HarvestService, VarietyService],
  controllers: [FruitsController, HarvestController, VarietyController],
})
export class FruitsModule {}
