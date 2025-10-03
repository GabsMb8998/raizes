import HeaderTable, { HeaderTableProps } from "./HeaderTable/Index";
import ItemTable, { ItemTableProps } from "./ItemTable/Index";

interface TableProps {
    columns: HeaderTableProps
    rows: ItemTableProps
}

export default function Table({...props}: TableProps){
    return(
        <table>
            <thead>
                <HeaderTable {...props.columns}/>
            </thead>

            <tbody>
                <ItemTable {...props.rows}/>
            </tbody>
        </table>
    )
}