import { formatarHora } from "@/utils/functions/formater";
import TextDefault from "../TextDefault/Index";
import useAgendamentoStore, { AgendamentoResponse } from "@/store/useAgendamentoStore";
import { useRef } from "react";
import { ModalHandle } from "../Modais/ContainerModal/Index";
import ModalCancelarAgendamento from "../Modais/ModalCancelarAgendamento/Index";

interface Icontentcontainer {
    subtext: string
    text: string
}

interface ContainerAgendamentoProps {
    agendamento: AgendamentoResponse
}

export default function ContainerAgendamentos({agendamento}: ContainerAgendamentoProps){

    console.log("agendamento:",agendamento.modelo.nome)

    const {setAgendamento} = useAgendamentoStore()

    const refModalCancelarAgendamento = useRef<ModalHandle>(null)
    const refModalRemarcarAgendamento = useRef<ModalHandle>(null)

    const contentContainer: Icontentcontainer[]  = [
        {
            subtext: 'modelo',
            text: agendamento.modelo.nome
        },
        {
            subtext: 'duração',
            text:  formatarHora(agendamento.modelo.duracaoHoras)
        },
        {
            subtext: 'material',
            text: agendamento.modelo.descricao
        },
    ]

    const handleOpenModalCancelar = () => {
        refModalCancelarAgendamento.current?.open()
        setAgendamento(agendamento)
    }

    const handleOpenModalRemarcar = async () =>{
        refModalCancelarAgendamento.current?.close()
        await refModalRemarcarAgendamento.current?.open()
    }

    return(
        <div className={`${agendamento.status =='PENDENTE' ? 'border-l-[#4897FF]' : 'border-l-[#7FC487] '} w-full flex p-8 rounded-lg justify-between px-20 border-l-8  shadow-container-agendamentos `}>
            
            <div className="flex flex-col items-center">
                <TextDefault content="status" variant="subtext" className="text-xl" />
                <div className={`${agendamento.status =='PENDENTE' ? 'bg-[#4897FF]' : 'bg-[#7FC487]'} rounded-full p-2  h-8 text-center flex items-center font-medium text-white px-4`}>
                    <span>{agendamento.status == "PENDENTE" ? "pendente": "confirmado"}</span>
                </div>
            </div>
            {contentContainer.map((item, index)=>(
                <div key={index} className="flex flex-col items-center ">
                    <TextDefault content={item.subtext} variant="subtext" className="text-xl"/>
                    <TextDefault content={item.text} variant="text" className="text-xl"/>
                </div>
            ))}

            <div className="self-center">
                <button className="bg-[#FFC5C5] text-[#633030] px-10 py-3 rounded-lg font-semibold text-lg" onClick={handleOpenModalCancelar}>cancelar</button>
            </div>

            <ModalCancelarAgendamento ref={refModalCancelarAgendamento} title="Cancelar Agendamento" handleOpenModalRemarcar={handleOpenModalRemarcar}/>
        </div>
    )
}