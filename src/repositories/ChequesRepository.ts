import { EntityRepository, Repository } from 'typeorm';

import Cheque from '../models/Cheque';

@EntityRepository(Cheque)
class ChequesRepository extends Repository<Cheque> {
  public async findByCheque(numero: string): Promise<Cheque | null> {
    const findCheque = await this.findOne({ where: { numero } });

    return findCheque || null;
  }
}

export default ChequesRepository;
