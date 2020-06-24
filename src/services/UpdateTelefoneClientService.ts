import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TelefoneClient from '../models/TelefoneClient';
import TelefoneClientRepository from '../repositories/TelefoneClientRepository';

interface Request {
  id: string,
  tipo: string;
  numero: string;
  user_id: string;
  client_id: number;
}

class UpdateTelefoneService {
  public async execute({
    id,
    tipo,
    numero,
    user_id,
    client_id,
  }: Request): Promise<TelefoneClient> {
    const telefoneClientRepository = getCustomRepository(TelefoneClientRepository);

    const telefonePrev = await telefoneClientRepository.findOne(id);

    if(!telefonePrev) {
        throw new AppError('Não foi encontrato o Telefone para Atualizar!!');
    }

    if(telefonePrev?.numero !== numero) {
        const findTelefone = await telefoneClientRepository.findByTelefone(numero, client_id);

        if (findTelefone) {
        throw new AppError('Já existe o Número de Telefone Cadastrado');
        }
    }

    telefonePrev.tipo = tipo;
    telefonePrev.numero = numero;

    const newTelefone =  await telefoneClientRepository.save(telefonePrev);

    return newTelefone;
  }
}

export default UpdateTelefoneService;
