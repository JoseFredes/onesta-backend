import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { Fruit } from './entities/fruit.entity';
import { Harvest } from './entities/harvest.entity';
import { Variety } from './entities/variety.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fruit, Harvest, Variety])],
  providers: [FruitsService],
  controllers: [FruitsController],
})
export class FruitsModule {}
