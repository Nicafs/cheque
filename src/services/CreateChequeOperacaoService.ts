import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ChequeOperacao from '../models/ChequeOperacao';
import Operacao from '../models/Operacao';
import User from '../models/User';

import ChequeOperacaoRepository from '../repositories/ChequeOperacaoRepository';
import BancosRepository from '../repositories/BancosRepository';


interface Request {
  operacao: Operacao | undefined;
  user: User | undefined;
  banco_id: number;
  tipo: string;
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
    operacao,
    user,
    banco_id,
    tipo,
    agencia,
    conta,
    numero,
    dias,
    situacao,
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

    const chequeOperacao = chequeOperacaoRepository.create({
      operacao,
      user,
      banco,
      tipo,
      agencia,
      conta,
      numero,
      dias,
      situacao,
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
