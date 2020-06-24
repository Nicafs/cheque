import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import EnderecoClientRepository from '../repositories/EnderecoClientRepository';
import CreateEnderecoClientService from '../services/CreateEnderecoClientService';
import UpdateEnderecoClientService from '../services/UpdateEnderecoClientService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const enderecoClientRouter = Router();

// enderecoClientRouter.use(ensureAuthenzticated);

enderecoClientRouter.get('/:id', async (request, response) => {
  const enderecoClientRepository = getCustomRepository(EnderecoClientRepository);
  const enderecoClient = await enderecoClientRepository.findOne(request.params.id);

  return response.json(enderecoClient);
});

enderecoClientRouter.get('/', async (request, response) => {
  const enderecoClientRepository = getCustomRepository(EnderecoClientRepository);
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
    user_id,
    client_id
  } = request.body;

  const createenderecoClientervice = new CreateEnderecoClientService();

  const user = undefined;
  const client = undefined;

  const enderecoClient = await createenderecoClientervice.execute({
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
    user_id,
    client_id,
    user,
    client,
  });

  return response.json({ enderecoClient });
});

enderecoClientRouter.put('/', async (request, response) => {
  const { 
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
    user_id,
    client_id } = request.body;

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
    user_id,
    client_id
  });

  return response.json({ enderecoClient });
});

enderecoClientRouter.delete('/:id', async (request, response) => {
  const enderecoClientRepository = getCustomRepository(EnderecoClientRepository);
  const enderecoClient = await enderecoClientRepository.findOne(request.params.id);

  if(!enderecoClient) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await enderecoClientRepository.remove(enderecoClient);

  return response.json(resposta);
});

export default enderecoClientRouter;
