import { forwardRef } from "react";
import ContainerModal, { ModalHandle } from "../ContainerModal/Index";
import Button from "@/components/Button/Button";
import TextDefault from "@/components/TextDefault/Index";
import { ColumnsPagamentoType } from "@/app/(admin)/admin/pagamentos/page";
import useUsuarioAtual from "@/hooks/useUsuarioAtual";
import { confirmarAgendamento, getAllPendingScheduling } from "@/services/serviceAgendamentos";

interface ModalAprovarPagamentoProps {
    data: ColumnsPagamentoType
    onSubmit: () => void
}

const ModalAprovarPagamento = forwardRef<ModalHandle, ModalAprovarPagamentoProps>(({data, onSubmit}, ref)=>{

 

    return (
        <ContainerModal title="Confirmar Pagamento" ref={ref}>

            <div className="">
                <h5 className="font-semibold text-[var(--color-gray-80)] text-xl mb-2">Informações</h5>

                <TextDefault content={'Nome: ' + data?.userName} variant="subtext" className="text-lg"/>
                <TextDefault content={'Modelo: ' + data?.modelo} variant="subtext" className="text-lg"/>
                <TextDefault content={'Data: ' + data?.date} variant="subtext" className="text-lg"/>
                <TextDefault content={'Horário: ' + data?.hour} variant="subtext" className="text-lg"/>
                <TextDefault content={'Valor: ' + data?.valor_sinal} variant="subtext" className="text-lg"/>

                <div className="w-full my-5 ">
                    <TextDefault content={'ao clicar em confirmar você afirma que foi realizado o pagamento desse agendamento'} variant="text" className="text-lg"/>
                </div>
            </div>
            
            <div className="flex gap-6 justify-end w-full mt-8">
                <Button label="cancelar" variant="secondary" onClick={()=>(ref as any).current?.close()} />
                <Button label='confirmar' variant="primary" onClick={onSubmit} />
            </div>

        </ContainerModal>
    )
})

export default ModalAprovarPagamento