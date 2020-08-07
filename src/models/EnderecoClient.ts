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

@Entity('enderecoClient')
class EnderecoClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  complemento: string;

  @Column()
  tipo_logradouro: string;

  @Column()
  logradouro: string;

  @Column()
  numero: number;

  @Column()
  referencia: string;

  @ManyToOne(() => Client, (client) => client.enderecoClient)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  client_id: number;

  @ManyToOne(() => User, (user) => user.enderecoClient)
  @JoinColumn({ name: 'user_id' })
  user: User;

  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EnderecoClient;
