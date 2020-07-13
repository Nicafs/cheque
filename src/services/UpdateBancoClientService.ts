import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import BancoClient from '../models/BancoClient';
import BancoClientRepository from '../repositories/BancoClientRepository';

import Client from '../models/Client';
import User from '../models/User';
import Banco from '../models/Banco';

interface Request {
  id: string;
  agencia: number;
  conta: number;
  banco: Banco | undefined;
  user: User | undefined;
  client: Client | undefined;
}

class UpdateBancoService {
  public async execute({
    id,
    agencia,
    conta,
    banco,
    user,
    client,
  }: Request): Promise<BancoClient> {
    const bancoClientRepository = getCustomRepository(BancoClientRepository);

    const bancoPrev = await bancoClientRepository.findOne(id);

    if (!banco) {
      throw new AppError('Banco não informado!!');
    }

    if (!bancoPrev) {
      throw new AppError('Não foi encontrato o Banco para Atualizar!!');
    }

    if (!client) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if (
      bancoPrev?.agencia !== agencia ||
      bancoPrev?.conta !== conta ||
      bancoPrev?.banco.id !== banco.id
    ) {
      const findBanco = await bancoClientRepository.findByBanco(
        agencia,
        conta,
        banco.id,
        client.id,
      );

      if (findBanco) {
        throw new AppError('Já existe o Banco cadastrado');
      }
    }

    if (banco) {
      bancoPrev.banco = banco;
    }

    bancoPrev.agencia = agencia;
    bancoPrev.conta = conta;

    const newBanco = await bancoClientRepository.save(bancoPrev);

    return newBanco;
  }
}

export default UpdateBancoService;
