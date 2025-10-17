
'use client'
import HeaderTitle from "@/components/HeaderTitle/Index";
import { Modelos } from "../modelos/page";
import { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/components/Table/Index";
import { formatarHora, formatarReais } from "@/functions/formater";
import { ModalHandle } from "@/components/Modais/ContainerModal/Index";
import ModalAprovarPagamento from "@/components/Modais/ModalAprovarPagamento/Index";

export type ColumnsPagamentoType = Modelos & {name: string} & {date: string} & {hour: string}

export default function PagamentosPage(){

    const [data, setData] = useState<ColumnsPagamentoType[]| null>(null)
    const [selected, setSelected] = useState<ColumnsPagamentoType>()
    const modalConfirmarRef = useRef<ModalHandle>(null)

    useEffect(()=>{
        setData([
            {duracao: 8, modelo: 'Nagô', valor_final: 300, valor_sinal: 100, name:'Ana Maluf', date: '19/10', hour: '13:00'},
            {duracao: 8, modelo: 'Nagô', valor_final: 300, valor_sinal: 100, name: 'Ana maluf', date: '18/10', hour : '14:00'}
        ])
    }, [])

        const columns: Column<ColumnsPagamentoType>[] = [
            {header: 'Nome' , accessor: 'name'},
            {header: "Modelo", accessor: "modelo"},
            {header: "v.final", accessor: (data)=>formatarReais(data.valor_final)},
            {header: "v.sinal", accessor: (data)=>formatarReais(data.valor_sinal)},
            {header: "duração", accessor: (data)=>formatarHora(data.duracao)},
            {header: "data", accessor: 'date'},
            {header: "hora", accessor: 'hour'},
    ]

    const handleOpenModal = (data: ColumnsPagamentoType) => {
        modalConfirmarRef.current?.open()
        setSelected(data)
    }

    return(
        <div>
            <HeaderTitle title="Pagamentos"/>

            <div className="mt-8">
                {data && data.length > 0 ? (
                    <Table<ColumnsPagamentoType> columns={columns} data={data} renderActions={(data)=> (
                        <div className="flex justify-center gap-6">
                            <button className="bg-[var(--color-brown-90)] text-white  px-6 py-2 rounded text-sm" onClick={()=>handleOpenModal(data)}>confirmar</button>
                        </div>
                    )}/>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="h-[1px] w-full bg-[#D1d1d1]"></div>
                        <h5 className="text-[#b1b1b1] mt-16 text-2xl">Nenhum modelo encontrado</h5>
                    </div>
                )}
            </div>

            <ModalAprovarPagamento data={selected!} ref={modalConfirmarRef}/>
        </div>
    )
}