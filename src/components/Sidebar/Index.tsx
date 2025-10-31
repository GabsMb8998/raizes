'use client'
import { SVGProps, useState } from "react"
import IconAgenda from "../../../public/icons/IconAgenda"
import IconModelo from "../../../public/icons/IconModelo"
import IconPagamentos from "../../../public/icons/IconPagamentos"
import { useRouter } from "next/navigation"
import IconColor from "../../../public/icons/IconColor"

interface IitemSideBar {
    name: string
    link: string
    icon: React.FC<SVGProps<SVGSVGElement>>
}

const sidebarItems: IitemSideBar[] = [
    {
        name: 'agendamentos',
        link: '/admin/calendario',
        icon:  IconAgenda
    },
    {
        name: 'modelos',
        link: '/admin/modelos',
        icon:  IconModelo
    },
    {
        name: 'cores',
        link: '/admin/cores',
        icon:  IconColor
    },
    {
        name: 'pagamentos',
        link: '/admin/pagamentos',
        icon:  IconPagamentos
    },
]

export default function Sidebar(){

    const [selected, setSelected] = useState('agendamentos')
    const router = useRouter()

    const handleSelected = (item: IitemSideBar) =>{
        setSelected(item.name)
        router.push(item.link)
    }

    return (
        <aside className="bg-[var(--color-brown-50)] w-96 h-full px-10 py-16 duration-150">
            
            <div className="mb-24">
                <h4 className="text-[#FBEEDE] font-semibold text-3xl">RAIZES</h4>
            </div>

            <div className="flex flex-col gap-12">
                {sidebarItems.map((item, index)=>(
                    <div className="flex gap-5" key={index} onClick={()=>{handleSelected(item)}}>
                        <item.icon fill={`${selected==item.name? '#ffffff':'#D5BAA8'}`}/>
                        <p className={`${selected==item.name ? 'text-white':'text-[#D5BAA8]'} text-xl font-medium`}>{item.name}</p>
                    </div>
                ))}
            </div>
        </aside>
    )
} 