-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" bigint NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "beer" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"abv" numeric(4, 2),
	"ibu" integer,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"breweryId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brewery" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"website_url" varchar(500),
	"founded_year" integer,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"region" varchar(100),
	"country" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"bio" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE("name"),
	CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "pub" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"region" varchar(100),
	"country" varchar(100) NOT NULL,
	"latitude" numeric(9, 6),
	"longitude" numeric(9, 6),
	"description" text,
	"website_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_beers_beer" (
	"userId" uuid NOT NULL,
	"beerId" uuid NOT NULL,
	CONSTRAINT "PK_de3d33a409946ce03876dc9f858" PRIMARY KEY("userId","beerId")
);
--> statement-breakpoint
CREATE TABLE "user_pubs_pub" (
	"userId" uuid NOT NULL,
	"pubId" uuid NOT NULL,
	CONSTRAINT "PK_063ab6a7ec20dd1fdb51d808d5d" PRIMARY KEY("userId","pubId")
);
--> statement-breakpoint
CREATE TABLE "pub_beers_beer" (
	"pubId" uuid NOT NULL,
	"beerId" uuid NOT NULL,
	CONSTRAINT "PK_c315488a9a1f2cafb924dcf0910" PRIMARY KEY("pubId","beerId")
);
--> statement-breakpoint
ALTER TABLE "beer" ADD CONSTRAINT "FK_90153fe87d3eee841f699ef5fa7" FOREIGN KEY ("breweryId") REFERENCES "public"."brewery"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_beers_beer" ADD CONSTRAINT "FK_3b907db6fc5443bd530ce88b6c0" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_beers_beer" ADD CONSTRAINT "FK_5d9e974c43d8f02baaa91952c69" FOREIGN KEY ("beerId") REFERENCES "public"."beer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_pubs_pub" ADD CONSTRAINT "FK_9f8d5a27df7525a4213e5779425" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_pubs_pub" ADD CONSTRAINT "FK_3b32b8b64bd3ab48d1f1e9b204a" FOREIGN KEY ("pubId") REFERENCES "public"."pub"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pub_beers_beer" ADD CONSTRAINT "FK_d66767a5f9a311713f25c976109" FOREIGN KEY ("pubId") REFERENCES "public"."pub"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pub_beers_beer" ADD CONSTRAINT "FK_8abfc04bf13e6e4fa0397c88500" FOREIGN KEY ("beerId") REFERENCES "public"."beer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_3b907db6fc5443bd530ce88b6c" ON "user_beers_beer" USING btree ("userId" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_5d9e974c43d8f02baaa91952c6" ON "user_beers_beer" USING btree ("beerId" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_3b32b8b64bd3ab48d1f1e9b204" ON "user_pubs_pub" USING btree ("pubId" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_9f8d5a27df7525a4213e577942" ON "user_pubs_pub" USING btree ("userId" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_8abfc04bf13e6e4fa0397c8850" ON "pub_beers_beer" USING btree ("beerId" uuid_ops);--> statement-breakpoint
CREATE INDEX "IDX_d66767a5f9a311713f25c97610" ON "pub_beers_beer" USING btree ("pubId" uuid_ops);
*/