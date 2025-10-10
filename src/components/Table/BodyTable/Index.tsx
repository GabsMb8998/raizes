import { ReactNode } from "react"

export interface ItemTableProps {
    rows: string[]
    children?: ReactNode
}
export default function BodyTable({...props}: ItemTableProps){
    return(
        props.rows.map((item, index) => (
            <tr className="">
                <td key={index} className={``}>
                    <span>{item}</span>
                </td>
            {props.children}
        </tr>
        ))
    )
}