"use client";

import { useEffect, useState } from "react";
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
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Event } from "@/types/market.types";
import styles from "./dashboard.module.css";
import { createContract, createEvent, createMarket, deleteContract, deleteEvent, deleteMarket, getEvents } from "@/api";
import ContractsForm from "./ContractsForm";
import EventsForm from "./EventsForm";
import MarketsForm from "./MarketsForm";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#0d0d0d",
});

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [marketName, setMarketName] = useState("");
  const [contractName, setContractName] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedMarketId, setSelectedMarketId] = useState<number | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"event" | "market" | "contract" | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEventName("");
    setEventType("");
    setMarketName("");
    setContractName("");
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const openDeleteDialog = (type: "event" | "market" | "contract", id: number) => {
    setDeleteType(type);
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteType(null);
    setDeleteId(null);
  };

  const handleCreate = async () => {
    try {
      if (tabIndex === 0) {
        await createEvent({
          name: eventName,
          start_time: new Date().toISOString(),
          type: eventType,
        });
      } else if (tabIndex === 1 && selectedEventId) {
        await createMarket({
          name: marketName,
          event_id: selectedEventId,
        });
      } else if (tabIndex === 2 && selectedMarketId) {
        await createContract({
          name: contractName,
          market_id: selectedMarketId,
        });
      }
      handleClose();
      await fetchEvents(); // TODO: return the new event and update state 
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  
  const handleDelete = async () => {
    if (!deleteId || !deleteType) return;
  
    try {
      if (deleteType === "event") {
        await deleteEvent(deleteId);
      } else if (deleteType === "market") {
        await deleteMarket(deleteId);
      } else if (deleteType === "contract") {
        await deleteContract(deleteId);
      }
      closeDeleteDialog();
      await fetchEvents(); // TODO: Check for delete success and delete from state
    } catch (error) {
      console.error(`Error deleting ${deleteType}:`, error);
    }
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

      <Container sx={{ marginTop: 4 }}>
        {events.map((event) => (
          <Card key={event.id} variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{event.name}</Typography>
                <Button
                  onClick={() => openDeleteDialog("event", event.id)}
                  startIcon={<DeleteIcon />}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
              {event.markets.map((market) => (
                <Box key={market.id} sx={{ marginTop: 2 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">{market.name}</Typography>
                    <Button
                      onClick={() => openDeleteDialog("market", market.id)}
                      startIcon={<DeleteIcon />}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                  <Box display="flex" gap={1} sx={{ marginTop: 1 }}>
                    {market.contracts.map((contract) => (
                      <Button
                        key={contract.id}
                        variant="outlined"
                        size="small"
                        endIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => openDeleteDialog("contract", contract.id)}
                      >
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
              <EventsForm
                eventName={eventName}
                setEventName={setEventName}
                eventType={eventType}
                setEventType={setEventType}
              />
            )}
            {tabIndex === 1 && (
              <MarketsForm
                marketName={marketName}
                setMarketName={setMarketName}
                selectedEventId={selectedEventId}
                setSelectedEventId={setSelectedEventId}
                events={events}
              />
            )}
            {tabIndex === 2 && (
              <ContractsForm
                contractName={contractName}
                setContractName={setContractName}
                selectedMarketId={selectedMarketId}
                setSelectedMarketId={setSelectedMarketId}
                events={events}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Create {tabIndex === 0 ? "Event" : tabIndex === 1 ? "Market" : "Contract"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete {deleteType}?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {deleteType}? Corresponding child resources will also be deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}