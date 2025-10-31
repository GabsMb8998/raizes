"use client"
import HeaderWithButton from "@/components/HeaderWithButton/HeaderWIthButton";
import IconButtonTable from "@/components/Table/IconButtonTable/Index";
import Table, { Column } from "@/components/Table/Index";
import useCoresStore, { CoresState } from "@/store/useColorStore";
import { useCallback, useEffect, useRef } from "react";
import IconEdit from "../../../../../public/icons/IconEdit";
import IconDelete from "../../../../../public/icons/IconDelete";
import { ModalHandle } from "@/components/Modais/ContainerModal/Index";
import ModalAdicionarEditar from "@/components/Modais/ModalAdicionarModelos/Index";
import ModalAdicionarEditarCores, { ModeloFormDataCores } from "@/components/Modais/ModalAdicionarEditarCores/Index";
import ModalDeletar from "@/components/Modais/ModalDeletar/Index";

export default function CoresPage() {

    const {corData, getCores, postCor, patchCor, cor, setCor, deletarCor} = useCoresStore()

    const modalRefAdd = useRef<ModalHandle>(null)
    const modalRefPatch = useRef<ModalHandle>(null)
    const modalRefDelete = useRef<ModalHandle>(null)

    useEffect(()=>{
        getCores()
    }, [])

    const columns: Column<CoresState>[] = [
        {header: "Id", accessor: "id"},
        {header: "Cor", accessor: "nome"},
        {header: "Hex", accessor: "codigoCor"}
    ]

    const onSubmitPost = async (form: ModeloFormDataCores) => {
        postCor(form)

        await getCores()
        modalRefAdd.current?.close()
    }
    const onSubmitPatch = async (form: ModeloFormDataCores) => {

        if(cor){
            patchCor(form, cor?.id )
        }

        await getCores()
        await modalRefPatch.current?.close()
    }

    const onSubmitDelete = async () => {
        if(cor){
            deletarCor(cor?.id)
        }

        await getCores()
        await modalRefDelete.current?.close()
    }

    const handleOpenDelete = (cor: CoresState) => {
        modalRefDelete.current?.open()
        setCor(cor)
    } 
    
    const handleOpenEdit = (cor: CoresState) => {
        modalRefPatch.current?.open()
        setCor(cor)
    } 
    
    return (
        <div className="w-full">
            <HeaderWithButton title="Cores" button={{label:'adicionar', onClick: ()=>modalRefAdd.current?.open()}}/>

            <div className="mt-8">
                <Table<CoresState> columns={columns} data={corData} renderActions={(data)=> (
                    <div className="flex justify-center gap-6">
                        <IconButtonTable onClick={()=>handleOpenEdit(data)}>
                            <IconEdit width={24}/>
                        </IconButtonTable>

                        <IconButtonTable onClick={()=>handleOpenDelete(data)}>
                            <IconDelete width={24}/>
                        </IconButtonTable>
                    </div>
                )}/>
            </div>

            <ModalAdicionarEditarCores method="POST" onSubmit={onSubmitPost} ref={modalRefAdd}/>
            <ModalAdicionarEditarCores method="PATCH" onSubmit={onSubmitPatch} ref={modalRefPatch} data={cor}/>
            <ModalDeletar onClick={onSubmitDelete} title="Deletar Cor" ref={modalRefDelete}/>
        </div>
    )
}