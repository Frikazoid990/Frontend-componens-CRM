import type { UUID } from 'crypto'
import type { Car } from '../Common types/car.type'
import type { Client } from '../Common types/client.type'
import type { Employee } from '../Common types/employee.type'


export interface DealType{
	id: UUID;
	createdAt: Date;
	isCanceled: boolean;
	Price: number;
	Status: string;
	selectedConfiguration: string;
	selectedOptions: ModelOptionsForDeal;
	car : Car;
	client: Client;
	employee?: Employee;
}

interface ModelOptionsForDeal {
	Engine: string;
	Price: number;
	Color: string;
}