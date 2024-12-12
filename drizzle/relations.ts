import { relations } from "drizzle-orm/relations";
import { brewery, beer, user, userBeersBeer, userPubsPub, pub, pubBeersBeer } from "./schema";

export const beerRelations = relations(beer, ({one, many}) => ({
	brewery: one(brewery, {
		fields: [beer.breweryId],
		references: [brewery.id]
	}),
	userBeersBeers: many(userBeersBeer),
	pubBeersBeers: many(pubBeersBeer),
}));

export const breweryRelations = relations(brewery, ({many}) => ({
	beers: many(beer),
}));

export const userBeersBeerRelations = relations(userBeersBeer, ({one}) => ({
	user: one(user, {
		fields: [userBeersBeer.userId],
		references: [user.id]
	}),
	beer: one(beer, {
		fields: [userBeersBeer.beerId],
		references: [beer.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	userBeersBeers: many(userBeersBeer),
	userPubsPubs: many(userPubsPub),
}));

export const userPubsPubRelations = relations(userPubsPub, ({one}) => ({
	user: one(user, {
		fields: [userPubsPub.userId],
		references: [user.id]
	}),
	pub: one(pub, {
		fields: [userPubsPub.pubId],
		references: [pub.id]
	}),
}));

export const pubRelations = relations(pub, ({many}) => ({
	userPubsPubs: many(userPubsPub),
	pubBeersBeers: many(pubBeersBeer),
}));

export const pubBeersBeerRelations = relations(pubBeersBeer, ({one}) => ({
	pub: one(pub, {
		fields: [pubBeersBeer.pubId],
		references: [pub.id]
	}),
	beer: one(beer, {
		fields: [pubBeersBeer.beerId],
		references: [beer.id]
	}),
}));