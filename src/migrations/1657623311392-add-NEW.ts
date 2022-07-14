import {MigrationInterface, QueryRunner} from "typeorm";

export class addNEW1657623311392 implements MigrationInterface {
    name = 'addNEW1657623311392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "dept_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "department" RENAME CONSTRAINT "PK_dd43bcc4c4d26f5efeb47d19e79" TO "PK_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "department" RENAME CONSTRAINT "PK_9a2213262c1593bffb581e382f5" TO "PK_dd43bcc4c4d26f5efeb47d19e79"`);
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "id" TO "dept_id"`);
    }

}
