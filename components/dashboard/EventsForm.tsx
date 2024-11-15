import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";

interface EventsFormProps {
    eventName: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    eventType: string;
    setEventType: React.Dispatch<React.SetStateAction<string>>;
    eventStartTime: Moment | null;
    setEventStartTime: React.Dispatch<React.SetStateAction<Moment | null>>;
}

export default function EventsForm({
    eventName,
    setEventName,
    eventType,
    setEventType,
    eventStartTime,
    setEventStartTime,
}: EventsFormProps) {
    return (
        <Box>
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
                <MenuItem value="Cricket">Cricket</MenuItem>
                <MenuItem value="Golf">Golf</MenuItem>
                <MenuItem value="Baseball">Baseball</MenuItem>
                <MenuItem value="Rugby">Rugby</MenuItem>
                <MenuItem value="Hockey">Hockey</MenuItem>
                <MenuItem value="Boxing">Boxing</MenuItem>
                <MenuItem value="MMA">MMA</MenuItem>
                <MenuItem value="Esports">Esports</MenuItem>
                <MenuItem value="Cycling">Cycling</MenuItem>
                <MenuItem value="Table Tennis">Table Tennis</MenuItem>
                <MenuItem value="Volleyball">Volleyball</MenuItem>
                <MenuItem value="Motorsport">Motorsport</MenuItem>
                <MenuItem value="Swimming">Swimming</MenuItem>
                <MenuItem value="Athletics">Athletics</MenuItem>
                <MenuItem value="Snooker">Snooker</MenuItem>
                <MenuItem value="Darts">Darts</MenuItem>
                <MenuItem value="Badminton">Badminton</MenuItem>
                <MenuItem value="Handball">Handball</MenuItem>
                <MenuItem value="Water Polo">Water Polo</MenuItem>
                <MenuItem value="Wrestling">Wrestling</MenuItem>
            </TextField>
            <DateTimePicker
                label="Event Start Time"
                value={eventStartTime}
                onChange={(newValue) => setEventStartTime(newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                    textField: {
                        margin: "dense",
                        fullWidth: true,
                        required: true,
                    },
                }}
            />
        </Box>
    );
}
