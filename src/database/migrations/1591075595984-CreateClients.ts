import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateClients1591075595984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nickname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rg',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birthDate',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'nome_pai',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nome_mae',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'estado_civil',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'conjugue',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'credit',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'limit',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'acrescimo',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'local_trabalho',
            type: 'string',
            isNullable: true,
          },
          {
            name: 'renda_mensal',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'cargo',
            type: 'string',
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
      'clients',
      new TableForeignKey({
        name: 'ClientUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('clients', 'ClientUser');

    await queryRunner.dropTable('clients');
  }
}
