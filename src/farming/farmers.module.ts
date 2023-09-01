import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { Farm } from './entities/Farm.entity';
import { FarmersService } from './services/farmers.service';
import { FarmersController } from './controllers/farmers.controller';
import { FarmsService } from './services/farms.service';
import { FarmsController } from './controllers/farms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, Farm])],
  providers: [FarmersService, FarmsService, FarmsService],
  controllers: [FarmersController, FarmsController],
})
export class FarmersModule {}
