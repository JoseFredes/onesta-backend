import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';

import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/client.dto';
import { ClientService } from '../services/clients.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<Client> {
    return this.clientService.findOne(email);
  }

  @Post()
  createClient(@Body(ValidationPipe) client: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(client);
  }
}
