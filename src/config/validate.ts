import { appSchema } from './app.config';

export function validate(config: Record<string, unknown>) {
  return appSchema.parse(config);
}