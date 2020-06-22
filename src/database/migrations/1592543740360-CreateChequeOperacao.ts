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
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'banco_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'operacao_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'client_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'agencia',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'conta',
            type: 'numeric',
            isNullable: false,
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
            name: 'status',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'data_vencimento',
            type: 'Date',
            isNullable: false,
          },
          {
            name: 'data_quitacao',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'valor_operacao',
            type: 'numeric',
            isNullable: false,
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
        name: 'ChequeOperacaoClient',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'chequeOperacao',
      new TableForeignKey({
        name: 'ChequeOperacaoBanco',
        columnNames: ['banco_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bancos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'chequeOperacao',
      new TableForeignKey({
        name: 'ChequeOperacaoUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('chequeOperacao', 'ChequeOperacaoOperacao');
    await queryRunner.dropForeignKey('chequeOperacao', 'ChequeOperacaoClient');
    await queryRunner.dropForeignKey('chequeOperacao', 'ChequeOperacaoBanco');
    await queryRunner.dropForeignKey('chequeOperacao', 'ChequeOperacaoUser');

    await queryRunner.dropTable('chequeOperacao');
  }
}
