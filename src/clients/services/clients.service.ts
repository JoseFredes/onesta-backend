import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/client.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HandleErrorService } from 'src/common/errors/handle-errors.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(email: string): Promise<Client> {
    if (!email) throw new NotFoundException('email not provemailed');

    const client = await this.clientRepository.findOne({
      where: { email: email },
    });

    if (!client)
      throw new NotFoundException(`Client with email ${email} not found`);

    return client;
  }

  async createClient(clientData: Partial<CreateClientDto>): Promise<Client> {
    try {
      const existingClient = await this.clientRepository.findOne({
        where: { email: clientData.email },
      });

      if (existingClient)
        throw new NotFoundException(
          `Client with email ${clientData.email} already exists`,
        );

      const client = this.clientRepository.create(clientData);
      return this.clientRepository.save(client);
    } catch (error) {
      throw this.handleErrorService.handleErrorExceptions(
        'ClientService',
        'createClient',
        error,
      );
    }
  }
}
