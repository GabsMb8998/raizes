'use client'    
import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useState } from "react";
import IconClose from "../../../../public/icons/IconClose";
import LogoGoogle from "../../../../public/icons/LogoGoogle";

    export type ModalHandle = {
        open: () => void
        close: ()=> void
    }

    interface ModalLoginProps {
        onClick: () => void
    }

    const ModalLogin = forwardRef<ModalHandle, ModalLoginProps>(({onClick}, ref)=>{

        const [isOpen, setIsOpen] = useState(false)

        const open = () => setIsOpen(true)
        const close = () => setIsOpen(false)

        useImperativeHandle(ref, ()=> ({open,close}))

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
            document.body.style.overflowX = isOpen ? '' : 'hidden';

        } else {
            document.body.style.overflow = "";
        }

        // cleanup caso o componente seja desmontado
        return () => {
        document.body.style.overflow = "";
        };
    }, [isOpen]);

        if(!isOpen) return null
        return (
            <div className="bg-[rgba(0,0,0,0.5)] h-screen w-screen absolute bottom-0 top-0 left-0 flex justify-center items-center">

                <div className={`w-[600px] bg-white p-10 rounded-lg`}>
                    <div className="w-full flex justify-end">
                        <div className="bg-[#f6f6f6] w-10 h-10 rounded-full justify-center items-center flex" onClick={close}><IconClose/></div>
                    </div>

                    <div className="mt-2 w-full">

                        <div className="flex flex-col items-center gap-3">
                            <h5 className="text-[var(--color-gray-100)] text-3xl font-semibold">LOGIN</h5>
                            <span className="text-[var(--color-gray-40)] text-2xl font-normal">Faça login com sua conta Google</span>
                        </div>

                        <div className="flex justify-center mt-14">
                            <button className="flex gap-3  border-2 rounded  border-[#e8e8e8] px-12 py-3" onClick={onClick}> <LogoGoogle/> login com o Google </button>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    })

    export default ModalLogin