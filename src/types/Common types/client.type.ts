import type { UUID } from 'crypto'

export interface Client{
	id: UUID 
	fullName: string;
	phoneNumber: string;
}

