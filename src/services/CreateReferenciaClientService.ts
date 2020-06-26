import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ReferenciaClient from '../models/ReferenciaClient';
import Client from '../models/Client';
import User from '../models/User';

interface Request {
    nome: string;
    telefone: string;
    user: User;
    client: Client;
}

class CreateReferenciaClientService {
  public async execute({
    nome,
    telefone,
    user,
    client,
  }: Request): Promise<ReferenciaClient> {
      
    const referenciaClientRepository = getRepository(ReferenciaClient);
    const findreferenciaClient = await referenciaClientRepository.findOne({ where: { nome, telefone, client}});

    if (findreferenciaClient) {
      throw new AppError('Já existe a referência cadastrado');
    }

    const referenciaClient = referenciaClientRepository.create({
        nome,
        telefone,
        user,
        client,
    });

    await referenciaClientRepository.save(referenciaClient);

    return referenciaClient;
  }
}

export default CreateReferenciaClientService;
