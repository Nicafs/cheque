import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import BancoClient from '../models/BancoClient';
import Client from '../models/Client';
import User from '../models/User';
import Banco from '../models/Banco';

interface Request {
    agencia: number;
    conta: number;
    banco: Banco;
    user: User;
    client: Client;
}

class CreateBancoClientService {
  public async execute({
    agencia,
    conta,
    banco,
    user,
    client,
  }: Request): Promise<BancoClient> {
      
    const bancoClientRepository = getRepository(BancoClient);
    const findBancoClient = await bancoClientRepository.findOne({ where: { agencia, conta, banco, client}});

    if (findBancoClient) {
      throw new AppError('Já existe o banco cadastrado');
    }

    const bancoClient = bancoClientRepository.create({
        agencia,
        conta,
        banco,
        user,
        client,
    });

    await bancoClientRepository.save(bancoClient);

    return bancoClient;
  }
}

export default CreateBancoClientService;
