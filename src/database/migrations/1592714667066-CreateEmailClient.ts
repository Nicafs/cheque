import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateEmailClient1592714667066 implements MigrationInterface {
    name = 'CreateEmailClient1592714667066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'emailClient',
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
                  type: 'uuid',
                  isNullable: false,
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'principal',
                  type: 'boolean',
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
            'emailClient',
            new TableForeignKey({
              name: 'EmailClient',
              columnNames: ['client_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'clients',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );

          await queryRunner.createForeignKey(
            'emailClient',
            new TableForeignKey({
              name: 'EmailUser',
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('emailClient', 'EmailClient');
        await queryRunner.dropForeignKey('emailClient', 'EmailUser');

        await queryRunner.dropTable('emailClient');
    }

}