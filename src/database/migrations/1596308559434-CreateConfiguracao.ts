import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
  
export class CreateConfiguracao1596308559434 implements MigrationInterface {
    name = 'CreateConfiguracao1596308559434';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'configuracao',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'nomeFantasia',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'logo',
                  type: 'bytea',
                  isNullable: true,
                },
                {
                  name: 'cpfCnpj',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'celular',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'whatsapp',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'telefone',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'percentagem',
                  type: 'int',
                  isNullable: true,
                },
                {
                  name: 'endBairro',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'endCep',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'endCidade',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'endEstado',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'endComplemento',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'endTipoLogradouro',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'endLogradouro',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'endNumero',
                  type: 'int',
                  isNullable: true,
                },
                {
                  name: 'endReferencia',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('configuracao');
    }

}
