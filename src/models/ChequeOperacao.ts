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
  import Operacao from './Operacao';
  import User from './User';
  import Client from './Client';
  
  @Entity('chequeOperacao')
  class ChequeOperacao {
    @PrimaryGeneratedColumn()
    id: number;

    operacao_id: number;
  
    @ManyToOne(() => Banco, (banco) => banco.cheque, { eager: true })
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;

    banco_id: number = this.banco?.id;
    banco_descricao: string = this.banco?.descricao;
  
    @ManyToOne(type => Operacao, operacao => operacao.chequeOperacao, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'operacao_id' })
    operacao: Operacao;

    @ManyToOne(() => Client, (client) => client.chequeOperacao)
    @JoinColumn({ name: 'client_id' })
    client: Client;
  
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
  
