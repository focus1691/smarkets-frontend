export interface CreateContractData {
    name: string;
    marketId: number;
  }
  
  export interface CreateMarketData {
    name: string;
    eventId: number;
  }
  
  export interface CreateEventData {
    name: string;
    startTime: Date | string;
    type: string;
  }
  