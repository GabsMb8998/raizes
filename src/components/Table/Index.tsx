    'use client'
    import { ReactNode } from "react";

    export type Column<T> = {
        header: string;
        accessor: keyof T | ((row:T) => ReactNode)
    }

    interface TableProps<T> {
        columns: Column<T>[]
        data: T[] | null
        renderActions?: (row: T) => ReactNode
    }

    export default function Table<T>({
        data,
        columns,
        renderActions
    }: TableProps<T>){

        return(
            <table className="w-full table-auto ">
                <thead className="bg-[var(--color-brown-10)] text-[var(--color-gray-70)]">
                    <tr>
                        {columns.map((col, index)=>(
                            <th key={index} className=" px-4 py-3">{col.header}</th>
                        ))}
                        {renderActions && (
                            <th className="px-4 py-2"></th>
                        )}
                    </tr>
                </thead>
                <tbody className="mt-2">

                       {data && data.map((row, rowIndex) => (
                        <tr key={rowIndex} className=" rounded-2xl">
                            {columns.map((col, colIndex) => {
                                const value =
                                typeof col.accessor === "function"
                                    ? col.accessor(row)
                                    : row[col.accessor];

                                return (
                                    
                                <td key={colIndex} className="px-4 py-6 text-center rounded text-[var(--color-gray-70)] text-lg">
                                    {value as ReactNode}
                                </td>
                                );
                            })}
                            {renderActions && (
                                <td className="px-4 py-2 text-center w-40">
                                    {renderActions(row)}
                                </td>
                            )}
                        </tr>
                            ))
                        }
    
                </tbody>
            </table>
        )
    }