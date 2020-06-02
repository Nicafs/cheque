import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | null> {
    const fingUserEmail = await this.findOne({ where: { email } });

    return fingUserEmail || null;
  }
}

export default UsersRepository;
