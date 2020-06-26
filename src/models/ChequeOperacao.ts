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
import Operacao from './Operacao';
import User from './User';

@Entity('chequeOperacao')
class ChequeOperacao {
  @PrimaryGeneratedColumn()
  id: string;

  banco_id: number;

  @ManyToOne(() => Banco, (banco) => banco.cheque)
  @JoinColumn({ name: 'banco_id' })
  banco: Banco;

  @ManyToOne(() => Client, (client) => client.chequeOperacao)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Operacao, (operacao) => operacao.chequeOperacao)
  @JoinColumn({ name: 'operacao_id' })
  operacao: Operacao;

  @ManyToOne(() => User, (user) => user.chequeOperacao)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  tipo: string;

  @Column()
  agencia: number;

  @Column()
  conta: number;

  @Column()
  numero: string;

  @Column()
  dias: number;

  @Column()
  status: string;

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

export default ChequeOperacao;
