import { Router } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRespository = getRepository(User);
  const users = await usersRespository.find();

  return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const usersRespository = getRepository(User);
  const user = await usersRespository.findOne(request.params.id);

  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password, username } = request.body;
  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
    username,
  });

  delete user.password;

  return response.json({ user });
});

usersRouter.put('/:id', async (request, response) => {
  const {
    id = request.params.id,
    name,
    email,
    password,
    username,
  } = request.body;

  const updateUserService = new UpdateUserService();

  const user = await updateUserService.execute({
    id,
    name,
    email,
    password,
    username,
  });

  return response.json({ user });
});

usersRouter.delete('/:id', async (request, response) => {
  const usersRespository = getRepository(User);
  const user = await usersRespository.findOne(request.params.id);

  if (!user) {
    throw new AppError('Não foi encontrato o Usuário para Deletar!!');
  }

  const resposta = await usersRespository.remove(user);

  return response.json(resposta);
});

export default usersRouter;
