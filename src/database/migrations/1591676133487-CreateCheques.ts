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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cheques', 'ClienteCheque');
    await queryRunner.dropForeignKey('cheques', 'BancoCheque');

    await queryRunner.dropTable('cheques');
  }
}
