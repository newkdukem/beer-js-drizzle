import { pgTable, serial, bigint, varchar, foreignKey, uuid, numeric, integer, text, timestamp, unique, index, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const migrations = pgTable("migrations", {
	id: serial().primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	timestamp: bigint({ mode: "number" }).notNull(),
	name: varchar().notNull(),
});

export const beer = pgTable("beer", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	abv: numeric({ precision: 4, scale:  2 }),
	ibu: integer(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	breweryId: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.breweryId],
			foreignColumns: [brewery.id],
			name: "FK_90153fe87d3eee841f699ef5fa7"
		}),
]);

export const brewery = pgTable("brewery", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	websiteUrl: varchar("website_url", { length: 500 }),
	foundedYear: integer("founded_year"),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	address: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 100 }).notNull(),
	region: varchar({ length: 100 }),
	country: varchar({ length: 100 }).notNull(),
});

export const user = pgTable("user", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	bio: varchar({ length: 500 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("UQ_065d4d8f3b5adb4a08841eae3c8").on(table.name),
	unique("UQ_e12875dfb3b1d92d7d7c5377e22").on(table.email),
]);

export const pub = pgTable("pub", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	address: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 100 }).notNull(),
	region: varchar({ length: 100 }),
	country: varchar({ length: 100 }).notNull(),
	latitude: numeric({ precision: 9, scale:  6 }),
	longitude: numeric({ precision: 9, scale:  6 }),
	description: text(),
	websiteUrl: varchar("website_url", { length: 500 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const userBeersBeer = pgTable("user_beers_beer", {
	userId: uuid().notNull(),
	beerId: uuid().notNull(),
}, (table) => [
	index("IDX_3b907db6fc5443bd530ce88b6c").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	index("IDX_5d9e974c43d8f02baaa91952c6").using("btree", table.beerId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "FK_3b907db6fc5443bd530ce88b6c0"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.beerId],
			foreignColumns: [beer.id],
			name: "FK_5d9e974c43d8f02baaa91952c69"
		}),
	primaryKey({ columns: [table.userId, table.beerId], name: "PK_de3d33a409946ce03876dc9f858"}),
]);

export const userPubsPub = pgTable("user_pubs_pub", {
	userId: uuid().notNull(),
	pubId: uuid().notNull(),
}, (table) => [
	index("IDX_3b32b8b64bd3ab48d1f1e9b204").using("btree", table.pubId.asc().nullsLast().op("uuid_ops")),
	index("IDX_9f8d5a27df7525a4213e577942").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "FK_9f8d5a27df7525a4213e5779425"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.pubId],
			foreignColumns: [pub.id],
			name: "FK_3b32b8b64bd3ab48d1f1e9b204a"
		}),
	primaryKey({ columns: [table.userId, table.pubId], name: "PK_063ab6a7ec20dd1fdb51d808d5d"}),
]);

export const pubBeersBeer = pgTable("pub_beers_beer", {
	pubId: uuid().notNull(),
	beerId: uuid().notNull(),
}, (table) => [
	index("IDX_8abfc04bf13e6e4fa0397c8850").using("btree", table.beerId.asc().nullsLast().op("uuid_ops")),
	index("IDX_d66767a5f9a311713f25c97610").using("btree", table.pubId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.pubId],
			foreignColumns: [pub.id],
			name: "FK_d66767a5f9a311713f25c976109"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.beerId],
			foreignColumns: [beer.id],
			name: "FK_8abfc04bf13e6e4fa0397c88500"
		}),
	primaryKey({ columns: [table.pubId, table.beerId], name: "PK_c315488a9a1f2cafb924dcf0910"}),
]);
