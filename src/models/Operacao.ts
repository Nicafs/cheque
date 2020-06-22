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
  import User from './User';
  import ChequeOperacao from './ChequeOperacao';
  
  @Entity('operacao')
  class Operacao {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Banco, (banco) => banco.cheque)
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;
  
    @ManyToOne(() => Client, (client) => client.operacao)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @OneToMany(() => ChequeOperacao, (chequeOperacao: ChequeOperacao) => chequeOperacao.operacao)
    public chequeOperacao: ChequeOperacao[];
  
    @ManyToOne(() => User, (user) => user.operacao)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    situacao: string;
    
    @Column()
    percentual: number;
  
    @Column()
    tarifa: number;
  
    @Column('timestamp')
    data_operacao: Date;

    @Column()
    acrescimos: number;
  
    @Column()
    tarifa_bordero: number;
  
    @Column()
    total_operacao: number;
  
    @Column()
    total_encargos: number;
  
    @Column()
    total_liquido: number;

    @Column()
    total_outros: number;

    @Column()
    obs: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Operacao;
  