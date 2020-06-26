import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TelefoneClient from '../models/TelefoneClient';
import Client from '../models/Client';
import User from '../models/User';

interface Request {
    tipo: string;
    numero: string;
    user: User;
    client: Client;
}

class CreateTelefoneClientService {
  public async execute({
    tipo,
    numero,
    user,
    client,
  }: Request): Promise<TelefoneClient> {
      
    const telefoneClientRepository = getRepository(TelefoneClient);
    const findTelefoneClient = await telefoneClientRepository.findOne({ where: { numero, client}});

    if (findTelefoneClient) {
      throw new AppError('Já existe o telefone cadastrado');
    }

    const telefoneClient = telefoneClientRepository.create({
        tipo,
        numero,
        user,
        client,
    });

    await telefoneClientRepository.save(telefoneClient);

    return telefoneClient;
  }
}

export default CreateTelefoneClientService;
