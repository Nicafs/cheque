import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ChequeOperacao from '../models/ChequeOperacao';
import ChequeOperacaoRepository from '../repositories/ChequeOperacaoRepository';
import BancosRepository from '../repositories/BancosRepository';
import OperacaoRepository from '../repositories/OperacaoRepository';


interface Request {
  operacao_id: string;
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

class CreateChequeOperacaoService {
  public async execute({
    operacao_id,
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
  }: Request): Promise<ChequeOperacao> {
    const chequeOperacaoRepository = getCustomRepository(ChequeOperacaoRepository);

    const findChequeOperacaoNumero = await chequeOperacaoRepository.findByChequeOperacao(numero);

    if (findChequeOperacaoNumero) {
      throw new AppError('Já existe o Número do Cheque Cadastrado');
    }

    const bancosRepository = getCustomRepository(BancosRepository);
    const banco = await bancosRepository.findOne(banco_id);
    const operacaoRepository = getCustomRepository(OperacaoRepository);
    const operacao = await operacaoRepository.findOne(operacao_id);

    const chequeOperacao = chequeOperacaoRepository.create({
      operacao,
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

    await chequeOperacaoRepository.save(chequeOperacao);

    return chequeOperacao;
  }
}

export default CreateChequeOperacaoService;
