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

@Entity('telefoneClient')
class TelefoneClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  numero: string;

  @ManyToOne(() => Client, (client) => client.telefoneClient)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  client_id: number;

  @ManyToOne(() => User, (user) => user.telefoneClient)
  @JoinColumn({ name: 'user_id' })
  user: User;

  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TelefoneClient;
