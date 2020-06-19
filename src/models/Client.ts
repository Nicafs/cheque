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

import Cheque from './Cheque';
import User from './User';
import Operacao from './Operacao';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('timestamp')
  birthDate: Date;

  @Column()
  gender: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.clients)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Cheque, (cheque: Cheque) => cheque.client)
  public cheque: Cheque[];

  @OneToMany(() => Operacao, (operacao: Operacao) => operacao.client)
  public operacao: Operacao[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
