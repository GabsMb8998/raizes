
'use client'
import HeaderTitle from "@/components/HeaderTitle/Index";
import { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/components/Table/Index";
import { formatarDataAnoMesDia, formatarHora, formatarHoraDate, formatarReais } from "@/utils/functions/formater";
import { ModalHandle } from "@/components/Modais/ContainerModal/Index";
import ModalAprovarPagamento from "@/components/Modais/ModalAprovarPagamento/Index";
import useAgendamentoStore from "@/store/useAgendamentoStore";
import { confirmarAgendamento, getAllPendingScheduling } from "@/services/serviceAgendamentos";

export type ColumnsPagamentoType = {
    id: number
    userName : string
    duracao: string
    modelo: string
    valor_final: number
    valor_sinal: number
    date: string
    hour: string
}

export default function PagamentosPage(){

    const [data, setData] = useState<ColumnsPagamentoType[]| null>(null)
    const [selected, setSelected] = useState<ColumnsPagamentoType>()
    const modalConfirmarRef = useRef<ModalHandle>(null)

    const {pendingScheduling, listarAgendamentosPendentes} = useAgendamentoStore()

    useEffect(()=>{
        listarAgendamentosPendentes()
    }, [])

    useEffect(()=>{
        if (pendingScheduling && pendingScheduling.length > 0) {
            const formattedData: ColumnsPagamentoType[] = pendingScheduling.map(item => ({
                id: item.id,
                userName: item.usuario,
                duracao: formatarHora(item.modelo.duracaoHoras),
                modelo: item.modelo.nome,
                valor_final: item.modelo.precoTotal,
                valor_sinal: item.modelo.precoSinal,
                date: formatarDataAnoMesDia(item.dataHora.toString()),
                hour: formatarHoraDate(item.dataHora.toString()),
        }));

        setData(formattedData);
    }
    },[pendingScheduling])

    const columns: Column<ColumnsPagamentoType>[] = [
        {header: 'Nome' , accessor: 'userName'},
        {header: "Modelo", accessor: "modelo"},
        {header: "v.final", accessor: (data)=>formatarReais(data.valor_final)},
        {header: "v.sinal", accessor: (data)=>formatarReais(data.valor_sinal)},
        {header: "duração", accessor: "duracao"},
        {header: "data", accessor: 'date'},
        {header: "hora", accessor: 'hour'},
    ]

    const handleOpenModal = (data: ColumnsPagamentoType) => {
        modalConfirmarRef.current?.open()
        setSelected(data)
    }

    const handleConfirmarPagamento = () => {
        if(selected){
            confirmarAgendamento(selected?.id)
            getAllPendingScheduling()
            modalConfirmarRef.current?.close()
        }
    }

    return(
        <div className="w-full">
            <HeaderTitle title="Pagamentos"/>

            <div className="mt-8 w-full">
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

            <ModalAprovarPagamento data={selected!} ref={modalConfirmarRef} onSubmit={handleConfirmarPagamento}/>
        </div>
    )
}