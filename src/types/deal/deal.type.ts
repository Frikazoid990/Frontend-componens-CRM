import type { UUID } from 'crypto';
import type { Car } from '../Common types/car.type';
import type { Client } from '../Common types/client.type';
import type { Employee } from '../Common types/employee.type';
import type { ColorType } from '../car.type';

export interface DealType {
  id: UUID;
  createdAt: Date;
  isCancelled: boolean;
  price: number;
  status: string;
  selectedConfiguration: string;
  selectedOptions: ModelOptionsForDeal;
  car: Car;
  client: Client;
  employee?: Employee;
}

interface ModelOptionsForDeal {
  engine: string[];
  color: ColorType[];
}
