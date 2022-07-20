import {MigrationInterface, QueryRunner} from "typeorm";

export class new1658218733824 implements MigrationInterface {
    name = 'new1658218733824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_c8b9364da09bfd7aa71309b7214"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeid"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_c8b9364da09bfd7aa71309b7214" UNIQUE ("employeeid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_c8b9364da09bfd7aa71309b7214"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeid"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeid" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_c8b9364da09bfd7aa71309b7214" UNIQUE ("employeeid")`);
    }

}
