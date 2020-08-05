import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';
import Banco from '../models/Banco';
import ChequeOperacao from '../models/ChequeOperacao';

import ChequeOperacaoRepository from '../repositories/ChequeOperacaoRepository';
import BancosRepository from '../repositories/BancosRepository';

interface Request {
  id: number;
  tipo: string;
  banco: Banco | undefined;
  agencia: number;
  conta: number;
  numero: string;
  dias: number;
  status: string;
  data_vencimento: Date;
  data_quitacao: Date;
  valor_operacao: number;
  valor_encargos: number;
  emitente: string;
  user: User | undefined;
}

class UpdateChequeOperacaoService {
  public async execute({
    id,
    banco,
    tipo,
    agencia,
    conta,
    numero,
    dias,
    status,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente,
    user,
  }: Request): Promise<ChequeOperacao> {
    const chequeOperacaoRepository = getCustomRepository(
      ChequeOperacaoRepository,
    );

    const chequeOperacaoPrev = await chequeOperacaoRepository.findOne(id);

    if (!chequeOperacaoPrev) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if (chequeOperacaoPrev.numero !== numero) {
      const findChequeOperacaoNumero = await chequeOperacaoRepository.findByChequeOperacao(
        numero,
      );

      if (findChequeOperacaoNumero) {
        throw new AppError('Já existe o Número do Cheque Cadastrado');
      }
    }

    if (!banco && tipo === 'cheque') {
      throw new AppError('Informe um Banco para cadastro');
    }

    let bancoData;

    if (banco && tipo === 'cheque') {
      const bancosRepository = getCustomRepository(BancosRepository);
      bancoData = await bancosRepository.findOne(banco.id);
    }

    if (bancoData) {
      chequeOperacaoPrev.banco = bancoData;
    }

    chequeOperacaoPrev.tipo = tipo;
    chequeOperacaoPrev.agencia = bancoData ? agencia : 0;
    chequeOperacaoPrev.conta = bancoData ? conta : 0;
    chequeOperacaoPrev.numero = numero;
    chequeOperacaoPrev.dias = dias;
    chequeOperacaoPrev.status = status;
    chequeOperacaoPrev.data_vencimento = data_vencimento;
    chequeOperacaoPrev.data_quitacao = data_quitacao;
    chequeOperacaoPrev.valor_operacao = valor_operacao;
    chequeOperacaoPrev.valor_encargos = valor_encargos;
    chequeOperacaoPrev.emitente = emitente;

    const chequeOperacao = await chequeOperacaoRepository.save(
      chequeOperacaoPrev,
    );

    return chequeOperacao;
  }
}

export default UpdateChequeOperacaoService;
