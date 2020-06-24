import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import BancoClient from '../models/BancoClient';
import TelefoneClient from '../models/TelefoneClient';
import EnderecoClient from '../models/EnderecoClient';
import EmailClient from '../models/EmailClient';
import ReferenciaClient from '../models/ReferenciaClient';
import Client from '../models/Client';
import User from '../models/User';

import ClientsRepository from '../repositories/ClientsRepository';

import CreateBancoClientService from '../services/CreateBancoClientService';
import CreateEnderecoClientService from '../services/CreateEnderecoClientService';
import CreateTelefoneClientService from '../services/CreateTelefoneClientService';
import CreateEmailClientService from '../services/CreateEmailClientService';
import CreateReferenciaClientService from '../services/CreateReferenciaClientService';

interface Request {
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
  user_id: string;
  bancoClient: BancoClient[];
  enderecoClient: EnderecoClient[];
  telefoneClient: TelefoneClient[];
  emailClient: EmailClient[];
  referenciaClient: ReferenciaClient[];
}

class CreateClientService {
  public async execute({
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
    user_id,
    bancoClient,
    enderecoClient,
    telefoneClient,
    emailClient,
    referenciaClient,
  }: Request): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientsRepository);

    const findClientCpf = await clientsRepository.findByCpf(cpf);

    if (findClientCpf) {
      throw new AppError('Já existe o cpf cadastrado');
    }
    
    const findClientRg = await clientsRepository.findByRg(rg);

    if (findClientRg) {
      throw new AppError('Já existe o rg cadastrado');
    }

    let user: User;
    if(user_id) {
      const userRepository = getRepository(User);
      user = await userRepository.findOne(user_id) as User;
    }

    const client = clientsRepository.create({
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
    });
    
    await clientsRepository.save(client);

    const bancoClientService = new CreateBancoClientService();
    bancoClient.map(async bc => {
      bc.client = client;
      if(user) {
        bc.user = user;
      }
      await bancoClientService.execute(bc);
    })

    const enderecoClientService = new CreateEnderecoClientService();
    enderecoClient.map(async ec => {
      ec.client = client;
      if(user) {
        ec.user = user;
      }
      await enderecoClientService.execute(ec);
    })

    const telefoneClientService = new CreateTelefoneClientService();
    telefoneClient.map(async tc => {
      tc.client = client;
      if(user) {
        tc.user = user;
      }
      await telefoneClientService.execute(tc);
    })

    const emailClientService = new CreateEmailClientService();
    emailClient.map(async ec => {
      ec.client = client;
      if(user) {
        ec.user = user;
      }
      await emailClientService.execute(ec);
    })

    const referenciaClientService = new CreateReferenciaClientService();
    referenciaClient.map(async rc => {
      rc.client = client;
      if(user) {
        rc.user = user;
      }
      await referenciaClientService.execute(rc);
    })

    return client;
  }
}

export default CreateClientService;
