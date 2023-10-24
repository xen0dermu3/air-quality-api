import { Root } from '../interfaces';

export class CreateIqairDto {
  coordinates!: {
    latitude: string
    longitude: string
  };
  data!: Root;
}