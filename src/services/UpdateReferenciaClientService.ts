import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ReferenciaClient from '../models/ReferenciaClient';
import ReferenciaClientRepository from '../repositories/ReferenciaClientRepository';

import Client from '../models/Client';
import User from '../models/User';

interface Request {
  id: string,
  nome: string;
  telefone: string;
  user: User | undefined;
  client: Client | undefined;
}

class UpdateReferenciaService {
  public async execute({
    id,
    nome,
    telefone,
    user,
    client,
  }: Request): Promise<ReferenciaClient> {
    const referenciaClientRepository = getCustomRepository(ReferenciaClientRepository);

    const referenciaPrev = await referenciaClientRepository.findOne(id);

    if(!referenciaPrev) {
        throw new AppError('Não foi encontrato o Cadastro para Atualizar!!');
    }

    if(!client) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if(referenciaPrev?.nome !== nome || referenciaPrev?.telefone !== telefone) {
      const client_id = client.id;
      const findReferencia = await referenciaClientRepository.findByReferencia(nome, telefone, client_id);

      if (findReferencia) {
      throw new AppError('Já existe o E-mail cadastrado');
      }
    }

    referenciaPrev.nome = nome;
    referenciaPrev.telefone = telefone;

    const newReferencia =  await referenciaClientRepository.save(referenciaPrev);

    return newReferencia;
  }
}

export default UpdateReferenciaService;
