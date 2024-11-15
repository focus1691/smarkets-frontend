export interface Event {
  id: number;
  name: string;
  startTime: Date;
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
