import { EntityRepository, Repository } from 'typeorm';

import EnderecoClient from '../models/EnderecoClient';

@EntityRepository(EnderecoClient)
class EnderecoClientRepository extends Repository<EnderecoClient> {
  public async findByEndereco(
    cep: string,
    cidade: string,
    estado: string,
    bairro: string,
    numero: number,
    logradouro: string,
    client_id: number,
  ): Promise<EnderecoClient | null> {
    const findEndereco = await this.findOne({
      where: { cep, cidade, estado, bairro, numero, logradouro, client_id },
    });

    return findEndereco || null;
  }
}

export default EnderecoClientRepository;
