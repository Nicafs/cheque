import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import EnderecoClient from '../models/EnderecoClient';
import EnderecoClientRepository from '../repositories/EnderecoClientRepository';

interface Request {
  id: string,
  tipo: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento: string;
  tipo_logradouro: string;
  logradouro: string;
  numero: number;
  referencia: string;
  user_id: string;
  client_id: number;
}

class UpdateEnderecoService {
  public async execute({
    id,
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    user_id,
    client_id,
  }: Request): Promise<EnderecoClient> {
    const enderecoClientRepository = getCustomRepository(EnderecoClientRepository);

    const enderecoPrev = await enderecoClientRepository.findOne(id);

    if(!enderecoPrev) {
        throw new AppError('Não foi encontrato o Endereço para Atualizar!!');
    }

    if(enderecoPrev?.cep !== cep || enderecoPrev?.cidade !== cidade || enderecoPrev?.estado !== estado
        || enderecoPrev?.bairro !== bairro || enderecoPrev?.numero !== numero
        || enderecoPrev?.logradouro !== logradouro) {
        const findEndereco = 
            await enderecoClientRepository.findByEndereco( cep, cidade, estado, bairro, 
                                                            numero, logradouro, client_id);

        if (findEndereco) {
        throw new AppError('Já existe o Endereco Cadastrado');
        }
    }

    enderecoPrev.tipo = tipo;
    enderecoPrev.bairro = bairro;
    enderecoPrev.cep = cep;
    enderecoPrev.cidade = cidade;
    enderecoPrev.estado = estado;
    enderecoPrev.complemento = complemento;
    enderecoPrev.tipo_logradouro = tipo_logradouro;
    enderecoPrev.logradouro = logradouro;
    enderecoPrev.numero = numero;
    enderecoPrev.referencia = referencia;

    const newEndereco =  await enderecoClientRepository.save(enderecoPrev);

    return newEndereco;
  }
}

export default UpdateEnderecoService;
