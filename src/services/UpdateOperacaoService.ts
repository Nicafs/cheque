import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';
import OperacaoRepository from '../repositories/OperacaoRepository';
import BancosRepository from '../repositories/BancosRepository';
import ClientsRepository from '../repositories/ClientsRepository';

interface Request {
  id: string;
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

    const Operacao =  await operacaoRepository.save(operacaoPrev);

    return Operacao;
  }
}

export default UpdateOperacaoService;
