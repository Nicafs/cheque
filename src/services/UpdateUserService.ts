import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    username,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const userPrev = await usersRepository.findOne(id);

    if (!userPrev) {
      throw new AppError('Não foi encontrato o Usuário para Atualizar!!');
    }

    if (userPrev.email !== email) {
      const checkUserExists = await usersRepository.findOne({
        where: { email },
      });

      if (checkUserExists) {
        throw new AppError('Já existe o e-mail cadastrado');
      }
    }

    if (userPrev.username !== username) {
      const checkUserNameExists = await usersRepository.findOne({
        where: { username },
      });

      if (checkUserNameExists) {
        throw new AppError('Já existe o Usuário cadastrado');
      }
    }

    const hashedPassword = await hash(password, 8);

    userPrev.name = name;
    userPrev.email = email;
    userPrev.password = hashedPassword;
    userPrev.username = username;

    const newUser = await usersRepository.save(userPrev);

    return newUser;
  }
}

export default UpdateUserService;
