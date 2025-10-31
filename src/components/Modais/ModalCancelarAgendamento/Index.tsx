import { forwardRef } from "react";
import ContainerModal, { ModalHandle } from "../ContainerModal/Index";
import Button from "@/components/Button/Button";
import useAgendamentoStore from "@/store/useAgendamentoStore";
import useUsuarioAtual from "@/hooks/useUsuarioAtual";

interface ModalDeletarProps {
    title: string
    handleOpenModalRemarcar: () => void
}

const ModalCancelarAgendamento = forwardRef<ModalHandle, ModalDeletarProps>(({title, handleOpenModalRemarcar}, ref)=>{

    const { cancelarAgendamento, agendamento, getAgendamentosByUser} = useAgendamentoStore()
    const {user} = useUsuarioAtual()

    const onSubmitCancelarAgendamento = () => {
        if(agendamento){
            cancelarAgendamento(agendamento.id)

            const userEmail = user?.email

            if(userEmail){
                getAgendamentosByUser(userEmail)
            }
        }
    }

    return (
        <ContainerModal title={title} ref={ref}>
            <p className="text-[#9F9F9F] text-xl my-10">Você tem certeza que gostaria de cancelar o agendamento, ao realizar essa ação não será mais possível alterá-la.</p>
                <div className="flex gap-6 justify-end w-full mt-8">
                    <Button label="remarcar" variant="secondary" onClick={handleOpenModalRemarcar} />
                    <Button label="cancelar" variant="primary" onClick={onSubmitCancelarAgendamento} />
                </div>
        </ContainerModal>
    )
})

export default ModalCancelarAgendamento