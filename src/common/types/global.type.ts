import { z } from 'zod';
import { appSchema } from '../../config/app.config';
import { databaseSchema } from '../../config/database.config';

export {};

const schema = appSchema.merge(databaseSchema);

type Schema = z.infer<typeof schema>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Schema {
    }
  }
}