'use client'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ModalHandle } from "../Modais/ContainerModal/Index"
import IconLogout from "../../../public/icons/IconLogout"
import useUsuarioAtual from "@/hooks/useUsuarioAtual"


const Logout = forwardRef<ModalHandle>((_, ref)=>{
    const [isOpen, setIsOpen] = useState(false)
    const logOutRef = useRef<HTMLDivElement>(null)
    
     const {loading, logout} = useUsuarioAtual()

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    
   useImperativeHandle(ref, ()=> ({
        open,
        close
    }))

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
               if(logOutRef.current && !logOutRef.current.contains(event.target as Node)){
                   close()
               }
            }
               if (isOpen){
                document.addEventListener('mousedown', handleClickOutside)
               }
               return ()=> {
                document.removeEventListener('mousedown', handleClickOutside)
               }
               
            }, [isOpen])
            
    

    if (!isOpen) return null

    return(
        <div className="right-32 mt-1 absolute border-1 border-[#C0C0C0] w-64 bg-white flex items-center gap-3 px-4 py-2 rounded-sm"  ref={logOutRef} onClick={logout}>
            <IconLogout width={20}/>
            <span className="text-[var(--color-gray-100)] font-bold text-lg">Logout</span>
        </div>
    )
})

export default Logout