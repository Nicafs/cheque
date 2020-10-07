import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ClientsRepository from '../repositories/ClientsRepository';
import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';

const clientsRouter = Router();

clientsRouter.get('/:id', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);
  const clients = await clientsRespository.findOne({
    where: { id: request.params.id },
    relations: [
      'bancoClient',
      'telefoneClient',
      'emailClient',
      'enderecoClient',
      'referenciaClient',
    ],
  });

  return response.json(clients);
});

clientsRouter.get('/', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);

  const clients = await clientsRespository.find({
    relations: [
      'bancoClient',
      'telefoneClient',
      'emailClient',
      'enderecoClient',
      'referenciaClient',
    ],
  });

  return response.json(clients);
});

clientsRouter.post('/', async (request, response) => {
  const {
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
    bancoClient,
    enderecoClient,
    telefoneClient,
    emailClient,
    referenciaClient,
  } = request.body;
  const { userId } = request.user;
  console.log('userId:', userId);
  const createClientService = new CreateClientService();
  const client = await createClientService.execute({
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
    userId,
    bancoClient,
    enderecoClient,
    telefoneClient,
    emailClient,
    referenciaClient,
  });

  return response.json({ client });
});

clientsRouter.put('/:id', async (request, response) => {
  const {
    id = request.params.id,
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
  } = request.body;
  const { userId } = request.user;

  const updateClientService = new UpdateClientService();
  const client = await updateClientService.execute({
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
    userId,
  });

  return response.json({ client });
});

clientsRouter.delete('/:id', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);
  const client = await clientsRespository.findOne(request.params.id);

  if (!client) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await clientsRespository.remove(client);

  return response.json(resposta);
});

export default clientsRouter;
