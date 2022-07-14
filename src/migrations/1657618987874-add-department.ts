import {MigrationInterface, QueryRunner} from "typeorm";

export class addDepartment1657618987874 implements MigrationInterface {
    name = 'addDepartment1657618987874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("dept_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dept_name" character varying NOT NULL, CONSTRAINT "PK_dd43bcc4c4d26f5efeb47d19e79" PRIMARY KEY ("dept_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
