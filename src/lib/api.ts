import useUsuarioAtual from "@/hooks/useUsuarioAtual";
import axios from "axios";
import { auth } from "./firebaseClient";

const api = axios.create({
    baseURL: 'https://studioraizes-1.onrender.com'
})

api.interceptors.request.use(async (config) => {
    const user = auth.currentUser

    if (user) {
        const token = await user.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
        console.log(token, 'token')     
    }
    return config

}, (error) => {
  return Promise.reject(error);
})
export default api