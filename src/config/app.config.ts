import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export default registerAs('app', () => ({
  port: process.env.APP_PORT,
  env: process.env.NODE_ENV,
}));

export const appSchema = z.object({
  APP_PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});