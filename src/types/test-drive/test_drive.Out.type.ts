import type { UUID } from 'crypto'

export interface TestDriveTypeOut {
	id: UUID;
	clientId: UUID;
	carId: UUID;
	planedDate: string;
	createdAt: string;
}