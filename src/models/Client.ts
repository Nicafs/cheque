import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Cheque from './Cheque';
import Operacao from './Operacao';
import ChequeOperacao from './ChequeOperacao';
import BancoClient from './BancoClient';
import TelefoneClient from './TelefoneClient';
import EnderecoClient from './EnderecoClient';
import EmailClient from './EmailClient';
import ReferenciaClient from './ReferenciaClient';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  gender: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column('timestamp')
  birthDate: Date;

  @Column()
  nome_pai: string;

  @Column()
  nome_mae: string;

  @Column()
  estado_civil: string;

  @Column()
  conjugue: string;

  @Column()
  credit: number;

  @Column()
  limit: number;

  @Column()
  acrescimo: number;

  @Column()
  local_trabalho: string;

  @Column()
  renda_mensal: number;

  @Column()
  cargo: string;

  @ManyToOne(() => User, (user) => user.clients)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Cheque, (cheque: Cheque) => cheque.client)
  public cheque: Cheque[];

  @OneToMany(() => Operacao, (operacao: Operacao) => operacao.client)
  public operacao: Operacao[];

  @OneToMany(
    () => ChequeOperacao,
    (chequeOperacao: ChequeOperacao) => chequeOperacao.client,
  )
  public chequeOperacao: ChequeOperacao[];

  @OneToMany(
    () => BancoClient,
    (bancoClient: BancoClient) => bancoClient.client,
  )
  public bancoClient: BancoClient[];

  @OneToMany(
    () => EnderecoClient,
    (enderecoClient: EnderecoClient) => enderecoClient.client,
  )
  public enderecoClient: EnderecoClient[];

  @OneToMany(
    () => TelefoneClient,
    (telefoneClient: TelefoneClient) => telefoneClient.client,
  )
  public telefoneClient: TelefoneClient[];

  @OneToMany(
    () => EmailClient,
    (emailClient: EmailClient) => emailClient.client,
  )
  public emailClient: EmailClient[];

  @OneToMany(
    () => ReferenciaClient,
    (referenciaClient: ReferenciaClient) => referenciaClient.client,
  )
  public referenciaClient: ReferenciaClient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
