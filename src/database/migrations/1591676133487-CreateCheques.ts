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
            name: 'u3',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'situacao',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'emissao',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'prevDeposito',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'deposito',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'envio',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'devolucao',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'pagamento',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'valor',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'fornecedor_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'emitente',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emitenteTipo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'documento',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
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
        name: 'FornecedorCheque',
        columnNames: ['fornecedor_id'],
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
