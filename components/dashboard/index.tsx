"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./page.module.css";

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


export default function Dashboard() {
  const [expandedMarkets, setExpandedMarkets] = useState<{ [key: number]: boolean }>({});

  const handleExpandClick = (marketId: number) => {
    setExpandedMarkets((prev) => ({
      ...prev,
      [marketId]: !prev[marketId],
    }));
  };

  return (
    <Container>
      {events.map((event) => (
        <Card key={event.id} variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                {event.name}
              </Typography>
              <IconButton aria-label="delete" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="textSecondary">
              EVENT ID: {event.id}
            </Typography>
            {event.markets.map((market) => (
              <Card key={market.id} variant="outlined" sx={{ marginTop: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" gutterBottom>
                      {market.name}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => handleExpandClick(market.id)}>
                        <ExpandMoreIcon
                          sx={{
                            transform: expandedMarkets[market.id] ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        />
                      </IconButton>
                      <IconButton aria-label="delete" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    MARKET ID: {market.id}
                  </Typography>
                  <Collapse in={expandedMarkets[market.id]} timeout="auto" unmountOnExit>
                    <Grid container spacing={1} sx={{ marginTop: 1 }}>
                      {market.contracts.map((contract) => (
                        <Grid item key={contract.id}>
                          <Button variant="outlined" size="small">
                            {contract.name}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}