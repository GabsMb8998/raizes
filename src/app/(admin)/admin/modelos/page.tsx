'use client'
import HeaderWithButton from "@/components/HeaderWithButton/HeaderWIthButton"
import IconButtonTable from "@/components/Table/IconButtonTable/Index"
import Table, { Column } from "@/components/Table/Index"
import { formatarHora, formatarReais } from "@/utils/functions/formater"
import { useCallback, useEffect, useRef, useState } from "react"
import { ModalHandle } from "@/components/Modais/ContainerModal/Index"
import ModalDeletar from "@/components/Modais/ModalDeletar/Index"
import ModalAdicionarEditar, { ModeloFormData } from "@/components/Modais/ModalAdicionarModelos/Index"
import IconEdit from "../../../../../public/icons/IconEdit"
import IconDelete from "../../../../../public/icons/IconDelete"
import useModeloStore, { ModeloState, ModeloStateGet } from "@/store/useModeloStore"
import { getModeloPatch } from "@/utils/functions/diffFunction"

export default function ModelosScreen () {
    
    console.log('caregou a pagina de modelo')

    const [oldModelo, setOldModelo] = useState<Omit<ModeloState, "imagem">>()

    const modalAddRef = useRef<ModalHandle>(null)
    const modalEditRef = useRef<ModalHandle>(null)
    const modalDeleteRef = useRef<ModalHandle>(null)

    const {getModelo, getModeloById, modeloDataGet, deleteModelo, modelo, patchModelo, postModelo, isLoading} = useModeloStore()

    useEffect(()=>{
        if (oldModelo && modelo){
            // console.log('funcao patch',getModeloPatch(oldModelo, modelo))            
        }
    }, [oldModelo, modelo])

    useEffect(()=>{
        getModelo()
        console.log('tentou pegar modelos')
    }, [postModelo, patchModelo, deleteModelo])

    const columns: Column<ModeloStateGet>[] = [
        {header: "Modelo", accessor: "nome"},
        {header: "v.final", accessor: (data)=>formatarReais(data.precoTotal)},
        {header: "v.sinal", accessor: (data)=>formatarReais(data.precoSinal)},
        {header: "duração", accessor: (data)=>formatarHora(data.duracaoHoras)},
    ]

    const handleOpenModalDelete = (id: number) => {
        modalDeleteRef.current?.open()
        getModeloById(id)
    }

    const handleOpenModalEdit = async (id: number) => {
        const data = await getModeloById(id)
        if(data){
            console.log('guardou antigo')
            setOldModelo({...data})
            modalEditRef.current?.open()
        }
    }

    const onSubmitPost = useCallback(async (form: ModeloFormData) => {
        postModelo(form)
        modalAddRef.current?.close()
    }, [])

    const onSubmitPatch = useCallback(async (form: ModeloFormData)=> {
        if(!oldModelo) return
        console.log("form na função patch:",form)
        const patch = await getModeloPatch(oldModelo, form)
        await patchModelo(patch, form.imagem,  oldModelo.id)
        modalEditRef.current?.close()
    }, [oldModelo])

    const onSubmitDelete = () =>{
        deleteModelo(modelo?.id!)
        getModelo()
        modalDeleteRef.current?.close()
    }

    return (
        <div className="w-full">
            <HeaderWithButton title="Modelos" button={{label:'adicionar', onClick: ()=>modalAddRef.current?.open()}}/>

           <div className="py-10">
              {modeloDataGet && modeloDataGet.length > 0 ? (
                       <Table<ModeloStateGet> columns={columns} data={modeloDataGet} renderActions={(data)=> (

                            <div className="flex justify-center gap-6">
                                <IconButtonTable onClick={()=>handleOpenModalEdit(data.id)}>
                                    <IconEdit width={24}/>
                                </IconButtonTable>
            
                                <IconButtonTable onClick={()=>handleOpenModalDelete(data.id)}>
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

            <ModalAdicionarEditar method="POST" ref={modalAddRef} onSubmit={onSubmitPost}/>
            <ModalAdicionarEditar  data={modelo} method="PATCH" ref={modalEditRef} onSubmit={onSubmitPatch}/>
            <ModalDeletar title="Deletar Modelo" ref={modalDeleteRef} onClick={onSubmitDelete}/>
    </div>
    )
}