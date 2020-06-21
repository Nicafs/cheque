import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTelefoneClient1592714639391 implements MigrationInterface {
    name = 'CreateTelefoneClient1592714639391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'telefoneClient',
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
                  name: 'user_id',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'tipo',
                  type: 'string',
                  isNullable: false,
                },
                {
                  name: 'numero',
                  type: 'string',
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
            'telefoneClient',
            new TableForeignKey({
              name: 'TelefoneClient',
              columnNames: ['client_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'client',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );

          await queryRunner.createForeignKey(
            'telefoneClient',
            new TableForeignKey({
              name: 'TelefoneUser',
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('telefoneClient', 'TelefoneClient');
        await queryRunner.dropForeignKey('telefoneClient', 'TelefoneUser');

        await queryRunner.dropTable('telefoneClient');
    }

}