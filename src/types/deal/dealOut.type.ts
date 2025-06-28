import type { UUID } from 'crypto';

export interface DealTypeOut {
  clientId: UUID;
  carId: UUID;
  selectedConfiguration: string;
  selectedOptions: ModelOptionsForDeal;
}

interface ColorOption {
  name: string;
  hex: string;
}

interface ModelOptionsForDeal {
  engine: string[];
  color: ColorOption[];
}
