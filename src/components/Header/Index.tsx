'use client'
import { useState } from "react"

const headerOptions = ['inicio', 'agendamentos']

const styles: Record<'dark' | 'light', string> = {

    'dark' : 'text-[var(--color-gray-100)]',
    'light' : 'text-white'
}


interface HeaderProps {
    colorMode: 'light' | 'dark'
}

export default function Header({colorMode}: HeaderProps){

    const [selected, setSelected] = useState('inicio')

    return(
        <header className="flex pb-10 justify-between text-xl">

            <div className="flex gap-20">
                <span className="font-bold">RAIZES</span>

                <nav className="flex gap-10">
                    {headerOptions.map((item, index)=>(
                        <span 
                        className={`${selected === item ? 'text-[var(--color-brown-80)] font-semibold':`${styles[colorMode]} font-medium`}`}
                        onClick={()=>setSelected(item)} >
                            {item}
                        </span>
                    ))}
                </nav>
            </div>

            {/* user */}
            <div>
                <div className="rounded-full bg-amber-950 w-10 h-10"></div>
            </div>
        </header>
    )
}