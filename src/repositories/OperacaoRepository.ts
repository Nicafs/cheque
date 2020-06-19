import { EntityRepository, Repository } from 'typeorm';

import Operacao from '../models/Operacao';

@EntityRepository(Operacao)
class OperacaoRepository extends Repository<Operacao> {
  public async findByChequeOperacao(numero: string): Promise<Operacao | null> {
    const findOperacao = await this.findOne({ where: { numero } });

    return findOperacao || null;
  }
}

export default OperacaoRepository;
