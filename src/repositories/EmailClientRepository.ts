import { EntityRepository, Repository } from 'typeorm';

import EmailClient from '../models/EmailClient';

@EntityRepository(EmailClient)
class EmailClientRepository extends Repository<EmailClient> {
  public async findByEmail(email: string, client_id: number): Promise<EmailClient | null> {
    const findEmail = await this.findOne({ where: { email, client_id } });

    return findEmail || null;
  }
}

export default EmailClientRepository;
