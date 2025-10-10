import { ReactNode } from "react"

interface IIconButtonTable {
    children: ReactNode
    onClick: ()=>void
}

export default function IconButtonTable ({onClick, children}:IIconButtonTable){
    return( 
        <div className="bg-[#F0E9E2] w-10 h-10 flex items-center justify-center rounded-xl" onClick={onClick}>
            {children}
        </div>
    )
}