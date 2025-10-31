'use client'
import useUsuarioAtual from "@/hooks/useUsuarioAtual"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import IconUserWithoutLogin from "../../../public/icons/IconUSerWithoutLogin"
import { ModalHandle } from "../Modais/ContainerModal/Index"
import Logout from "../Logout/Index"
import ModalLogin from "../Modais/ModalLogin/Index"
import { loginComGoogle } from "@/lib/login"
import { usePathname, useRouter } from "next/navigation"

interface headerOptionsProps {
    label: string
    link: string
}

const headerOptions: headerOptionsProps[] = [
    {   
        label:'inicio',
        link:"/home"
    },
    {   
        label:'agendamento',
        link:"/agendamentos"
    },
]

const styles: Record<'dark' | 'light', string> = {

    'dark' : 'text-[var(--color-gray-100)]',
    'light' : 'text-white font-normal'
}


interface HeaderProps {
    colorMode: 'light' | 'dark'
}

export default function Header({colorMode}: HeaderProps){

    const pathname = usePathname()
    const router = useRouter()
    const {user, loading, loginGoogle, logout, getToken} = useUsuarioAtual()

    const modalLoginRef = useRef<ModalHandle>(null)
    const logoutRef = useRef<ModalHandle>(null)

    useEffect(()=>{
        async function fetchToken() {
            const token = await getToken()   
        }
        fetchToken()
    }, [getToken])

    const handleLogin = async ()=> {
        try {
            await loginComGoogle()
            modalLoginRef.current?.close()
        }catch (err){
            console.error('Erro ao logar', err)
        }
    }

        const handleSelected = (item: headerOptionsProps) => {
            router.push(item.link)
        }
        
    return(
        <header className="flex pb-10 justify-between text-xl items-center">

            <div className="flex gap-20">
                <span className="font-bold">RAIZES</span>

                <nav className="flex gap-10">
                    {headerOptions.map((item, index)=>{
                        const isActive = pathname === item.link
                        return (
                              <span 
                                className={`${isActive ? 'text-[var(--color-brown-80)] font-semibold':`${styles[colorMode]} font-medium`}`}
                                onClick={()=>{handleSelected(item)}} >
                                    {item.label}
                                </span>
                        )
                    }
                      
                    )}
                </nav>
            </div>

            {/* user */}
            <div>

                {user?.photoURL ? (

                    <div>
                        <Image alt="" src={user.photoURL} width={40} height={40} style={{borderRadius:100}} onClick={()=>logoutRef.current?.open()}/>
                        <Logout ref={logoutRef}/>
                    </div>

                ): (
                    <IconUserWithoutLogin width={50} onClick={()=>modalLoginRef.current?.open()} fill={colorMode==='light'?'var(--color-gray-20)':'#262626'}/>
                    // <div className="rounded-full bg-amber-950 w-10 h-10" onClick={loginGoogle}>
                        
                    // </div>

                )}

            </div>

            <ModalLogin ref={modalLoginRef} onClick={handleLogin}/>
        </header>
        )
    }