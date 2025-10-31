import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useState } from "react";
import IconClose from "../../../../public/icons/IconClose";

export type ModalHandle = {
    open: () => void
    close: ()=> void
}

export type ModalContainerProps = {
    title: string
    children: ReactNode
    width?: string
    clearErrors?: () => void
    onClose?: () => void
}

const ContainerModal = forwardRef<ModalHandle, ModalContainerProps>(({title, children, width, clearErrors, onClose}, ref)=>{

    const [isOpen, setIsOpen] = useState(false)

    const open = () => {
        console.log("entrou na funcao open")
        setIsOpen(true)}
    const close = () => {
        setIsOpen(false)
        if (clearErrors){
            clearErrors()
        }
        if(onClose){
            console.log("entrou no onClose")
            onClose()
        }
    }

    useImperativeHandle(ref, ()=> ({
        open,
        close,
    }))

    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
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

            <div className={`${width?width:'w-[600px]'} bg-white p-10 rounded-lg`}>
                <div className="w-full flex justify-between">
                    <h5 className="font-semibold text-[var(--color-gray-100)] text-2xl">{title}</h5>
                    <div className="bg-[#f6f6f6] w-10 h-10 rounded-full justify-center items-center flex" onClick={close}><IconClose/></div>
                </div>

                <div className="mt-6 w-full">
                    {children}
                </div>
            </div>
        </div>
    
    )
})

export default ContainerModal