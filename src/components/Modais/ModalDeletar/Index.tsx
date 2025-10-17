import { forwardRef } from "react";
import ContainerModal, { ModalHandle } from "../ContainerModal/Index";
import Button from "@/components/Button/Button";

interface ModalDeletarProps {
    title: string
    onClick: ()=>void
}

const ModalDeletar = forwardRef<ModalHandle, ModalDeletarProps>(({title, onClick}, ref)=>{
    return (
        <ContainerModal title={title} ref={ref}>
            <p className="text-[#9F9F9F] text-xl my-10">vc tem certeza que gostaria de fazer a exclusão? ao clicar em confirmar não será mais possível reverter essa ação.</p>
                <div className="flex gap-6 justify-end w-full mt-8">
                    <Button label="cancelar" variant="secondary" onClick={()=>(ref as any).current?.close()} />
                    <Button label="confirmar" variant="primary" onClick={onClick} />
                </div>
        </ContainerModal>
    )
})

export default ModalDeletar