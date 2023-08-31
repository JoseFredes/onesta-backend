import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { Farm } from './entities/Farm.entity';
import { FarmersService } from './farmers.service';
import { FarmersController } from './farmers.controller';
import { FarmService } from './farm/farm.service';
import { FarmsController } from './farms/farms.controller';
import { FarmsService } from './farms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, Farm])],
  providers: [FarmersService, FarmService, FarmsService],
  controllers: [FarmersController, FarmsController],
})
export class FarmersModule {}
