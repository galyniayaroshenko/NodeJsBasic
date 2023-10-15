import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateOrderTable1625725022062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'order' table
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'comments',
            type: 'text',
          },
          {
            name: 'total',
            type: 'decimal(10, 2)',
          },
          {
            name: 'status',
            type: 'varchar',
          }
        ],
      }),
      true
    );

    // Add a foreign key to link 'order' with 'user'
    await queryRunner.addColumn('order', new TableColumn({
      name: 'userId',
      type: 'uuid',
      isNullable: true,
    }));

    // Add a foreign key to link 'order' with 'cartItem'
    await queryRunner.addColumn('cartItem', new TableColumn({
      name: 'orderId',
      type: 'uuid',
      isNullable: true,
    }));

    // Check if the table is defined before accessing foreign keys
    const table = await queryRunner.getTable('order');
    if (table) {
        await queryRunner.createForeignKey('order', new TableForeignKey({
            columnNames: ['orderId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cartItem',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('order', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key relationship between 'order' and 'user'
    await queryRunner.dropForeignKey('order', 'FK_UserId');

    // Drop the 'userId' column
    await queryRunner.dropColumn('order', 'userId');

    // Drop the 'order' table
    await queryRunner.dropTable('order', true);
  }
}