import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';
import User from '../models/User';
import Banco from '../models/Banco';

import BancoClientRepository from '../repositories/BancoClientRepository';
import CreateBancoClientService from '../services/CreateBancoClientService';
import UpdateBancoClientService from '../services/UpdateBancoClientService';

const bancoClientRouter = Router();

bancoClientRouter.get('/:id', async (request, response) => {
  const bancoClientRepository = getCustomRepository(BancoClientRepository);
  const bancoClient = await bancoClientRepository.findOne(request.params.id);

  return response.json(bancoClient);
});

bancoClientRouter.get('/', async (request, response) => {
  const bancoClientRepository = getCustomRepository(BancoClientRepository);
  const bancoClient = await bancoClientRepository.find();

  return response.json(bancoClient);
});

bancoClientRouter.post('/', async (request, response) => {
  const { agencia, conta, banco_id, client_id } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const bancoRepository = getRepository(Banco);
  const banco = await bancoRepository.findOne(banco_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const createBancoClientService = new CreateBancoClientService();
  const bancoClient = await createBancoClientService.execute({
    agencia,
    conta,
    banco,
    user,
    client,
  });

  return response.json({ bancoClient });
});

bancoClientRouter.put('/:id', async (request, response) => {
  const {
    id = request.params.id,
    agencia,
    conta,
    banco_id,
    client_id,
  } = request.body;

  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const bancoRepository = getRepository(Banco);
  const banco = await bancoRepository.findOne(banco_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const updateBancoClientService = new UpdateBancoClientService();
  const bancoClient = await updateBancoClientService.execute({
    id,
    agencia,
    conta,
    banco,
    user,
    client,
  });

  return response.json({ bancoClient });
});

bancoClientRouter.delete('/:id', async (request, response) => {
  const bancoClientRepository = getCustomRepository(BancoClientRepository);
  const bancoClient = await bancoClientRepository.findOne(request.params.id);

  if (!bancoClient) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await bancoClientRepository.remove(bancoClient);

  return response.json(resposta);
});

export default bancoClientRouter;
