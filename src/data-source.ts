import { DataSource } from 'typeorm';
import { User, Beer, Brewery, Pub } from './models/entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'beerjs',
  synchronize: false,
  logging: true,
  entities: [User, Beer, Brewery, Pub],
  migrations: ['build/migrations/typeorm/*.js'],
  subscribers: []
});
