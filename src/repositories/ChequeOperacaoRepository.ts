import { EntityRepository, Repository } from 'typeorm';

import ChequeOperacao from '../models/ChequeOperacao';

@EntityRepository(ChequeOperacao)
class ChequesRepository extends Repository<ChequeOperacao> {
  public async findByChequeOperacao(
    numero: string,
  ): Promise<ChequeOperacao | null> {
    const findChequeOperacao = await this.findOne({ where: { numero } });

    return findChequeOperacao || null;
  }
}

export default ChequesRepository;
