import { EntityRepository, Repository } from 'typeorm';

import ReferenciaClient from '../models/ReferenciaClient';

@EntityRepository(ReferenciaClient)
class ReferenciaClientRepository extends Repository<ReferenciaClient> {
  public async findByReferencia(nome: string, telefone: string, client_id: number): Promise<ReferenciaClient | null> {
    const findReferencia = await this.findOne({ where: { nome, telefone, client_id } });

    return findReferencia || null;
  }
}

export default ReferenciaClientRepository;
