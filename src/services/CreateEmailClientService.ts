import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import EmailClient from '../models/EmailClient';
import Client from '../models/Client';
import User from '../models/User';

interface Request {
    email: string;
    principal: boolean;
    user: User;
    client: Client;
}

class CreateEmailClienttService {
  public async execute({
    email,
    principal,
    user,
    client,
  }: Request): Promise<EmailClient> {
      
    const emailClientRepository = getRepository(EmailClient);
    const findEmailClient = await emailClientRepository.findOne({ where: { email, client}});

    if (findEmailClient) {
      throw new AppError('Já existe o e-mail cadastrado');
    }

    const emailClient = emailClientRepository.create({
        email,
        principal,
        user,
        client,
    });

    await emailClientRepository.save(emailClient);

    return emailClient;
  }
}

export default CreateEmailClienttService;
