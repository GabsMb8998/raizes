'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode, useImperativeHandle, useState } from "react"
import IconAgenda from "../../../public/icons/IconAgenda"
import IconDropDown from "../../../public/icons/IconDropDown"

interface SelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    options? : string[] | number[]
    onChange?: (val: any) => void
    error?: string
    children?: ReactNode
    defaultLabel?: string
} 

export type SelectedDropDown = {
    selected: string | number
}

const DropDown= forwardRef<SelectedDropDown, SelectProps>(({options, error, onChange, children,defaultLabel= 'Selecione uma opção',  ...props}, ref)=>{
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<string | number>(!props.value?defaultLabel:props.value.toString())
    
    const handleOpen = () => {setIsOpen(!isOpen)}

    const handleSelected = (val: string| number) => {
        if(onChange){
            onChange(val)
        }
        setSelected(val)
        setIsOpen(false)
    }

    useImperativeHandle(ref, () => ({
        selected
    }))

    // const options2 = ['teste', 'teste2', 'teste2', 'teste2', 'teste2']


    return(
        <div className="w-full relative ">
            
            <div className="text-[#525252] font-medium mb-1">
                {children}
            </div>

            <div 
            onClick={handleOpen}
            className="w-full h-16 flex items-center justify-between gap-8 px-4 border-1 border-[#BFB9B3] rounded py-4">
                <span className={`${selected != defaultLabel ? "text-[#867663]": "text-[var(--color-gray-40)] "}  text-lg font-medium`}>
                    {selected}
                </span>

                <div className={`${isOpen&&'rotate-180 '} duration-300`}>
                    <IconDropDown width="20"/>
                </div>
            </div>

            {isOpen && (
                <div className="absolute w-full z-10 bg-white max-h-44 overflow-y-auto  shadow-lg border-1 border-[#E7E7E7] rounded-lg mt-1">
                    {options?.map((option)=>(
                        <div 
                        onClick={()=>handleSelected(option)}
                        className="my-2 mx-3 px-2 py-1 hover:bg-[#F5F5F5] rounded text-[#525252] font-medium">{option}</div>
                    ))}
                </div>
            )}
        </div>

    )
})

export default DropDown