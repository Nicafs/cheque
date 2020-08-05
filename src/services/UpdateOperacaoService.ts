import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ChequeOperacao from '../models/ChequeOperacao';

import Operacao from '../models/Operacao';
import Client from '../models/Client';
import OperacaoRepository from '../repositories/OperacaoRepository';

interface Request {
  id: string;
  chequeOperacao: ChequeOperacao[];
  client: Client;
  userId: string;
  situacao: string;
  percentual: number;
  tarifa: number;
  data_operacao: Date;
  acrescimos: number;
  tarifa_bordero: number;
  obs: string;
}

class UpdateOperacaoService {
  public async execute({
    id,
    client,
    chequeOperacao,
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
    obs,
  }: Request): Promise<Operacao> {
    const operacaoRepository = getCustomRepository(OperacaoRepository);

    const operacaoPrev = await operacaoRepository.findOne(id);

    if (!operacaoPrev) {
      throw new AppError('Não foi encontrato a Operação para Atualizar!!');
    }

    // const clientRepository = getCustomRepository(ClientsRepository);
    // const client = await clientRepository.findOne(client_id);

    if (client) {
      operacaoPrev.client = client;
    }

    let total_operacao = parseFloat('0');
    let total_encargos = parseFloat('0');
    
    chequeOperacao.forEach((cheque) => {
      const vo = parseFloat(cheque.valor_operacao.toString());
      const ve = parseFloat(cheque.valor_encargos.toString());
      total_operacao += vo;
      total_encargos += ve;
    });

    operacaoPrev.situacao = situacao;
    operacaoPrev.percentual = percentual;
    operacaoPrev.tarifa = tarifa;
    operacaoPrev.data_operacao = data_operacao;
    operacaoPrev.acrescimos = acrescimos;
    operacaoPrev.tarifa_bordero = tarifa_bordero;
    operacaoPrev.total_operacao = total_operacao;
    operacaoPrev.total_encargos = total_encargos;
    operacaoPrev.total_liquido = total_operacao - total_encargos;
    operacaoPrev.total_outros = 0;
    operacaoPrev.obs = obs;

    const operacao = await operacaoRepository.save(operacaoPrev);

    return operacao;
  }
}

export default UpdateOperacaoService;
