import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Banco from '../models/Banco';
import BancosRepository from '../repositories/BancosRepository';

interface Request {
  id: string,
  codigo: string;
  descricao: string;
  juros: number;
  prazo: number;
}

class UpdateBancoService {
  public async execute({
    id,
    codigo,
    descricao,
    juros,
    prazo,
  }: Request): Promise<Banco> {
    const bancosRepository = getCustomRepository(BancosRepository);

    const bancoPrev = await bancosRepository.findOne(id);

    if(!bancoPrev) {
        throw new AppError('Não foi encontrato o Banco para Atualizar!!');
    }

    if(bancoPrev?.codigo !== codigo) {
        const findBancoCodigo = await bancosRepository.findByCodigo(codigo);

        if (findBancoCodigo) {
        throw new AppError('Já existe o código cadastrado');
        }
    }

    if(bancoPrev?.descricao !== descricao) {
        const findBancoDescricao = await bancosRepository.findByDescricao(
        descricao,
        );

        if (findBancoDescricao) {
        throw new AppError('Já existe a descrição cadastrado');
        }
    }

    bancoPrev.codigo = codigo;
    bancoPrev.descricao = descricao;
    bancoPrev.juros = juros;
    bancoPrev.prazo = prazo;

    const banco =  await bancosRepository.save(bancoPrev);

    return banco;
  }
}

export default UpdateBancoService;
