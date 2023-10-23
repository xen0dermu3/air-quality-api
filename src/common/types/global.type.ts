import { z } from 'zod';
import { appSchema } from '../../config/app.config';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof appSchema> {
    }
  }
}