import type { UUID } from 'crypto';

export interface DealTypeOut {
  clientId: UUID;
  carId: UUID;
  selectedConfiguration: string;
  selectedOptions: ModelOptionsForDeal;
}

interface ModelOptionsForDeal {
  Engine: string;
  Price: string;
  Color: string;
}
