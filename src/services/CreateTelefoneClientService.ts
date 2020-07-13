import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TelefoneClient from '../models/TelefoneClient';
import Client from '../models/Client';
import User from '../models/User';

interface Request {
  tipo: string;
  numero: string;
  user: User | undefined;
  client: Client | undefined;
}

class CreateTelefoneClientService {
  public async execute({
    tipo,
    numero,
    user,
    client,
  }: Request): Promise<TelefoneClient> {
    const telefoneClientRepository = getRepository(TelefoneClient);
    const findTelefoneClient = await telefoneClientRepository.findOne({
      where: { numero, client },
    });

    if (findTelefoneClient) {
      throw new AppError('Já existe o telefone cadastrado');
    }

    if (!client) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if (!user) {
      throw new AppError('Usuário Inválido!!');
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
