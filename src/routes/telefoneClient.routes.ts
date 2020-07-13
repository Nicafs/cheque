import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';
import User from '../models/User';

import TelefoneClientRepository from '../repositories/TelefoneClientRepository';
import CreateTelefoneClientService from '../services/CreateTelefoneClientService';
import UpdateTelefoneClientService from '../services/UpdateTelefoneClientService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const telefoneClientRouter = Router();

// telefoneClientRouter.use(ensureAuthenzticated);

telefoneClientRouter.get('/:id', async (request, response) => {
  const telefoneClientRepository = getCustomRepository(
    TelefoneClientRepository,
  );
  const telefoneClient = await telefoneClientRepository.findOne(
    request.params.id,
  );

  return response.json(telefoneClient);
});

telefoneClientRouter.get('/', async (request, response) => {
  const telefoneClientRepository = getCustomRepository(
    TelefoneClientRepository,
  );
  const telefoneClient = await telefoneClientRepository.find();

  return response.json(telefoneClient);
});

telefoneClientRouter.post('/', async (request, response) => {
  const { tipo, numero, client_id } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const createTelefoneClientervice = new CreateTelefoneClientService();
  const telefoneClient = await createTelefoneClientervice.execute({
    tipo,
    numero,
    client,
    user,
  });

  return response.json({ telefoneClient });
});

telefoneClientRouter.put('/:id', async (request, response) => {
  const { id = request.params.id, tipo, numero, client_id } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const updateTelefoneClientService = new UpdateTelefoneClientService();
  const telefoneClient = await updateTelefoneClientService.execute({
    id,
    tipo,
    numero,
    client,
    user,
  });

  return response.json({ telefoneClient });
});

telefoneClientRouter.delete('/:id', async (request, response) => {
  const telefoneClientRepository = getCustomRepository(
    TelefoneClientRepository,
  );
  const telefoneClient = await telefoneClientRepository.findOne(
    request.params.id,
  );

  if (!telefoneClient) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await telefoneClientRepository.remove(telefoneClient);

  return response.json(resposta);
});

export default telefoneClientRouter;
