"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Box,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Event } from "@/types/market.types";
import styles from "./dashboard.module.css";

const events: Event[] = [
  {
    id: 1,
    name: "Arsenal vs. Manchester City",
    date: new Date("2023-11-14T20:00:00Z"),
    type: "football",
    markets: [
      {
        id: 101,
        name: "Who will be the winner?",
        eventId: 1,
        contracts: [
          { id: 1001, name: "Arsenal", marketId: 101 },
          { id: 1002, name: "Manchester City", marketId: 101 },
          { id: 1003, name: "Draw", marketId: 101 },
        ],
      },
      {
        id: 102,
        name: "Who will score first?",
        eventId: 1,
        contracts: [
          { id: 1004, name: "Arsenal", marketId: 102 },
          { id: 1005, name: "Manchester City", marketId: 102 },
          { id: 1006, name: "No Goals", marketId: 102 },
        ],
      },
    ],
  },
];

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#0d0d0d",
});

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar className={styles.header}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Smarkets Events
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Create
          </Button>
        </Toolbar>
      </StyledAppBar>

      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        {events.map((event) => (
          <Card key={event.id} variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.name}</Typography>
              {event.markets.map((market) => (
                <Box key={market.id} sx={{ marginTop: 2 }}>
                  <Typography variant="subtitle1">{market.name}</Typography>
                  <Box display="flex" gap={1} sx={{ marginTop: 1 }}>
                    {market.contracts.map((contract) => (
                      <Button key={contract.id} variant="outlined" size="small">
                        {contract.name}
                      </Button>
                    ))}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Events" />
            <Tab label="Markets" />
            <Tab label="Contracts" />
          </Tabs>
          <Box sx={{ paddingTop: 2 }}>
            {tabIndex === 0 && (
              <>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  margin="dense"
                />
                <TextField
                  select
                  label="Select a category"
                  fullWidth
                  required
                  margin="dense"
                >
                  <MenuItem value="Football">Football</MenuItem>
                  <MenuItem value="Basketball">Basketball</MenuItem>
                  <MenuItem value="Tennis">Tennis</MenuItem>
                </TextField>
              </>
            )}
            {tabIndex === 1 && (
              <Typography>Markets tab content</Typography>
            )}
            {tabIndex === 2 && (
              <Typography>Contracts tab content</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" variant="contained">
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}