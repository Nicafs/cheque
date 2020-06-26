import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOperacao1592543714792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operacao',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
            name: 'situacao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'percentual',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'tarifa',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'data_operacao',
            type: 'Date',
            isNullable: false,
          },
          {
            name: 'acrescimos',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'tarifa_bordero',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'total_operacao',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'total_encargos',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'total_liquido',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'total_outros',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'obs',
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
      'operacao',
      new TableForeignKey({
        name: 'ClientsOperacao',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'operacao',
      new TableForeignKey({
        name: 'OperacaoUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('operacao', 'ClientsOperacao');
    await queryRunner.dropForeignKey('operacao', 'OperacaoUser');

    await queryRunner.dropTable('operacao');
  }
}
