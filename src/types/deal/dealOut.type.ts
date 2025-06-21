import type { UUID } from 'crypto';

export interface DealTypeOut {
  clientId: UUID;
  carId: UUID;
  selectedConfiguration: string;
  selectedOptions: ModelOptionsForDeal;
}

interface ModelOptionsForDeal {
  engine: string;

  color: {
    name: string;
    hex: string;
  };
}
