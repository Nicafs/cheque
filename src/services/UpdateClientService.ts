import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';

import ClientsRepository from '../repositories/ClientsRepository';

interface Request {
  id: number;
  type: string;
  name: string;
  nickname: string;
  gender: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  nome_pai: string;
  nome_mae: string;
  estado_civil: string;
  conjugue: string;
  credit: number;
  limit: number;
  acrescimo: number;
  local_trabalho: string;
  renda_mensal: number;
  cargo: string;
  userId: number;
}

class UpdateClientService {
  public async execute({
    id,
    type,
    name,
    nickname,
    gender,
    cpf,
    rg,
    birthDate,
    nome_pai,
    nome_mae,
    estado_civil,
    conjugue,
    credit,
    limit,
    acrescimo,
    local_trabalho,
    renda_mensal,
    cargo,
  }: Request): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientsRepository);

    const clientPrev = await clientsRepository.findOne(id);

    if (!clientPrev) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if (clientPrev.cpf !== cpf) {
      const findClientCpf = await clientsRepository.findByCpfPrev(
        cpf,
        clientPrev.cpf,
      );

      if (findClientCpf) {
        throw new AppError('Já existe o cpf cadastrado');
      }
    }

    if (clientPrev.rg !== rg) {
      const findClientRg = await clientsRepository.findByRgPrev(
        rg,
        clientPrev.rg,
      );

      if (findClientRg) {
        throw new AppError('Já existe o rg cadastrado');
      }
    }

    clientPrev.type = type;
    clientPrev.name = name;
    clientPrev.nickname = nickname;
    clientPrev.gender = gender;
    clientPrev.cpf = cpf;
    clientPrev.rg = rg;
    clientPrev.birthDate = birthDate;
    clientPrev.nome_pai = nome_pai;
    clientPrev.nome_mae = nome_mae;
    clientPrev.estado_civil = estado_civil;
    clientPrev.conjugue = conjugue;
    clientPrev.credit = credit;
    clientPrev.limit = limit;
    clientPrev.acrescimo = acrescimo;
    clientPrev.local_trabalho = local_trabalho;
    clientPrev.renda_mensal = renda_mensal;
    clientPrev.cargo = cargo;

    const client = await clientsRepository.save(clientPrev);

    return client;
  }
}

export default UpdateClientService;
