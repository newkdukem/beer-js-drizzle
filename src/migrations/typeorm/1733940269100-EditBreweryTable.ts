import { MigrationInterface, QueryRunner } from "typeorm";

export class EditBreweryTable1733940269100 implements MigrationInterface {
    name = 'EditBreweryTable1733940269100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brewery" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "brewery" ADD "address" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brewery" ADD "city" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brewery" ADD "region" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "brewery" ADD "country" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brewery" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "brewery" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "brewery" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "brewery" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "brewery" ADD "location" character varying(255) NOT NULL`);
    }

}
