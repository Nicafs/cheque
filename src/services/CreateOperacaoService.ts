import { getCustomRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';
import ChequeOperacao from '../models/ChequeOperacao';
import User from '../models/User';

import CreateChequeOperacaoService from '../services/CreateChequeOperacaoService';

import OperacaoRepository from '../repositories/OperacaoRepository';
import ClientsRepository from '../repositories/ClientsRepository';


interface Request {
  chequeOperacao: ChequeOperacao[];
  user: User;
  client_id: number;
  situacao: string;
  percentual: number;
  tarifa: number;
  data_operacao: Date;
  acrescimos: number;
  tarifa_bordero: number;
  total_operacao: number;
  total_encargos: number;
  total_liquido: number;
  total_outros: number;
  obs: string;
}

class CreateOperacaoService {
  public async execute({
    client_id,
    chequeOperacao,
    user,
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
    total_operacao,
    total_encargos,
    total_liquido,
    total_outros,
    obs,
  }: Request): Promise<Operacao> {
    const operacaoRepository = getCustomRepository(OperacaoRepository);

    const clientRepository = getCustomRepository(ClientsRepository);
    const client = await clientRepository.findOne(client_id);

    const operacao = operacaoRepository.create({
      client,
      chequeOperacao,
      user,
      situacao,
      percentual,
      tarifa,
      data_operacao,
      acrescimos,
      tarifa_bordero,
      total_operacao,
      total_encargos,
      total_liquido,
      total_outros,
      obs,
    });

    await operacaoRepository.save(operacao);

    const chequeOperacaoService = new CreateChequeOperacaoService();
    chequeOperacao.map(async co => {
      co.operacao = operacao;
      if(user) {
        co.user = user;
      }
      if(client) {
        co.client = client;
      }
      await chequeOperacaoService.execute(co);
    })

    return operacao;
  }
}

export default CreateOperacaoService;
