import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';
import Banco from '../models/Banco';
import BancosRepository from '../repositories/BancosRepository';

interface Request {
  codigo: string;
  descricao: string;
  juros: number;
  prazo: number;
  user: User | undefined;
}

class CreateBancoService {
  public async execute({
    codigo,
    descricao,
    juros,
    prazo,
    user,
  }: Request): Promise<Banco> {
    const bancosRepository = getCustomRepository(BancosRepository);

    const findBancoCodigo = await bancosRepository.findByCodigo(codigo);

    if (findBancoCodigo) {
      throw new AppError('Já existe o código cadastrado');
    }

    const findBancoDescricao = await bancosRepository.findByDescricao(
      descricao,
    );

    if (findBancoDescricao) {
      throw new AppError('Já existe a descrição cadastrado');
    }

    if (!user) {
      throw new AppError('Usuário Inválido');
    }

    const banco = bancosRepository.create({
      codigo,
      descricao,
      juros,
      prazo,
      user,
    });

    await bancosRepository.save(banco);

    return banco;
  }
}

export default CreateBancoService;
