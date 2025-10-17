// hooks/useUsuarioAtual.ts
import { getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebaseClient"
import { useEffect, useState } from "react"


export default function useUsuarioAtual() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

    const loginGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      const token = await user?.getIdToken()
      if(token){
        localStorage.setItem('token', token)
        console.log('guardou token:', token)
      }
    } catch (error) {
      console.error("Erro ao logar com Google", error)
    }
  }

    const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Erro ao deslogar", error)
    }
  }

    const getToken = async () => {
        if (user) {
            return await user.getIdToken();
        }
        
        return null;
    };


  return { user, loading, loginGoogle, logout, getToken }
}
