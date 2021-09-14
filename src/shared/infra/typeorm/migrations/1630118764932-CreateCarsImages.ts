import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarsImages1630118764932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_image",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "image_name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCarImages",
            columnNames: ["car_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cars",
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("car_images");
  }
}
