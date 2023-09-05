import { Module } from '@nestjs/common';
import { Farm } from './entities/Farm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { FarmsService } from './services/farms.service';
import { CommonModule } from 'src/common/common.module';
import { FarmersService } from './services/farmers.service';
import { FarmsController } from './controllers/farms.controller';
import { FarmersController } from './controllers/farmers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, Farm]), CommonModule],
  providers: [FarmersService, FarmsService],
  controllers: [FarmersController, FarmsController],
  exports: [TypeOrmModule],
})
export class FarmersModule {}
