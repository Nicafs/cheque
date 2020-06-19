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
  
  @Entity('cheques')
  class Cheque {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Banco, (banco) => banco.cheque)
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;
  
    @ManyToOne(() => Operacao, (operacao) => operacao.chequeOperacao)
    @JoinColumn({ name: 'operacao_id' })
    operacao: Operacao;
    
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
    situacao: string;
  
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
  
  export default Cheque;
  