import { EntityRepository, Repository } from 'typeorm';

import Client from '../models/Client';

@EntityRepository(Client)
class ClientsRepository extends Repository<Client> {
  public async findByEmail(email: string): Promise<Client | null> {
    const fingClientEmail = await this.findOne({ where: { email } });

    return fingClientEmail || null;
  }

  public async findByCpf(cpf: string): Promise<Client | null> {
    const fingClientCpf = await this.findOne({ where: { cpf } });

    return fingClientCpf || null;
  }
}

export default ClientsRepository;
