// lib/login.ts
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "./firebaseClient"

export async function loginComGoogle() {
  const result = await signInWithPopup(auth, provider)
  const token = await result.user.getIdToken()
  return token // Esse é o token que você envia para o backend
}
