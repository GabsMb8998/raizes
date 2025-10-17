import api from "../api";
import { HttpClient } from "./httpClient";

export const apiClient : HttpClient = {
    request: (config) => api.request(config)
}