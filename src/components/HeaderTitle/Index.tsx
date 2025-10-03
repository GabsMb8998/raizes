import { ReactNode } from "react"

interface HeaderTitleProps {
    title: string
    children?: ReactNode
}
export default function HeaderTitle({...props}: HeaderTitleProps){
    return(
        <header className="flex justify-between">
            <h1 className="font-medium text-4xl text-[var(--color-brown-100-f)] ">{props.title}</h1>
            {props.children}
        </header>
    )
}