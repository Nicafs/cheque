import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ClientsRepository from '../repositories/ClientsRepository';
import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const clientsRouter = Router();

// clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/:id', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);
  const client = await clientsRespository.findByIds([request.params.id]);

  return response.json(client);
});

clientsRouter.get('/', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);
  const clients = await clientsRespository.find();

  return response.json(clients);
});

clientsRouter.put('/:id', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);
  const client = await clientsRespository.update(request.params.id, request.body);

  return response.json(client);
});

clientsRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    birthDate,
    gender,
    cpf,
    phone,
    address,
    user_id,
  } = request.body;
  const createClientService = new CreateClientService();

  const client = await createClientService.execute({
    name,
    email,
    birthDate,
    gender,
    cpf,
    phone,
    address,
    user_id,
  });

  return response.json({ client });
});

clientsRouter.put('/', async (request, response) => {
  const { id, name, email, birthDate, gender, cpf, phone, address } = request.body;

  const updateClientService = new UpdateClientService();

  const client = await updateClientService.execute({
    id,
    name,
    email,
    birthDate,
    gender,
    cpf,
    phone,
    address,
  });

  return response.json({ client });
});

clientsRouter.delete('/:id', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);
  const client = await clientsRespository.findOne(request.params.id);

  if(!client) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await clientsRespository.remove(client);

  return response.json(resposta);
});

export default clientsRouter;
