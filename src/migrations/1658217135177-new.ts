import {MigrationInterface, QueryRunner} from "typeorm";

export class new1658217135177 implements MigrationInterface {
    name = 'new1658217135177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeid" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_c8b9364da09bfd7aa71309b7214" UNIQUE ("employeeid")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_c8b9364da09bfd7aa71309b7214"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeid"`);
    }

}
