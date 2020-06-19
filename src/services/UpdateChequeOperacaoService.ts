import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ChequeOperacao from '../models/ChequeOperacao';
import ChequeOperacaoRepository from '../repositories/ChequeOperacaoRepository';
import BancosRepository from '../repositories/BancosRepository';
import OperacaoRepository from '../repositories/OperacaoRepository';

interface Request {
  id: string;
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

class UpdateChequeOperacaoService {
  public async execute({
    id,
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

    const chequeOperacaoPrev = await chequeOperacaoRepository.findOne(id);

    if(!chequeOperacaoPrev) {
        throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if(chequeOperacaoPrev.numero !== numero) {
        const findChequeOperacaoNumero = await chequeOperacaoRepository.findByChequeOperacao(numero);

        if (findChequeOperacaoNumero) {
        throw new AppError('Já existe o Número do Cheque Cadastrado');
        }
    }

    const bancosRepository = getCustomRepository(BancosRepository);
    const banco = await bancosRepository.findOne(banco_id);
    const operacaoRepository = getCustomRepository(OperacaoRepository);
    const operacao = await operacaoRepository.findOne(operacao_id);

    if(banco) {
        chequeOperacaoPrev.banco = banco;
    }
    if(operacao) {
        chequeOperacaoPrev.operacao = operacao;
    }
    chequeOperacaoPrev.agencia = agencia;
    chequeOperacaoPrev.conta = conta;
    chequeOperacaoPrev.numero = numero;
    chequeOperacaoPrev.situacao = situacao;
    chequeOperacaoPrev.dias = dias;
    chequeOperacaoPrev.data_vencimento = data_vencimento;
    chequeOperacaoPrev.data_quitacao = data_quitacao;
    chequeOperacaoPrev.valor_operacao = valor_operacao;
    chequeOperacaoPrev.valor_encargos = valor_encargos;
    chequeOperacaoPrev.emitente = emitente;

    const chequeOperacao =  await chequeOperacaoRepository.save(chequeOperacaoPrev);

    return chequeOperacao;
  }
}

export default UpdateChequeOperacaoService;
