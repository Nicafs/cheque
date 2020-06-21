import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  
  import Client from './Client';
  import User from './User';
  
  @Entity('emailClient')
  class EmailClient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    principal: boolean;
  
    @OneToMany(() => Client, (client) => client.emailClient)
    client: Client[];
  
    @OneToMany(() => User, (user) => user.emailClient)
    user: User[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default EmailClient;
  