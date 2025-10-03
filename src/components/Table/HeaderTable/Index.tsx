

export interface HeaderTableProps {
    listColumnHeader: string[]
}

export default function HeaderTable({listColumnHeader}: HeaderTableProps){
    return(
        <thead>
            {listColumnHeader.map((item, index)=>(
                <tr key={index}>
                    <span>{item}</span>
                </tr>
            ))}
        </thead>
    )
}