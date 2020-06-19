import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateChequeOperacao1592543740360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chequeOperacao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'banco_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'agencia',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'conta',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'numero',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dias',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'situacao',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'data_vencimento',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'data_quitacao',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'valor_operacao',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'valor_encargos',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'emitente',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'chequeOperacao',
      new TableForeignKey({
        name: 'ChequeOperacaoOperacao',
        columnNames: ['operacao_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'operacao',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'chequeOperacao',
      new TableForeignKey({
        name: 'BancoOperacao',
        columnNames: ['banco_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bancos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cheques', 'ChequeOperacaoOperacao');
    await queryRunner.dropForeignKey('cheques', 'BancoOperacao');

    await queryRunner.dropTable('operacao');
  }
}
