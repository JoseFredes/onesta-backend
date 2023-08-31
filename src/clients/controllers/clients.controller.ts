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
import { ClientDto } from '../dto/client.dto';
import { ClientService } from '../services/clients.service';
import { Client } from '../entities/client.entity';

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
  createClient(@Body(ValidationPipe) clientDto: ClientDto): Promise<Client> {
    return this.clientService.createClient(clientDto);
  }

  @Put(':id')
  updateClient(
    @Param('id') id: string,
    @Body(ValidationPipe) clientDto: ClientDto,
  ): Promise<Client> {
    return this.clientService.updateClient(id, clientDto);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<void> {
    return this.clientService.removeClient(id);
  }
}
