import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FruitsModule } from './fruits/fruits.module';
import databaseConfig from './config/database.config';
import { ClientsModule } from './clients/clients.module';
import { FarmersModule } from './farming/farming.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    FarmersModule,
    ClientsModule,
    FruitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
