'use client'

import Button from "@/components/Button/Button"
import HeaderWithButton from "@/components/HeaderWithButton/HeaderWIthButton"
import IconButtonTable from "@/components/Table/IconButtonTable/Index"
import Table, { Column } from "@/components/Table/Index"
import { formatarHora, formatarReais } from "@/functions/formater"
import { Mode } from "fs"
import { useEffect, useRef, useState } from "react"
import IconEdit from "../../../../public/icons/IconEdit"
import IconDelete from "../../../../public/icons/IconDelete"
import { ModalHandle } from "@/components/Modais/ContainerModal/Index"
import ModalAdicionarModelos from "@/components/Modais/ModalAdicionarModelos/Index"
import ModalDeletar from "@/components/Modais/ModalDeletar/Index"
import ModalAdicionarEditar from "@/components/Modais/ModalAdicionarModelos/Index"

export type Modelos = {
    modelo: string
    valor_final : number
    valor_sinal: number
    duracao: number
}


export default function ModelosScreen () {

    const [data, setData] = useState<Modelos[] | null>(null)
    const modalAddRef = useRef<ModalHandle>(null)
    const modalEditRef = useRef<ModalHandle>(null)
    const modalDeleteRef = useRef<ModalHandle>(null)



    useEffect(()=>{
        setData([
            {duracao: 8, modelo: 'Nagô', valor_final: 300, valor_sinal: 100},
            {duracao: 8, modelo: 'Nagô', valor_final: 300, valor_sinal: 100}
        ])
    }, [])

    const columns: Column<Modelos>[] = [
        {header: "Modelo", accessor: "modelo"},
        {header: "v.final", accessor: (data)=>formatarReais(data.valor_final)},
        {header: "v.sinal", accessor: (data)=>formatarReais(data.valor_sinal)},
        {header: "duração", accessor: (data)=>formatarHora(data.duracao)},
    ]

    return (
        <div className="w-full">
            <HeaderWithButton title="Modelos" button={{label:'adicionar', onClick: ()=>modalAddRef.current?.open()}}/>

            <div className="py-10">
                {data && data.length > 0 ? (
                        <Table<Modelos> columns={columns} data={data} renderActions={(data)=> (
                            <div className="flex justify-center gap-6">
                                <IconButtonTable onClick={()=>modalEditRef.current?.open()}>
                                    <IconEdit width={24}/>
                                </IconButtonTable>
        
                                <IconButtonTable onClick={()=>modalDeleteRef.current?.open()}>
                                    <IconDelete width={24}/>
                                </IconButtonTable>
                            </div>
                        )}/>
                ): (
                    <div className="flex flex-col items-center">
                        <div className="h-[1px] w-full bg-[#D1d1d1]"></div>
                        <h5 className="text-[#b1b1b1] mt-16 text-2xl">Nenhum modelo encontrado</h5>
                    </div>
                )}
            </div>

            <ModalAdicionarEditar method="POST" ref={modalAddRef} onClick={()=>{}}/>
            <ModalAdicionarEditar method="PATCH" ref={modalEditRef} onClick={()=>{}}/>
            <ModalDeletar title="Deletar Modelo" ref={modalDeleteRef} onClick={()=>{}}/>
        </div>
        
    
    )
}