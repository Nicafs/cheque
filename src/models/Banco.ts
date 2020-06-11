import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Cheque from './Cheque';

@Entity('bancos')
class Banco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Banco;
