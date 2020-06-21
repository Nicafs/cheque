import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  import Client from './Client';
  import Banco from './Banco';
  import User from './User';
  
  @Entity('bancoClient')
  class BancoClient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    agencia: number;
  
    @Column()
    conta: number;

    @ManyToOne(() => Client, (client) => client.bancoClient)
    @JoinColumn({ name: 'client_id' })
    client: Client;
  
    @ManyToOne(() => User, (user) => user.bancoClient)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Banco, (banco) => banco.bancoClient)
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default BancoClient;
  