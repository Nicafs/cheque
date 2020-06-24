import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ReferenciaClient from '../models/ReferenciaClient';
import ReferenciaClientRepository from '../repositories/ReferenciaClientRepository';

interface Request {
  id: string,
  nome: string;
  telefone: string;
  user_id: string;
  client_id: number;
}

class UpdateReferenciaService {
  public async execute({
    id,
    nome,
    telefone,
    user_id,
    client_id,
  }: Request): Promise<ReferenciaClient> {
    const referenciaClientRepository = getCustomRepository(ReferenciaClientRepository);

    const referenciaPrev = await referenciaClientRepository.findOne(id);

    if(!referenciaPrev) {
        throw new AppError('Não foi encontrato o Cadastro para Atualizar!!');
    }

    if(referenciaPrev?.nome !== nome || referenciaPrev?.telefone !== telefone) {
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
