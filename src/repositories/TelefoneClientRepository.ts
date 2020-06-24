import { EntityRepository, Repository } from 'typeorm';

import TelefoneClient from '../models/TelefoneClient';

@EntityRepository(TelefoneClient)
class TelefoneClientRepository extends Repository<TelefoneClient> {
  public async findByTelefone(numero: string, client_id: number): Promise<TelefoneClient | null> {
    const findTelefone = await this.findOne({ where: { numero, client_id } });

    return findTelefone || null;
  }
}

export default TelefoneClientRepository;
