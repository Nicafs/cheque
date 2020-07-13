import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';
import User from '../models/User';

import EmailClientRepository from '../repositories/EmailClientRepository';
import CreateEmailClientService from '../services/CreateEmailClientService';
import UpdateEmailClientService from '../services/UpdateEmailClientService';

const emailClientRouter = Router();

emailClientRouter.get('/:id', async (request, response) => {
  const emailClientRepository = getCustomRepository(EmailClientRepository);
  const emailClient = await emailClientRepository.findOne(request.params.id);

  return response.json(emailClient);
});

emailClientRouter.get('/', async (request, response) => {
  const emailClientRepository = getCustomRepository(EmailClientRepository);
  const emailClient = await emailClientRepository.find();

  return response.json(emailClient);
});

emailClientRouter.post('/', async (request, response) => {
  const { email, principal, client_id } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const createEmailClientService = new CreateEmailClientService();
  const emailClient = await createEmailClientService.execute({
    email,
    principal,
    client,
    user,
  });

  return response.json({ emailClient });
});

emailClientRouter.put('/:id', async (request, response) => {
  const { id = request.params.id, email, principal, client_id } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const updateEmailClientService = new UpdateEmailClientService();
  const emailClient = await updateEmailClientService.execute({
    id,
    email,
    principal,
    user,
    client,
  });

  return response.json({ emailClient });
});

emailClientRouter.delete('/:id', async (request, response) => {
  const emailClientRepository = getCustomRepository(EmailClientRepository);
  const emailClient = await emailClientRepository.findOne(request.params.id);

  if (!emailClient) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await emailClientRepository.remove(emailClient);

  return response.json(resposta);
});

export default emailClientRouter;
