import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateProductTable1625725022062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'product' table
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal(10,2)',
          }
        ],
      }),
      true
    );

    // Add a new column 'cartItemId' for the CartItem relationship
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'cartItemId',
        type: 'uuid',
        isNullable: true,
      })
    );

    // Check if the table is defined before accessing foreign keys
    const table = await queryRunner.getTable('product');
    if (table) {
      // Create a foreign key relationship between 'product' and 'cart_item'
      await queryRunner.createForeignKey(
        'product',
        new TableForeignKey({
          columnNames: ['cartItemId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'cart_item',
          onDelete: 'SET NULL',
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key relationship
    const table = await queryRunner.getTable('product');
    if (table) {
      const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('cartItemId') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('product', foreignKey);
      }
    }

    // Drop the 'cartItemId' column
    await queryRunner.dropColumn('product', 'cartItemId');

    // Drop the 'product' table
    await queryRunner.dropTable('product');
  }
}
