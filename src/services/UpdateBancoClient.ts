import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import BancoClient from '../models/BancoClient';
import BancoClientRepository from '../repositories/BancoClientRepository';
import BancosRepository from '../repositories/BancosRepository';
import Banco from '../models/Banco';

interface Request {
  id: string,
  agencia: number;
  conta: number;
  banco_id: number;
  user_id: string;
  client_id: number;
}

class UpdateBancoService {
  public async execute({
    id,
    agencia,
    conta,
    banco_id,
    user_id,
    client_id,
  }: Request): Promise<BancoClient> {
    const bancoClientRepository = getCustomRepository(BancoClientRepository);

    const bancoPrev = await bancoClientRepository.findOne(id);

    if(!bancoPrev) {
        throw new AppError('Não foi encontrato o Banco para Atualizar!!');
    }

    if(bancoPrev?.agencia !== agencia || bancoPrev?.conta !== conta  || bancoPrev?.banco.id !== banco_id) {
        const findBanco = await bancoClientRepository.findByBanco(agencia, conta, banco_id, client_id);

        if (findBanco) {
        throw new AppError('Já existe o Banco cadastrado');
        }
    }

    const bancosRepository = getCustomRepository(BancosRepository);
    const banco = await bancosRepository.findOne(banco_id);

    if(banco) {
        bancoPrev.banco = banco;
    }

    bancoPrev.agencia = agencia;
    bancoPrev.conta = conta;
    
    const newBanco =  await bancoClientRepository.save(bancoPrev);

    return newBanco;
  }
}

export default UpdateBancoService;
