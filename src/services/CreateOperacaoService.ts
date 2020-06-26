import { getCustomRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';
import ChequeOperacao from '../models/ChequeOperacao';
import User from '../models/User';

import CreateChequeOperacaoService from './CreateChequeOperacaoService';

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
    console.log('Entrou no Serviço de criação da Operação');
    const operacaoRepository = getCustomRepository(OperacaoRepository);

    const clientRepository = getCustomRepository(ClientsRepository);
    const client = await clientRepository.findOne(client_id);
    console.log('Achou o cliente - client_id:', client_id, '- client:', client);
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
      total_liquido,
      total_outros,
      obs,
    });

    console.log('Vai salvar');
    await operacaoRepository.save(operacao);
    console.log('Criou a operação - operacao:', operacao);
    console.log('Agora a chequeOperacao:', chequeOperacao);
    const chequeOperacaoService = new CreateChequeOperacaoService();
    chequeOperacao.map(async (co) => {
      co.operacao = operacao;
      if (client) {
        co.client = client;
      }
      if (user) {
        co.user = user;
      }
      console.log('Criando o cheque - co:', co);
      await chequeOperacaoService.execute(co);
    });

    return operacao;
  }
}

export default CreateOperacaoService;
