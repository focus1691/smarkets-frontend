export interface Event {
  id: number;
  name: string;
  date: Date;
  type: string;
  markets: Market[];
}

export interface Market {
  id: number;
  name: string;
  eventId: number;
  contracts: Contract[];
}

export interface Contract {
  id: number;
  name: string;
  marketId: number;
}
