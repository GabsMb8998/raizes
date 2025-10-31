import useUsuarioAtual from "@/hooks/useUsuarioAtual";
import axios from "axios";
import { auth } from "./firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

const api = axios.create({
    baseURL: 'https://studioraizes-1.onrender.com'
})

api.interceptors.request.use(async (config) => {
    let user = auth.currentUser

    if(!user){
        await new Promise<void>((resolve)=>{
            const unsub = onAuthStateChanged(auth, (u)=> {
                user = u;
                unsub();
                resolve();
            })
        })
    }

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