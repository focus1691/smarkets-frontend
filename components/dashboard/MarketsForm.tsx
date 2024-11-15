import { TextField, MenuItem } from "@mui/material";
import React from "react";
import { Event } from "@/types/market.types";

interface MarketsFormProps {
  marketName: string;
  setMarketName: React.Dispatch<React.SetStateAction<string>>;
  selectedEventId: number | null;
  setSelectedEventId: React.Dispatch<React.SetStateAction<number | null>>;
  events: Event[];
}

export default function MarketsForm({
  marketName,
  setMarketName,
  selectedEventId,
  setSelectedEventId,
  events,
}: MarketsFormProps) {
  return (
    <>
      <TextField
        label="Market Name"
        variant="outlined"
        fullWidth
        required
        margin="dense"
        value={marketName}
        onChange={(e) => setMarketName(e.target.value)}
      />
      <TextField
        select
        label="Select an Event"
        fullWidth
        required
        margin="dense"
        value={selectedEventId || ""}
        onChange={(e) => setSelectedEventId(Number(e.target.value))}
      >
        {events.map((event) => (
          <MenuItem key={event.id} value={event.id}>
            {event.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
