import { CreateContractData, CreateEventData, CreateMarketData } from "@/types/request.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createContract(data: CreateContractData) {
  const response = await fetch(`${API_URL}/contracts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteContract(contractId: number) {
  const response = await fetch(`${API_URL}/contracts/${contractId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getContract(contractId: number) {
  const response = await fetch(`${API_URL}/contracts/${contractId}`);
  return response.json();
}

export async function getContracts() {
  const response = await fetch(`${API_URL}/contracts/`);
  return response.json();
}

export async function createEvent(data: CreateEventData) {
  const response = await fetch(`${API_URL}/events/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteEvent(eventId: number) {
  const response = await fetch(`${API_URL}/events/${eventId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getEvent(eventId: number) {
  const response = await fetch(`${API_URL}/events/${eventId}`);
  return response.json();
}

export async function getEvents() {
  const response = await fetch(`${API_URL}/events/`);
  return response.json();
}

export async function createMarket(data: CreateMarketData) {
  const response = await fetch(`${API_URL}/markets/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteMarket(marketId: number) {
  const response = await fetch(`${API_URL}/markets/${marketId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getMarkets() {
  const response = await fetch(`${API_URL}/markets/`);
  return response.json();
}
