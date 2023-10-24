import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export default registerAs('database', () => ({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  name: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  url: process.env.DATABASE_URL,
}));

export const databaseSchema = z.object({
  POSTGRES_USER: z.string().default('root'),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string().default('air_quality'),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z.coerce.number().default(5432),
  DATABASE_URL: z.string().optional(),
});