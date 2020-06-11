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

@Entity('cheques')
class Cheque {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Banco, (banco) => banco.cheque)
  @JoinColumn({ name: 'banco_id' })
  banco: Banco;

  @ManyToOne(() => Client, (client) => client.cheque)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  agencia: number;

  @Column()
  conta: number;

  @Column()
  numero: string;

  @Column()
  u3: number;

  @Column()
  situacao: Date;

  @Column('timestamp')
  emissao: Date;

  @Column('timestamp')
  prevDeposito: Date;

  @Column('timestamp')
  deposito: Date;

  @Column('timestamp')
  envio: Date;

  @Column('timestamp')
  devolucao: Date;

  @Column('timestamp')
  pagamento: Date;

  @Column()
  valor: number;

  @ManyToOne(() => Client, (client) => client.cheque)
  @JoinColumn({ name: 'client_id' })
  fornecedor: Client;

  @Column()
  emitente: string;

  @Column()
  emitenteTipo: string;

  @Column()
  documento: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cheque;
