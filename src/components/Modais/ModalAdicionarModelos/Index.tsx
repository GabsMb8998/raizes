import Button from "@/components/Button/Button";
import ContainerModal, { ModalHandle, ModalContainerProps } from "../ContainerModal/Index";
import { forwardRef, useRef } from "react";
import Textfield from "@/components/TextField/Index";



export interface ModalAdicionarEditarProps{
    onClick: () => void
    method:  'POST' | 'PATCH'
}

const ModalAdicionarEditar = forwardRef<ModalHandle, ModalAdicionarEditarProps>(({onClick, method},ref)=>{

    return(
        <ContainerModal title={method== "PATCH"? 'Editar Modelo' : 'Adicionar Modelo'} ref={ref as any} >
                
                <div className="flex flex-col gap-5">
                    <Textfield label="Nome"/>
                    <Textfield label="Materiais"/>

                    <div className="flex gap-5">
                        <Textfield label="Duração"  />
                        <Textfield label="Valor Sinal"  />
                        <Textfield label="Valor Final"  />
                    </div>
                </div>


                <div className="flex gap-6 justify-end w-full mt-8">
                    <Button label="cancelar" variant="secondary" onClick={()=>(ref as any).current?.close()} />
                    <Button label={method=='PATCH' ? 'Editar' : 'Adicionar' } variant="primary" onClick={onClick} />
                </div>
        </ContainerModal>
    )
})

export default ModalAdicionarEditar