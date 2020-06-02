import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ClientsRepository from '../repositories/ClientsRepository';
import CreateClientService from '../services/CreateClientService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const clientsRouter = Router();

// clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', async (request, response) => {
  const clientsRespository = getCustomRepository(ClientsRepository);
  const clients = await clientsRespository.find();

  return response.json(clients);
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

export default clientsRouter;
