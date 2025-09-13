import type { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1757784894106 implements MigrationInterface {
  name = 'Initialize1757784894106'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "birthday" date, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "todos" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "fk_2a70601e01c19e6a707c02078c98684d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "todos" ADD CONSTRAINT "fk_6880612791e8fb2113d10d31fec92310" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "fk_6880612791e8fb2113d10d31fec92310"`,
    )
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP CONSTRAINT "fk_2a70601e01c19e6a707c02078c98684d"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "todos"`)
    await queryRunner.query(`DROP TABLE "profiles"`)
  }
}
