import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // इथे तुझा backend URL दे
  headers: {
    "Content-Type": "application/json",
  },
});
