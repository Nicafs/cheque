import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Banco from './Banco';
import Client from './Client';
import User from './User';

@Entity('cheques')
class Cheque {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Banco, (banco) => banco.cheque)
  @JoinColumn({ name: 'banco_id' })
  banco: Banco;

  @ManyToOne(() => Client, (client) => client.cheque)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => User, (user) => user.cheque)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  agencia: number;

  @Column()
  conta: number;

  @Column()
  numero: string;

  @Column()
  dias: number;

  @Column()
  situacao: string;

  @Column('timestamp')
  data_vencimento: Date;

  @Column('timestamp')
  data_quitacao: Date;

  @Column()
  valor_operacao: number;

  @Column()
  valor_encargos: number;

  @Column()
  emitente: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cheque;
