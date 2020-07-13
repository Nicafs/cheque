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
import BancoClient from './BancoClient';

@Entity('bancos')
class Banco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  descricao: string;

  @Column()
  juros: number;

  @Column()
  prazo: number;

  @OneToMany(() => Cheque, (cheque) => cheque.banco)
  cheque: Cheque[];

  @OneToMany(() => BancoClient, (bancoClient) => bancoClient.banco)
  bancoClient: BancoClient[];

  @ManyToOne((type) => User, (user) => user.banco)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Banco;
