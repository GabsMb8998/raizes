

export interface HeaderTableProps {
    listColumnHeader: string[]
}

export default function HeaderTable({listColumnHeader}: HeaderTableProps){
    return(
        <thead className=" bg-[var(--color-brown-10)] w-full justify-between rounded-lg">
            <tr >
            {listColumnHeader.map((item, index)=>(
                <th key={index} className={`${index == 0 ? 'w-1/3': 'w-auto'} px-10 py-3 rounded text-start`}>
                    <span className="text-[var(--color-gray-70)] font-bold">{item}</span>
                </th>
            ))}

            <th className="px-10 w-40"></th>
     
            </tr>
        </thead>
    )
}