import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Client from './Client';
import User from './User';

@Entity('emailClient')
class EmailClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  principal: boolean;

  @ManyToOne(() => Client, (client) => client.enderecoClient)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  client_id: number;

  @ManyToOne(() => User, (user) => user.enderecoClient)
  @JoinColumn({ name: 'user_id' })
  user: User;

  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EmailClient;
