import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';
import { User, Beer, Brewery, Pub } from '../models/entities';

async function seedDatabase() {
  await AppDataSource.initialize();
  console.log('Connected to the database!');

  await AppDataSource.transaction(async transactionalEntityManager => {
    console.log('Seeding database...');
    const userRepo = transactionalEntityManager.getRepository(User);
    const breweryRepo = transactionalEntityManager.getRepository(Brewery);
    const pubRepo = transactionalEntityManager.getRepository(Pub);
    const beerRepo = transactionalEntityManager.getRepository(Beer);

    // Seed Users
    const users: User[] = [];
    for (let i = 0; i < 1000; i++) {
      const user = userRepo.create({
        name: faker.internet.username(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence()
      });
      users.push(await userRepo.save(user));
    }
    console.log('Seeded users!');

    // Seed Breweries
    const breweries: Brewery[] = [];
    for (let i = 0; i < 10; i++) {
      const brewery = breweryRepo.create({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: faker.location.country(),
        website_url: faker.internet.url(),
        founded_year: faker.date.past({ years: 50 }).getFullYear(),
        description: faker.lorem.paragraph()
      });
      breweries.push(await breweryRepo.save(brewery));
    }
    console.log('Seeded breweries!');

    // Seed Beers
    const beers: Beer[] = [];
    for (let i = 0; i < 400; i++) {
      const beer = beerRepo.create({
        name: faker.commerce.productName(),
        abv: parseFloat(
          faker.number.float({ min: 3, max: 12, fractionDigits: 1 }).toFixed(2)
        ),
        ibu: faker.number.int({ min: 10, max: 100 }),
        description: faker.lorem.sentence(),
        brewery: faker.helpers.arrayElement(breweries)
      });
      beers.push(await beerRepo.save(beer));
    }
    console.log('Seeded beers!');

    // Seed Pubs
    const pubs: Pub[] = [];
    for (let i = 0; i < 40; i++) {
      const pub = pubRepo.create({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: faker.location.country(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        description: faker.lorem.paragraph(),
        website_url: faker.internet.url()
      });
      await pubRepo.save(pub);
      pubs.push(pub);
    }
    console.log('Seeded pubs!');

    // Link Beers to Pubs and Users
    for (const pub of pubs) {
      pub.beers = faker.helpers.arrayElements(
        beers,
        faker.number.int({ min: 1, max: beers.length })
      );
      pub.users = faker.helpers.arrayElements(
        users,
        faker.number.int({ min: 1, max: users.length })
      );
      await pubRepo.save(pub);
    }
    console.log('Seeded pub relationships!');

    for (const user of users) {
      user.beers = faker.helpers.arrayElements(
        beers,
        faker.number.int({ min: 1, max: beers.length })
      );
      user.pubs = faker.helpers.arrayElements(
        pubs,
        faker.number.int({ min: 1, max: pubs.length })
      );
      await userRepo.save(user);
    }
    console.log('Seeded user relationships!');
  });
  console.log('Database seeding complete!');
  await AppDataSource.destroy();
  console.log('Database connection closed.');
}

seedDatabase().catch(error => {
  console.error('Error seeding database:', error);
});
