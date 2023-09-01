import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';

import { ClientService } from '../services/clients.service';
import { Client } from '../entities/client.entity';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Post()
  createClient(@Body(ValidationPipe) client: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(client);
  }

  @Put(':id')
  updateClient(
    @Param('id') id: string,
    @Body(ValidationPipe) client: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.updateClient(id, client);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<void> {
    return this.clientService.removeClient(id);
  }
}
