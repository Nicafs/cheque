import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';
import ChequeOperacao from '../models/ChequeOperacao';
import User from '../models/User';

import CreateChequeOperacaoService from './CreateChequeOperacaoService';

import OperacaoRepository from '../repositories/OperacaoRepository';
import ClientsRepository from '../repositories/ClientsRepository';

interface Request {
  chequeOperacao: ChequeOperacao[];
  userId: string;
  client_id: number;
  situacao: string;
  percentual: number;
  tarifa: number;
  data_operacao: Date;
  acrescimos: number;
  tarifa_bordero: number;
  obs: string;
}

class CreateOperacaoService {
  public async execute({
    client_id,
    chequeOperacao,
    userId,
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
    obs,
  }: Request): Promise<Operacao> {
    const operacaoRepository = getCustomRepository(OperacaoRepository);

    const clientRepository = getCustomRepository(ClientsRepository);
    const client = await clientRepository.findOne(client_id);

    if (!client) {
      throw new AppError('Não encontrou o cliente');
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('Usuário Inválido');
    }

    let total_operacao = parseFloat('0');
    let total_encargos = parseFloat('0');

    chequeOperacao.forEach((cheque) => {
      total_operacao += parseFloat(cheque.valor_operacao.toString());
      total_encargos += parseFloat(cheque.valor_encargos.toString());
    });

    const operacao = operacaoRepository.create({
      client,
      user,
      situacao,
      percentual,
      tarifa,
      data_operacao,
      acrescimos,
      tarifa_bordero,
      total_operacao,
      total_encargos,
      total_liquido: total_operacao - total_encargos,
      total_outros: 0,
      obs,
    });

    await operacaoRepository.save(operacao);

    const chequeOperacaoService = new CreateChequeOperacaoService();
    chequeOperacao.map(async (co) => {
      co.operacao = operacao;
      if (client) {
        co.client = client;
      }
      if (user) {
        co.user = user;
      }
      await chequeOperacaoService.execute(co);
    });

    return operacao;
  }
}

export default CreateOperacaoService;
