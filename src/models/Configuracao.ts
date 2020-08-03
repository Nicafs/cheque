import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
    
  @Entity('configuracao')
  class Configuracao {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    nomeFantasia: string;
  
    @Column('bytea')
    logo: Buffer;
  
    @Column()
    cpfCnpj: string;
  
    @Column()
    email: string;
  
    @Column()
    celular: string;
  
    @Column()
    whatsapp: string;
  
    @Column()
    telefone: string;
  
    @Column()
    percentagem: number;
  
    @Column()
    endBairro: string;
  
    @Column()
    endCep: string;
  
    @Column()
    endCidade: string;
  
    @Column()
    endEstado: string;
  
    @Column()
    endComplemento: string;
  
    @Column()
    endTipoLogradouro: string;
  
    @Column()
    endLogradouro: string;
  
    @Column()
    endNumero: number;
  
    @Column()
    endReferencia: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Configuracao;
  