import { EntityRepository, Repository } from 'typeorm';

import BancoClient from '../models/BancoClient';

@EntityRepository(BancoClient)
class BancoClientRepository extends Repository<BancoClient> {
  public async findByBanco(agencia: number, conta: number, banco_id: number, client_id: number): Promise<BancoClient | null> {
    const findBanco = await this.findOne({ where: { agencia, conta, banco_id, client_id } });

    return findBanco || null;
  }
}

export default BancoClientRepository;
