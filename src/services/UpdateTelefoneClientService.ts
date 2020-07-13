import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TelefoneClient from '../models/TelefoneClient';
import TelefoneClientRepository from '../repositories/TelefoneClientRepository';

import Client from '../models/Client';
import User from '../models/User';

interface Request {
  id: string;
  tipo: string;
  numero: string;
  user: User | undefined;
  client: Client | undefined;
}

class UpdateTelefoneService {
  public async execute({
    id,
    tipo,
    numero,
    user,
    client,
  }: Request): Promise<TelefoneClient> {
    const telefoneClientRepository = getCustomRepository(
      TelefoneClientRepository,
    );

    const telefonePrev = await telefoneClientRepository.findOne(id);

    if (!telefonePrev) {
      throw new AppError('Não foi encontrato o Telefone para Atualizar!!');
    }

    if (!client) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if (telefonePrev?.numero !== numero) {
      const client_id = client.id;
      const findTelefone = await telefoneClientRepository.findByTelefone(
        numero,
        client_id,
      );

      if (findTelefone) {
        throw new AppError('Já existe o Número de Telefone Cadastrado');
      }
    }

    telefonePrev.tipo = tipo;
    telefonePrev.numero = numero;

    const newTelefone = await telefoneClientRepository.save(telefonePrev);

    return newTelefone;
  }
}

export default UpdateTelefoneService;
