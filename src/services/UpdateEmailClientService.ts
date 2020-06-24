import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import EmailClient from '../models/EmailClient';
import EmailClientRepository from '../repositories/EmailClientRepository';

interface Request {
  id: string,
  email: string;
  principal: boolean;
  user_id: string;
  client_id: number;
}

class UpdateEmailService {
  public async execute({
    id,
    email,
    principal,
    user_id,
    client_id,
  }: Request): Promise<EmailClient> {
    const emailClientRepository = getCustomRepository(EmailClientRepository);

    const emailPrev = await emailClientRepository.findOne(id);

    if(!emailPrev) {
        throw new AppError('Não foi encontrato o Email para Atualizar!!');
    }

    if(emailPrev?.email !== email) {
        const findEmail = await emailClientRepository.findByEmail(email, client_id);

        if (findEmail) {
        throw new AppError('Já existe o E-mail cadastrado');
        }
    }

    emailPrev.email = email;
    emailPrev.principal = principal;

    const newEmail =  await emailClientRepository.save(emailPrev);

    return newEmail;
  }
}

export default UpdateEmailService;
