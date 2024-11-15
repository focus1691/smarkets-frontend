import { TextField, MenuItem } from "@mui/material";
import React from "react";
import { Event } from "@/types/market.types";

interface ContractsFormProps {
  contractName: string;
  setContractName: React.Dispatch<React.SetStateAction<string>>;
  selectedMarketId: number | null;
  setSelectedMarketId: React.Dispatch<React.SetStateAction<number | null>>;
  events: Event[];
}

export default function ContractsForm({
  contractName,
  setContractName,
  selectedMarketId,
  setSelectedMarketId,
  events,
}: ContractsFormProps) {
  return (
    <>
      <TextField
        label="Contract Name"
        variant="outlined"
        fullWidth
        required
        margin="dense"
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
      />
      <TextField
        select
        label="Select a Market"
        fullWidth
        required
        margin="dense"
        value={selectedMarketId || ""}
        onChange={(e) => setSelectedMarketId(Number(e.target.value))}
      >
        {events.flatMap((event) =>
          event.markets.map((market) => (
            <MenuItem key={market.id} value={market.id}>
              {market.name} (Event: {event.name})
            </MenuItem>
          ))
        )}
      </TextField>
    </>
  );
}
