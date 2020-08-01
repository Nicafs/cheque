import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Client from './Client';
import User from './User';
import ChequeOperacao from './ChequeOperacao';

@Entity('operacao')
class Operacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: true })
  client_id: number;

  @ManyToOne((type) => Client, (client) => client.operacao)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne((type) => User, (user) => user.operacao)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    (type) => ChequeOperacao,
    (chequeOperacao) => chequeOperacao.operacao,
  )
  public chequeOperacao: ChequeOperacao[];

  @Column()
  situacao: string;

  @Column('int')
  percentual: number;

  @Column('int')
  tarifa: number;

  @Column('timestamp')
  data_operacao: Date;

  @Column('int')
  acrescimos: number;

  @Column('int')
  tarifa_bordero: number;

  @Column('int')
  total_operacao: number;

  @Column('int')
  total_encargos: number;

  @Column('int')
  total_liquido: number;

  @Column('int')
  total_outros: number;

  @Column()
  obs: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Operacao;
