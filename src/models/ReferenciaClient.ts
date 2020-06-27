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

@Entity('referenciaClient')
class ReferenciaClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @ManyToOne((type) => Client, (client) => client.referenciaClient)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => User, (user) => user.referenciaClient)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ReferenciaClient;
