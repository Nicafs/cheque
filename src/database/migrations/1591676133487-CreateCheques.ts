import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCheques1591676133487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cheques',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'banco_id',
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
            isNullable: false,
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
      'cheques',
      new TableForeignKey({
        name: 'BancoCheque',
        columnNames: ['banco_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bancos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'cheques',
      new TableForeignKey({
        name: 'ClienteCheque',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'cheques',
      new TableForeignKey({
        name: 'ChequeUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cheques', 'ClienteCheque');
    await queryRunner.dropForeignKey('cheques', 'BancoCheque');
    await queryRunner.dropForeignKey('cheques', 'ChequeUser');

    await queryRunner.dropTable('cheques');
  }
}
