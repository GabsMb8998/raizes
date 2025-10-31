"use client"
import ContainerAgendamentos from "@/components/ContainerAgendamentos/Index";
import Header from "@/components/Header/Index";
import HeaderTitle from "@/components/HeaderTitle/Index";
import useUsuarioAtual from "@/hooks/useUsuarioAtual";
import { filterAgendamentoByCompletedAndPending } from "@/services/serviceAgendamentos";
import useAgendamentoStore, { AgendamentoResponse } from "@/store/useAgendamentoStore";
import { formatarDate } from "@/utils/functions/formater";
import { useEffect, useState } from "react";

export default function AgendamentosPage(){
    const {user} = useUsuarioAtual()
    const {agendamentosData, getAgendamentosByUser} = useAgendamentoStore()
    const [agendamentos, setAgendamentos] = useState<AgendamentoResponse[]>([])

    useEffect(()=>{
        if (agendamentosData){
            const response = filterAgendamentoByCompletedAndPending(agendamentosData)
            // setAgendamentos(response)
        }
    }, [agendamentosData])

    useEffect(()=>{
        const userEmail = user?.email
        if(userEmail){
            getAgendamentosByUser(userEmail)
        }
    }, [user])

    useEffect(()=>{
        console.log("agendamentoData: ",agendamentosData)
    },[agendamentosData])

    return(
        <div>
            <Header colorMode="dark"/>
            <HeaderTitle title="Agendamentos"/>

            <main className="mt-16">  
                {agendamentosData &&
                    agendamentosData.length > 0 &&
                    agendamentosData.map((item, index) => (
                        item && (
                            <div className="my-6">
                                <h5 className="text-2xl text-[var(--color-gray-80)] font-medium mb-4">{formatarDate( item.dataHora.toString())}</h5>
                                <ContainerAgendamentos key={index} agendamento={item} />
                            </div>
                        )
                    ))}
            </main>
        </div>
    )
}