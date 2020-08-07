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
import Banco from './Banco';
import User from './User';

@Entity('bancoClient')
class BancoClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agencia: number;

  @Column()
  conta: number;

  @ManyToOne((type) => Client, (client) => client.bancoClient)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: Client;

  client_id: number;

  @ManyToOne((type) => User, (user) => user.bancoClient)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  user_id: number;

  @ManyToOne((type) => Banco, (banco) => banco.bancoClient, { eager: true })
  @JoinColumn({ name: 'banco_id', referencedColumnName: 'id' })
  banco: Banco;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BancoClient;
