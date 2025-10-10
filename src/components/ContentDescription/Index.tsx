import { ReactNode } from "react"
import IconAgenda from "../../../public/icons/IconAgenda"
import TextDefault from "../TextDefault/Index"
import IconTime from "../../../public/icons/IconTime"
import IconModelo from "../../../public/icons/IconModelo"
import IconSinalPrice from "../../../public/icons/IconSinalPrice"

type TypeitemsContentDescription = {
    subtext: string
    text: string
    icon: ReactNode
}

const itemsContentDescription :TypeitemsContentDescription[] = [
    {
        'subtext': 'duração',
        'text': '8h',
        'icon': <IconTime/> 
    },
    {
        'subtext': 'material',
        'text': 'Jumbo e Cachos',
        'icon': <IconModelo fill="var(--color-brown-60)" width={38}/> 
    },
    {
        'subtext': 'valor sinal',
        'text': 'R$100,00',
        'icon': <IconSinalPrice width={38}/> 
    },
]

export default function ContentDescription(){
    return(
        <div className="flex justify-between w-full border-1 border-[#ccc] rounded p-10">
            {itemsContentDescription.map((item,index)=>(
                <div className="flex items-center gap-5">
                    {item.icon}
                    <div>
                        <TextDefault content={item.subtext} variant="subtext" className="text-xl"/>
                        <TextDefault content={item.text} variant="text" className="text-2xl" />
                    </div>
                </div>
            ))}
        </div>
    )
}
