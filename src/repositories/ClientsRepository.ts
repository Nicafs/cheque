import { EntityRepository, Repository, Not } from 'typeorm';

import Client from '../models/Client';

@EntityRepository(Client)
class ClientsRepository extends Repository<Client> {
  public async findByRg(rg: string): Promise<Client | null> {
    const findClientRg = await this.findOne({ where: { rg } });

    return findClientRg || null;
  }

  public async findByCpf(cpf: string): Promise<Client | null> {
    const findClientCpf = await this.findOne({ where: { cpf } });

    return findClientCpf || null;
  }

  public async findByRgPrev(rg: string, rgPrev: string): Promise<Client | null> {
    const findClientRg = await this.findOne({ where: { rg: [Not(rgPrev), rg] } });

    return findClientRg || null;
  }

  public async findByCpfPrev(cpf: string, cpfPrev: string): Promise<Client | null> {
    const findClientCpf = await this.findOne({ where: { cpf: [Not(cpfPrev), cpf] } });

    return findClientCpf || null;
  }
}

export default ClientsRepository;
