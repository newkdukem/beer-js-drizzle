import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManyToManyRelations1733996104481 implements MigrationInterface {
    name = 'AddManyToManyRelations1733996104481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_beers_beer" ("userId" uuid NOT NULL, "beerId" uuid NOT NULL, CONSTRAINT "PK_de3d33a409946ce03876dc9f858" PRIMARY KEY ("userId", "beerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3b907db6fc5443bd530ce88b6c" ON "user_beers_beer" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d9e974c43d8f02baaa91952c6" ON "user_beers_beer" ("beerId") `);
        await queryRunner.query(`CREATE TABLE "user_pubs_pub" ("userId" uuid NOT NULL, "pubId" uuid NOT NULL, CONSTRAINT "PK_063ab6a7ec20dd1fdb51d808d5d" PRIMARY KEY ("userId", "pubId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9f8d5a27df7525a4213e577942" ON "user_pubs_pub" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b32b8b64bd3ab48d1f1e9b204" ON "user_pubs_pub" ("pubId") `);
        await queryRunner.query(`CREATE TABLE "pub_beers_beer" ("pubId" uuid NOT NULL, "beerId" uuid NOT NULL, CONSTRAINT "PK_c315488a9a1f2cafb924dcf0910" PRIMARY KEY ("pubId", "beerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d66767a5f9a311713f25c97610" ON "pub_beers_beer" ("pubId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8abfc04bf13e6e4fa0397c8850" ON "pub_beers_beer" ("beerId") `);
        await queryRunner.query(`ALTER TABLE "user_beers_beer" ADD CONSTRAINT "FK_3b907db6fc5443bd530ce88b6c0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_beers_beer" ADD CONSTRAINT "FK_5d9e974c43d8f02baaa91952c69" FOREIGN KEY ("beerId") REFERENCES "beer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_pubs_pub" ADD CONSTRAINT "FK_9f8d5a27df7525a4213e5779425" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_pubs_pub" ADD CONSTRAINT "FK_3b32b8b64bd3ab48d1f1e9b204a" FOREIGN KEY ("pubId") REFERENCES "pub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pub_beers_beer" ADD CONSTRAINT "FK_d66767a5f9a311713f25c976109" FOREIGN KEY ("pubId") REFERENCES "pub"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pub_beers_beer" ADD CONSTRAINT "FK_8abfc04bf13e6e4fa0397c88500" FOREIGN KEY ("beerId") REFERENCES "beer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pub_beers_beer" DROP CONSTRAINT "FK_8abfc04bf13e6e4fa0397c88500"`);
        await queryRunner.query(`ALTER TABLE "pub_beers_beer" DROP CONSTRAINT "FK_d66767a5f9a311713f25c976109"`);
        await queryRunner.query(`ALTER TABLE "user_pubs_pub" DROP CONSTRAINT "FK_3b32b8b64bd3ab48d1f1e9b204a"`);
        await queryRunner.query(`ALTER TABLE "user_pubs_pub" DROP CONSTRAINT "FK_9f8d5a27df7525a4213e5779425"`);
        await queryRunner.query(`ALTER TABLE "user_beers_beer" DROP CONSTRAINT "FK_5d9e974c43d8f02baaa91952c69"`);
        await queryRunner.query(`ALTER TABLE "user_beers_beer" DROP CONSTRAINT "FK_3b907db6fc5443bd530ce88b6c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8abfc04bf13e6e4fa0397c8850"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d66767a5f9a311713f25c97610"`);
        await queryRunner.query(`DROP TABLE "pub_beers_beer"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b32b8b64bd3ab48d1f1e9b204"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f8d5a27df7525a4213e577942"`);
        await queryRunner.query(`DROP TABLE "user_pubs_pub"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d9e974c43d8f02baaa91952c6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b907db6fc5443bd530ce88b6c"`);
        await queryRunner.query(`DROP TABLE "user_beers_beer"`);
    }

}
