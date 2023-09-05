import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CommonModule } from 'src/common/common.module';
import { ClientService } from './services/clients.service';
import { ClientController } from './controllers/clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), CommonModule],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
