import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCartTable1625725022062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'cart' table
    await queryRunner.createTable(
      new Table({
        name: 'cart',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'isDeleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
      }),
      true
    );

    // Check if the table is defined before accessing foreign keys
    const table = await queryRunner.getTable('order');
    if (table) {
        // Create a foreign key to link 'cart' with 'user'
        await queryRunner.createForeignKey(
            'cart',
            new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            })
        );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key relationship between 'cart' and 'user'
    await queryRunner.dropForeignKey('cart', 'FK_UserId');

    // Drop the 'cart' table
    await queryRunner.dropTable('cart', true);
  }
}