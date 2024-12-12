import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBreweryTable1733939446235 implements MigrationInterface {
    name = 'CreateBreweryTable1733939446235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brewery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "location" character varying(255) NOT NULL, "website_url" character varying(500), "founded_year" integer, "description" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d02cc4f101bd53d64d9c1c87294" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "brewery"`);
    }

}
