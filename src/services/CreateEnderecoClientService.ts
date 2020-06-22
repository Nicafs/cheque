import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import EnderecoClient from '../models/EnderecoClient';
import Client from '../models/Client';
import User from '../models/User';

interface Request {
    tipo: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    complemento: string;
    tipo_logradouro: string;
    logradouro: string;
    numero: number;
    referencia: string;
    user: User;
    client: Client;
}

class CreateEnderecoClientService {
  public async execute({
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    user,
    client,
  }: Request): Promise<EnderecoClient> {
      
    const enderecoClientRepository = getRepository(EnderecoClient);
    const findEnderecoClient = await enderecoClientRepository.findOne({ where: { cep, cidade, estado, bairro, numero, logradouro, client}});

    if (findEnderecoClient) {
      throw new AppError('Já existe o endereço cadastrado');
    }

    const enderecoClient = enderecoClientRepository.create({
        tipo,
        bairro,
        cep,
        cidade,
        estado,
        complemento,
        tipo_logradouro,
        logradouro,
        numero,
        referencia,
        user,
        client,
    });

    await enderecoClientRepository.save(enderecoClient);

    return enderecoClient;
  }
}

export default CreateEnderecoClientService;
