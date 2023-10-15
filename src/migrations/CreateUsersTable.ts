import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateUserTable1625725022062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'user' table
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
        ],
      }),
      true
    );

    // Add a new column 'cartId' for the Cart relationship
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'cartId',
        type: 'uuid',
        isNullable: true,
      })
    );

    // Add a new column 'orderId' for the Order relationship
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'orderId',
        type: 'uuid',
        isNullable: true,
      })
    );

    // Check if the table is defined before accessing foreign keys
    const table = await queryRunner.getTable('user');
    if (table) {
        // Create a foreign key relationship between 'user' and 'cart'
        await queryRunner.createForeignKey(
            'user',
            new TableForeignKey({
                columnNames: ['cartId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cart',
                onDelete: 'SET NULL',
            })
        );
  
        // Create a foreign key relationship between 'user' and 'order'
        await queryRunner.createForeignKey(
            'user',
            new TableForeignKey({
                columnNames: ['orderId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'order',
                onDelete: 'SET NULL',
            })
        );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key relationships
    await queryRunner.dropForeignKey('user', 'user_cartId_foreign');
    await queryRunner.dropForeignKey('user', 'user_orderId_foreign');

    // Drop the 'cartId' and 'orderId' columns
    await queryRunner.dropColumn('user', 'cartId');
    await queryRunner.dropColumn('user', 'orderId');

    // Drop the 'user' table
    await queryRunner.dropTable('user', true);
  }
}
