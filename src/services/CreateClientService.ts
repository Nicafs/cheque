import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';
import ClientsRepository from '../repositories/ClientsRepository';

interface Request {
  name: string;
  email: string;
  birthDate: Date;
  gender: string;
  cpf: string;
  phone: string;
  address: string;
  user_id: string;
}

class CreateClientService {
  public async execute({
    name,
    email,
    birthDate,
    gender,
    cpf,
    phone,
    address,
    user_id,
  }: Request): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientsRepository);

    const findClientEmail = await clientsRepository.findByEmail(email);

    if (findClientEmail) {
      throw new AppError('Já existe o e-mail cadastrado');
    }

    const findClientCpf = await clientsRepository.findByCpf(cpf);

    if (findClientCpf) {
      throw new AppError('Já existe o cpf cadastrado');
    }

    const client = clientsRepository.create({
      name,
      email,
      birthDate,
      gender,
      cpf,
      phone,
      address,
      user_id,
    });

    await clientsRepository.save(client);

    return client;
  }
}

export default CreateClientService;
