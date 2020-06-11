import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Cheque from '../models/Cheque';
import ChequesRepository from '../repositories/ChequesRepository';

interface Request {
  banco_id: string;
  client_id: string;
  agencia: number;
  conta: number;
  numero: string;
  u3: number;
  situacao: Date;
  emissao: Date;
  prevDeposito: Date;
  deposito: Date;
  envio: Date;
  devolucao: Date;
  pagamento: Date;
  valor: number;
  fornecedor_id: string;
  emitente: string;
  emitenteTipo: string;
  documento: string;
  phone: string;
}

class CreateChequeService {
  public async execute({
    banco_id,
    client_id,
    agencia,
    conta,
    numero,
    u3,
    situacao,
    emissao,
    prevDeposito,
    deposito,
    envio,
    devolucao,
    pagamento,
    valor,
    fornecedor_id,
    emitente,
    emitenteTipo,
    documento,
    phone,
  }: Request): Promise<Cheque> {
    const chequesRepository = getCustomRepository(ChequesRepository);

    const findChequeNumero = await chequesRepository.findByCheque(numero);

    if (findChequeNumero) {
      throw new AppError('Já existe o Número do Cheque Cadastrado');
    }

    const cheque = chequesRepository.create({
      banco_id,
      client_id,
      agencia,
      conta,
      numero,
      u3,
      situacao,
      emissao,
      prevDeposito,
      deposito,
      envio,
      devolucao,
      pagamento,
      valor,
      fornecedor_id,
      emitente,
      emitenteTipo,
      documento,
      phone,
    });

    await chequesRepository.save(cheque);

    return cheque;
  }
}

export default CreateChequeService;
