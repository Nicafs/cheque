import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';
import User from '../models/User';

import ReferenciaClientRepository from '../repositories/ReferenciaClientRepository';
import CreateReferenciaClientService from '../services/CreateReferenciaClientService';
import UpdateReferenciaClientService from '../services/UpdateReferenciaClientService';

const referenciaClientRouter = Router();

referenciaClientRouter.get('/:id', async (request, response) => {
  const referenciaClientRepository = getCustomRepository(
    ReferenciaClientRepository,
  );
  const referenciaClient = await referenciaClientRepository.findOne(
    request.params.id,
  );

  return response.json(referenciaClient);
});

referenciaClientRouter.get('/', async (request, response) => {
  const referenciaClientRepository = getCustomRepository(
    ReferenciaClientRepository,
  );
  const referenciaClient = await referenciaClientRepository.find();

  return response.json(referenciaClient);
});

referenciaClientRouter.post('/', async (request, response) => {
  const { nome, telefone, client_id } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const createReferenciaClientService = new CreateReferenciaClientService();
  const referenciaClient = await createReferenciaClientService.execute({
    nome,
    telefone,
    client,
    user,
  });

  return response.json({ referenciaClient });
});

referenciaClientRouter.put('/:id', async (request, response) => {
  const { id = request.params.id, nome, telefone, client_id } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const updateReferenciaClientService = new UpdateReferenciaClientService();
  const referenciaClient = await updateReferenciaClientService.execute({
    id,
    nome,
    telefone,
    user,
    client,
  });

  return response.json({ referenciaClient });
});

referenciaClientRouter.delete('/:id', async (request, response) => {
  const referenciaClientRepository = getCustomRepository(
    ReferenciaClientRepository,
  );
  const referenciaClient = await referenciaClientRepository.findOne(
    request.params.id,
  );

  if (!referenciaClient) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await referenciaClientRepository.remove(referenciaClient);

  return response.json(resposta);
});

export default referenciaClientRouter;
