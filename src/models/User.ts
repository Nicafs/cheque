import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Banco from './Banco';
import Client from './Client';
import Cheque from './Cheque';
import Operacao from './Operacao';
import ChequeOperacao from './ChequeOperacao';
import BancoClient from './BancoClient';
import TelefoneClient from './TelefoneClient';
import EnderecoClient from './EnderecoClient';
import EmailClient from './EmailClient';
import ReferenciaClient from './ReferenciaClient';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Banco, (banco: Banco) => banco.user)
  public banco: Banco[];

  @OneToMany(() => Cheque, (cheque: Cheque) => cheque.user)
  public cheque: Cheque[];

  @OneToMany(() => Operacao, (operacao: Operacao) => operacao.user)
  public operacao: Operacao[];

  @OneToMany(
    () => ChequeOperacao,
    (chequeOperacao: ChequeOperacao) => chequeOperacao.user,
  )
  public chequeOperacao: ChequeOperacao[];

  @OneToMany(() => BancoClient, (bancoClient: BancoClient) => bancoClient.user)
  public bancoClient: BancoClient[];

  @OneToMany(
    () => EnderecoClient,
    (enderecoClient: EnderecoClient) => enderecoClient.user,
  )
  public enderecoClient: EnderecoClient[];

  @OneToMany(
    () => TelefoneClient,
    (telefoneClient: TelefoneClient) => telefoneClient.user,
  )
  public telefoneClient: TelefoneClient[];

  @OneToMany(() => EmailClient, (emailClient: EmailClient) => emailClient.user)
  public emailClient: EmailClient[];

  @OneToMany(
    () => ReferenciaClient,
    (referenciaClient: ReferenciaClient) => referenciaClient.user,
  )
  public referenciaClient: ReferenciaClient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
