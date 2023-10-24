import { appSchema } from './app.config';
import { databaseSchema } from './database.config';

export function validate(config: Record<string, unknown>) {
  const schema = appSchema.merge(databaseSchema);

  return schema.parse(config);
}