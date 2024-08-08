import axios from "axios";

const token = localStorage.getItem("token");

export const API = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    token: token ? token : "",
  },
});

export const setToken = (token) => {
  localStorage.setItem("token", token);
  API.defaults.headers.token = token;
};
