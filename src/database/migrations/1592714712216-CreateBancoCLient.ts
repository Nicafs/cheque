import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateBancoCLient1592714712216 implements MigrationInterface {
    name = 'CreateBancoCLient1592714712216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'bancoClient',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                },
                {
                  name: 'client_id',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'banco_id',
                  type: 'int',
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
            'bancoClient',
            new TableForeignKey({
              name: 'BancoClient',
              columnNames: ['client_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'client',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );

          await queryRunner.createForeignKey(
            'bancoClient',
            new TableForeignKey({
              name: 'BancoBanco',
              columnNames: ['banco_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'bancos',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );

          await queryRunner.createForeignKey(
            'bancoClient',
            new TableForeignKey({
              name: 'BancoUser',
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('bancoClient', 'BancoClient');
        await queryRunner.dropForeignKey('bancoClient', 'BancoUser');
        await queryRunner.dropForeignKey('bancoClient', 'BancoBanco');

        await queryRunner.dropTable('bancoClient');
    }

}