import 'dotenv/config';
import express, { Request, Response } from 'express';

import { AppDataSource } from './data-source';
import { User } from './models/entities/User';

const app = express();
const port = process.env.PORT || 8332;

app.get('/', (req: Request, res: Response) => {
  console.log('We were requested!');
  res.send('Hello, BeerJS!');
});

app.get('/user/:id', async (req: Request, res: Response) => {
  console.time('findOne with relations');

  const id = req.params.id;
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: { id },
    relations: ['beers', 'beers.brewery', 'pubs', 'pubs.beers']
  });

  console.timeEnd('findOne with relations');
  res.send(user);
});

app.get('/userQueryBuilder/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  console.time('findOne with query builder');

  const user = await AppDataSource.createQueryBuilder(User, 'user')
    .where('user.id = :id', { id })
    .leftJoinAndSelect('user.beers', 'beers')
    .leftJoinAndSelect('beers.brewery', 'brewery')
    .leftJoinAndSelect('user.pubs', 'pubs')
    .leftJoinAndSelect('pubs.beers', 'pubBeers')
    .getOne();

  console.timeEnd('findOne with query builder');
  res.send(user);
});

app.get('/userRaw/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  console.time('findOne with raw query');

  const user = await AppDataSource.query(
    `
    SELECT json_build_object(
      'id', u.id,
      'name', u.name,
      'email', u.email,
      'bio', u.bio,
      'created_at', u.created_at,
      'updated_at', u.updated_at,
      'beers', COALESCE(beers_data.beers, '[]'),
      'pubs', COALESCE(pubs_data.pubs, '[]')
    ) AS user
    FROM "user" u
    LEFT JOIN LATERAL (
      SELECT json_agg(
        json_build_object(
          'id', b.id,
          'name', b.name,
          'abv', b.abv,
          'ibu', b.ibu,
          'description', b.description,
          'created_at', b.created_at,
          'updated_at', b.updated_at,
          'brewery', json_build_object(
            'id', br.id,
            'name', br.name,
            'address', br.address,
            'city', br.city,
            'region', br.region,
            'country', br.country,
            'website_url', br.website_url,
            'founded_year', br.founded_year,
            'description', br.description,
            'created_at', br.created_at,
            'updated_at', br.updated_at
          )
        )
      ) AS beers
      FROM user_beers_beer ub
      LEFT JOIN beer b ON b.id = ub."beerId"
      LEFT JOIN brewery br ON br.id = b."breweryId"
      WHERE ub."userId" = u.id
    ) beers_data ON true
    LEFT JOIN LATERAL (
      SELECT json_agg(
        json_build_object(
          'id', p.id,
          'name', p.name,
          'address', p.address,
          'city', p.city,
          'region', p.region,
          'country', p.country,
          'latitude', p.latitude,
          'longitude', p.longitude,
          'description', p.description,
          'website_url', p.website_url,
          'created_at', p.created_at,
          'updated_at', p.updated_at,
          'beers', COALESCE(pub_beers_data.pub_beers, '[]')
        )
      ) AS pubs
      FROM user_pubs_pub upp
      LEFT JOIN pub p ON p.id = upp."pubId"
      LEFT JOIN LATERAL (
        SELECT json_agg(
          json_build_object(
            'id', pb.id,
            'name', pb.name,
            'abv', pb.abv,
            'ibu', pb.ibu,
            'description', pb.description,
            'created_at', pb.created_at,
            'updated_at', pb.updated_at,
            'breweryId', pb."breweryId"
          )
        ) AS pub_beers
        FROM pub_beers_beer pbb
        LEFT JOIN beer pb ON pb.id = pbb."beerId"
        WHERE pbb."pubId" = p.id
      ) pub_beers_data ON true
      WHERE upp."userId" = u.id
    ) pubs_data ON true

    WHERE u.id = $1;
    `,
    [id]
  );

  console.timeEnd('findOne with raw query');
  res.send(user);
});

// Drizzle part
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as relations from './db/relations';
import * as schema from './db/schema';

const db = drizzle(process.env.DATABASE_URL!, {
  logger: true,
  schema: { ...schema, ...relations }
});

app.get('/userDrizzle/:id', async (req: Request, res: Response) => {
  console.time('findOne with drizzle');
  const id = req.params.id;

  const userData = await db.query.user.findFirst({
    where: eq(schema.user.id, id),
    columns: {
      id: true,
      name: true,
      email: true,
      bio: true,
      createdAt: true,
      updatedAt: true
    },
    with: {
      userBeersBeers: {
        columns: {},
        with: {
          beer: {
            with: {
              brewery: true
            }
          }
        }
      },
      userPubsPubs: {
        columns: {},
        with: {
          pub: {
            with: {
              pubBeersBeers: {
                columns: {},
                with: {
                  beer: {
                    with: {
                      brewery: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  console.timeEnd('findOne with drizzle');

  if (!userData) {
    res.status(404);
    return;
  }
  res.send(userData);
});

const startServer = async () => {
  try {
    console.log('Connecting to Beer database...');
    await AppDataSource.initialize();
    console.log('...successfully!');
  } catch (error) {
    console.error('Error connecting to Beer database:', error);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
