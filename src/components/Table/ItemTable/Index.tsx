import { ReactNode } from "react"

export interface ItemTableProps {
    rows: string[]
    children: ReactNode
}
export default function ItemTable({...props}: ItemTableProps){
    return(
        <tr>
            {props.rows.map((item, index)=>(
                <td key={index}>
                    <span>{item}</span>
                </td>

            ))}
            {props.children}
        </tr>
    )
}