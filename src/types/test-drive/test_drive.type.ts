import type { UUID } from 'crypto';
import type { Car } from '../Common types/car.type';
import type { Client } from '../Common types/client.type';
import type { Employee } from '../Common types/employee.type';

export interface TestDriveType {
  id: UUID;
  plannedDate: string;
  status: string;
  car: Car;
  client: Client;
  employee?: Employee | null;
}

export enum TestDriveStatus {
  NotAssigned = 0,
  InProgress = 1,
  Completed = 2,
  Canceled = 3,
}
