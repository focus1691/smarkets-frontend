export interface CreateContractData {
    name: string;
    market_id: number;
  }
  
  export interface CreateMarketData {
    name: string;
    event_id: number;
  }
  
  export interface CreateEventData {
    name: string;
    start_time: Date | string;
    type: string;
  }
  