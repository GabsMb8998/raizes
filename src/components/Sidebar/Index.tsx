'use client'
import { SVGProps, useState } from "react"
import IconAgenda from "../../../public/icons/IconAgenda"
import IconModelo from "../../../public/icons/IconModelo"
import IconPagamentos from "../../../public/icons/IconPagamentos"

interface IitemSideBar {
    name: string
    icon: React.FC<SVGProps<SVGSVGElement>>
}

const sidebarItems: IitemSideBar[] = [
    {
        name: 'agendamentos',
        icon:  IconAgenda
    },
    {
        name: 'modelos',
        icon:  IconModelo
    },
    {
        name: 'pagamentos',
        icon:  IconPagamentos
    },
]

export default function Sidebar(){

    const [selected, setSelected] = useState('agendamentos')

    const handleSelected = (item: string) =>{
        setSelected(item)
        console.log('item:',item)
        console.log('selected:',selected)
    }

    return (
        <aside className="bg-[var(--color-brown-50)] w-96 h-full px-10 py-16 duration-150">
            
            <div className="mb-24">
                <h4 className="text-[#FBEEDE] font-semibold text-3xl">RAIZES</h4>
            </div>

            <div className="flex flex-col gap-12">
                {sidebarItems.map((item, index)=>(
                    <div className="flex gap-5" key={index} onClick={()=>{handleSelected(item.name)}}>
                        <item.icon fill={`${selected==item.name? '#ffffff':'#D5BAA8'}`}/>
                        <p className={`${selected==item.name ? 'text-white':'text-[#D5BAA8]'} text-2xl font-medium`}>{item.name}</p>
                    </div>
                ))}
            </div>
        </aside>
    )
} 