import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';
import OperacaoRepository from '../repositories/OperacaoRepository';
import BancosRepository from '../repositories/BancosRepository';
import ClientsRepository from '../repositories/ClientsRepository';


interface Request {
  client_id: string;
  banco_id: string;
  agencia: number;
  conta: number;
  numero: string;
  dias: number;
  situacao: string;
  data_vencimento: Date;
  data_quitacao: Date;
  valor_operacao: number;
  valor_encargos: number;
  emitente: string;
}

class CreateOperacaoService {
  public async execute({
    client_id,
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente,
  }: Request): Promise<Operacao> {
    const operacaoRepository = getCustomRepository(OperacaoRepository);

    const findOperacaoNumero = await operacaoRepository.findOne(numero);

    if (findOperacaoNumero) {
      throw new AppError('Já existe o Número do  Cadastrado');
    }

    const bancosRepository = getCustomRepository(BancosRepository);
    const banco = await bancosRepository.findOne(banco_id);
    const clientRepository = getCustomRepository(ClientsRepository);
    const client = await clientRepository.findOne(client_id);

    const operacao = operacaoRepository.create({
      client,
      banco,
      agencia,
      conta,
      numero,
      situacao,
      dias,
      data_vencimento,
      data_quitacao,
      valor_operacao,
      valor_encargos,
      emitente,
    });

    await operacaoRepository.save(operacao);

    return operacao;
  }
}

export default CreateOperacaoService;
