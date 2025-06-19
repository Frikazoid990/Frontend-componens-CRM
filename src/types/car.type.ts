import type { UUID } from 'crypto'

	export interface ModelOptions {
		Engine: string[];
		Price: number;
		Color: string[];
	}

	
	type CarConfig = Record<string, ModelOptions>;

	export interface CarType {
		id: UUID;
		brand: string;
		model: string;
		configurationOptions: CarConfig;
	}