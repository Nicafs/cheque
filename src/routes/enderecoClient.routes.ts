import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Client from '../models/Client';
import User from '../models/User';

import EnderecoClientRepository from '../repositories/EnderecoClientRepository';
import CreateEnderecoClientService from '../services/CreateEnderecoClientService';
import UpdateEnderecoClientService from '../services/UpdateEnderecoClientService';

const enderecoClientRouter = Router();

enderecoClientRouter.get('/:id', async (request, response) => {
  const enderecoClientRepository = getCustomRepository(
    EnderecoClientRepository,
  );
  const enderecoClient = await enderecoClientRepository.findOne(
    request.params.id,
  );

  return response.json(enderecoClient);
});

enderecoClientRouter.get('/', async (request, response) => {
  const enderecoClientRepository = getCustomRepository(
    EnderecoClientRepository,
  );
  const enderecoClient = await enderecoClientRepository.find();

  return response.json(enderecoClient);
});

enderecoClientRouter.post('/', async (request, response) => {
  const {
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    client_id,
  } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const createEnderecoClientService = new CreateEnderecoClientService();
  const enderecoClient = await createEnderecoClientService.execute({
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    user,
    client,
  });

  return response.json({ enderecoClient });
});

enderecoClientRouter.put('/:id', async (request, response) => {
  const {
    id = request.params.id,
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    client_id,
  } = request.body;
  const { userId } = request.user;

  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne(client_id);

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const updateEnderecoClientService = new UpdateEnderecoClientService();
  const enderecoClient = await updateEnderecoClientService.execute({
    id,
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    user,
    client,
  });

  return response.json({ enderecoClient });
});

enderecoClientRouter.delete('/:id', async (request, response) => {
  const enderecoClientRepository = getCustomRepository(
    EnderecoClientRepository,
  );
  const enderecoClient = await enderecoClientRepository.findOne(
    request.params.id,
  );

  if (!enderecoClient) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await enderecoClientRepository.remove(enderecoClient);

  return response.json(resposta);
});

export default enderecoClientRouter;
