import { TextField, MenuItem } from "@mui/material";
import React from "react";

interface EventsFormProps {
    eventName: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    eventType: string;
    setEventType: React.Dispatch<React.SetStateAction<string>>;
}

export default function EventsForm({
    eventName,
    setEventName,
    eventType,
    setEventType,
}: EventsFormProps) {
    return (
        <>
            <TextField
                label="Event Name"
                variant="outlined"
                fullWidth
                required
                margin="dense"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />
            <TextField
                select
                label="Select a category"
                fullWidth
                required
                margin="dense"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
            >
                <MenuItem value="Football">Football</MenuItem>
                <MenuItem value="Basketball">Basketball</MenuItem>
                <MenuItem value="Tennis">Tennis</MenuItem>
            </TextField>
        </>
    );
}
