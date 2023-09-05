import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/client.dto';
import { EmailDto } from 'src/common/dto/common.dto';
import { ClientService } from '../services/clients.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    try {
      return await this.clientService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error to get all clients');
    }
  }

  @Get(':email')
  async findOne(@Param('email') params: EmailDto): Promise<Client> {
    const email = params.email;
    if (!email) throw new BadRequestException('Invalid email format');

    try {
      const client = await this.clientService.findOne(email);
      if (!client)
        throw new NotFoundException(`Client with ${email} not found`);

      return client;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error to get client');
    }
  }

  @Post()
  async createClient(
    @Body(ValidationPipe) client: CreateClientDto,
  ): Promise<Client> {
    try {
      return await this.clientService.createClient(client);
    } catch (error) {
      if (error.message.includes('Validation failed'))
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException('Error to create client');
    }
  }
}
