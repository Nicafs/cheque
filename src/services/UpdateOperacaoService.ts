import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ChequeOperacao from '../models/ChequeOperacao';
import CreateChequeOperacaoService from '../services/CreateChequeOperacaoService';
import UpdateChequeOperacaoService from '../services/UpdateChequeOperacaoService';

import Operacao from '../models/Operacao';
import OperacaoRepository from '../repositories/OperacaoRepository';
import ClientsRepository from '../repositories/ClientsRepository';

interface Request {
  id: string;
  chequeOperacao: ChequeOperacao[];
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

class UpdateOperacaoService {
  public async execute({
    id,
    client_id,
    chequeOperacao,
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

    const operacaoPrev = await operacaoRepository.findOne(id);

    if(!operacaoPrev) {
        throw new AppError('Não foi encontrato a Operação para Atualizar!!');
    }

    const clientRepository = getCustomRepository(ClientsRepository);
    const client = await clientRepository.findOne(client_id);

    if(client) {
        operacaoPrev.client = client;
    }
    
    operacaoPrev.situacao = situacao;
    operacaoPrev.percentual = percentual;
    operacaoPrev.tarifa = tarifa;
    operacaoPrev.data_operacao = data_operacao;
    operacaoPrev.acrescimos = acrescimos;
    operacaoPrev.tarifa_bordero = tarifa_bordero;
    operacaoPrev.total_operacao = total_operacao;
    operacaoPrev.total_encargos = total_encargos;
    operacaoPrev.total_liquido = total_liquido;
    operacaoPrev.total_outros = total_outros;
    operacaoPrev.obs = obs;
    
    const operacao =  await operacaoRepository.save(operacaoPrev);

    chequeOperacao.map(async co => {
      co.operacao = operacao;
      
      if(client) {
        co.client = client;
      }
      
      if(co.id) {
        const chequeOperacaoService = new UpdateChequeOperacaoService();
        await chequeOperacaoService.execute(co);
      } else {
        const chequeOperacaoService = new CreateChequeOperacaoService();
        await chequeOperacaoService.execute(co);
      }
    })

    return operacao;
  }
}

export default UpdateOperacaoService;
