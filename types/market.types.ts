interface Event {
  id: number;
  name: string;
  date: Date;
  type: string;
  markets: Market[];
}

interface Market {
  id: number;
  name: string;
  eventId: number;
  contracts: Contract[];
}

interface Contract {
  id: number;
  name: string;
  marketId: number;
}
