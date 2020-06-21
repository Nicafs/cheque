import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Banco;
