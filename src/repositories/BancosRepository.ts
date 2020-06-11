import { EntityRepository, Repository } from 'typeorm';

import Banco from '../models/Banco';

@EntityRepository(Banco)
class BancosRepository extends Repository<Banco> {
  public async findByCodigo(codigo: string): Promise<Banco | null> {
    const findCodigo = await this.findOne({ where: { codigo } });

    return findCodigo || null;
  }

  public async findByDescricao(descricao: string): Promise<Banco | null> {
    const findDescricao = await this.findOne({ where: { descricao } });

    return findDescricao || null;
  }
}

export default BancosRepository;
