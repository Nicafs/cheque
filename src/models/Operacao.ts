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
  
  import Banco from './Banco';
  import Client from './Client';
  import ChequeOperacao from './ChequeOperacao';
  
  @Entity('operacao')
  class Operacao {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Banco, (banco) => banco.cheque)
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;
  
    @ManyToOne(() => Client, (client) => client.operacao)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @OneToMany(() => ChequeOperacao, (chequeOperacao: ChequeOperacao) => chequeOperacao.operacao)
    public chequeOperacao: ChequeOperacao[];
    
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
    valor_encargos: number
  
    @Column()
    emitente: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Operacao;
  