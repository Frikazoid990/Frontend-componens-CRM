	interface ModelOptions {
		Engine: string[];
		Price: number;
		Color: string[];
	}

	
	type CarConfig = Record<string, ModelOptions>;

	export interface CarType {
		id: string;
		brand: string;
		model: string;
		configurationOptions: CarConfig;
	}