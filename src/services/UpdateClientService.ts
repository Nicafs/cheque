import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';
import ClientsRepository from '../repositories/ClientsRepository';

interface Request {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  gender: string;
  cpf: string;
  phone: string;
  address: string;
}

class UpdateClientService {
  public async execute({
    id,
    name,
    email,
    birthDate,
    gender,
    cpf,
    phone,
    address,
  }: Request): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientsRepository);

    const clientPrev = await clientsRepository.findOne(id);

    if(!clientPrev) {
        throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if(clientPrev?.email !== email) {
        const findClientEmail = await clientsRepository.findByEmail(email);

        if (findClientEmail) {
        throw new AppError('Já existe o e-mail cadastrado');
        }
    }

    if(clientPrev?.cpf !== cpf) {
        const findClientCpf = await clientsRepository.findByCpf(cpf);

        if (findClientCpf) {
        throw new AppError('Já existe o cpf cadastrado');
        }
    }

    clientPrev.name = name;
    clientPrev.email = email;
    clientPrev.birthDate = birthDate;
    clientPrev.gender = gender;
    clientPrev.cpf = cpf;
    clientPrev.phone = phone;
    clientPrev.address = address;

    const client =  await clientsRepository.save(clientPrev);

    return client;
  }
}

export default UpdateClientService;
