import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import EmailClient from '../models/EmailClient';
import EmailClientRepository from '../repositories/EmailClientRepository';

import Client from '../models/Client';
import User from '../models/User';

interface Request {
  id: string;
  email: string;
  principal: boolean;
  user: User | undefined;
  client: Client | undefined;
}

class UpdateEmailService {
  public async execute({
    id,
    email,
    principal,
    user,
    client,
  }: Request): Promise<EmailClient> {
    const emailClientRepository = getCustomRepository(EmailClientRepository);

    const emailPrev = await emailClientRepository.findOne(id);

    if (!emailPrev) {
      throw new AppError('Não foi encontrato o Email para Atualizar!!');
    }

    if (!client) {
      throw new AppError('Não foi encontrato o Cliente para Atualizar!!');
    }

    if (emailPrev?.email !== email) {
      const client_id = client.id;
      const findEmail = await emailClientRepository.findByEmail(
        email,
        client_id,
      );

      if (findEmail) {
        throw new AppError('Já existe o E-mail cadastrado');
      }
    }

    emailPrev.email = email;
    emailPrev.principal = principal;

    const newEmail = await emailClientRepository.save(emailPrev);

    return newEmail;
  }
}

export default UpdateEmailService;
