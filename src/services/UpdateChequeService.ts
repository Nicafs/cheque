import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Cheque from '../models/Cheque';
import ChequesRepository from '../repositories/ChequesRepository';
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
  userId: number;
}

class UpdateChequeService {
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
    userId,
  }: Request): Promise<Cheque> {
    const chequesRepository = getCustomRepository(ChequesRepository);

    const chequePrev = await chequesRepository.findOne(id);

    if (!chequePrev) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if (chequePrev.numero !== numero) {
      const findChequeNumero = await chequesRepository.findByCheque(numero);

      if (findChequeNumero) {
        throw new AppError('Já existe o Número do Cheque Cadastrado');
      }
    }

    const bancosRepository = getCustomRepository(BancosRepository);
    const banco = await bancosRepository.findOne(banco_id);
    const clientsRepository = getCustomRepository(ClientsRepository);
    const client = await clientsRepository.findOne(client_id);

    if (banco) {
      chequePrev.banco = banco;
    }
    if (client) {
      chequePrev.client = client;
    }
    chequePrev.agencia = agencia;
    chequePrev.conta = conta;
    chequePrev.numero = numero;
    chequePrev.situacao = situacao;
    chequePrev.dias = dias;
    chequePrev.data_vencimento = data_vencimento;
    chequePrev.data_quitacao = data_quitacao;
    chequePrev.valor_operacao = valor_operacao;
    chequePrev.valor_encargos = valor_encargos;
    chequePrev.emitente = emitente;

    const cheque = await chequesRepository.save(chequePrev);

    return cheque;
  }
}

export default UpdateChequeService;
