import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePubTable1733940208322 implements MigrationInterface {
    name = 'CreatePubTable1733940208322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "region" character varying(100), "country" character varying(100) NOT NULL, "latitude" numeric(9,6), "longitude" numeric(9,6), "description" text, "website_url" character varying(500), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f193381478158e93cb41936f8fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pub"`);
    }

}
