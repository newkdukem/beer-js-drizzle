import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBeerTable1733939865666 implements MigrationInterface {
    name = 'CreateBeerTable1733939865666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "beer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "abv" numeric(4,2), "ibu" integer, "description" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "breweryId" uuid NOT NULL, CONSTRAINT "PK_68ce81153952014a6e8b20df5c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "beer" ADD CONSTRAINT "FK_90153fe87d3eee841f699ef5fa7" FOREIGN KEY ("breweryId") REFERENCES "brewery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beer" DROP CONSTRAINT "FK_90153fe87d3eee841f699ef5fa7"`);
        await queryRunner.query(`DROP TABLE "beer"`);
    }

}
