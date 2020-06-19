import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';
import OperacaoRepository from '../repositories/OperacaoRepository';
import BancosRepository from '../repositories/BancosRepository';
import ClientsRepository from '../repositories/ClientsRepository';

interface Request {
  id: string;
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

class UpdateOperacaoService {
  public async execute({
    id,
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

    const operacaoPrev = await operacaoRepository.findOne(id);

    if(!operacaoPrev) {
        throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if(operacaoPrev.numero !== numero) {
        const findOperacaoNumero = await operacaoRepository.findOne(numero);

        if (findOperacaoNumero) {
        throw new AppError('Já existe o Número do  Cadastrado');
        }
    }

    const bancosRepository = getCustomRepository(BancosRepository);
    const banco = await bancosRepository.findOne(banco_id);
    const clientRepository = getCustomRepository(ClientsRepository);
    const client = await clientRepository.findOne(client_id);

    if(banco) {
        operacaoPrev.banco = banco;
    }
    if(client) {
        operacaoPrev.client = client;
    }
    operacaoPrev.agencia = agencia;
    operacaoPrev.conta = conta;
    operacaoPrev.numero = numero;
    operacaoPrev.situacao = situacao;
    operacaoPrev.dias = dias;
    operacaoPrev.data_vencimento = data_vencimento;
    operacaoPrev.data_quitacao = data_quitacao;
    operacaoPrev.valor_operacao = valor_operacao;
    operacaoPrev.valor_encargos = valor_encargos;
    operacaoPrev.emitente = emitente;

    const Operacao =  await operacaoRepository.save(operacaoPrev);

    return Operacao;
  }
}

export default UpdateOperacaoService;
