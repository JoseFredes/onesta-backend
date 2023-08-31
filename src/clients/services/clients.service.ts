import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: string): Promise<Client> {
    if (!id) throw new NotFoundException('ID not provided');

    const client = await this.clientRepository.findOne({ where: { id: id } });

    if (!client) throw new NotFoundException(`Client with ID ${id} not found`);

    return client;
  }

  async createClient(clientData: Partial<Client>): Promise<Client> {
    const client = this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    if (!id) throw new NotFoundException('ID not provided');

    await this.findOne(id);
    await this.clientRepository.update(id, clientData);
    return this.findOne(id);
  }

  async removeClient(id: string): Promise<void> {
    if (!id) throw new NotFoundException('ID not provided');

    await this.findOne(id);
    await this.clientRepository.delete(id);
  }
}
