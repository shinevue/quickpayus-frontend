import axios from "axios";

const token = localStorage.getItem("token");

export const API = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    token: token ? token : "",
  },
});
