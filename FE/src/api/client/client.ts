import { API_BASE } from "@env";
import axios from "axios";

const client = axios.create({
  baseURL: API_BASE,
});

export default client;
