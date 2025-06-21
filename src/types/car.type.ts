import type { UUID } from 'crypto';

export interface ColorType {
  name: string;
  hex: string;
}

export interface ModelOptions {
  engine: string[];
  price: number;
  color: ColorType[];
}

type CarConfig = Record<string, ModelOptions>;

export interface CarType {
  id: UUID;
  brand: string;
  model: string;
  description: string;
  imgPath: string;
  configurations: CarConfig;
}
