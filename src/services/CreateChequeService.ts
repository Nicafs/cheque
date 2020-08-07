import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Cheque from '../models/Cheque';
import ChequesRepository from '../repositories/ChequesRepository';
import BancosRepository from '../repositories/BancosRepository';
import ClientsRepository from '../repositories/ClientsRepository';
import User from '../models/User';

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
  userId: number;
}

class CreateChequeService {
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
    userId,
  }: Request): Promise<Cheque> {
    const chequesRepository = getCustomRepository(ChequesRepository);

    const findChequeNumero = await chequesRepository.findByCheque(numero);

    if (findChequeNumero) {
      throw new AppError('Já existe o Número do Cheque Cadastrado');
    }

    const bancosRepository = getCustomRepository(BancosRepository);
    const banco = await bancosRepository.findOne(banco_id);

    const clientsRepository = getCustomRepository(ClientsRepository);
    const client = await clientsRepository.findOne(client_id);

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);

    const cheque = chequesRepository.create({
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
      user,
    });

    await chequesRepository.save(cheque);

    return cheque;
  }
}

export default CreateChequeService;
