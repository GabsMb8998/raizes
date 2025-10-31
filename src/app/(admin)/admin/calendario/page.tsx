"use client"
import Calendar from "@/components/Calendar/Calendar";
import HeaderTitle from "@/components/HeaderTitle/Index";
import useAgendamentoStore from "@/store/useAgendamentoStore";
import { useEffect } from "react";

export default function AgendamentoCalendarPage(){

    const {agendamentosData, getAllAgendamentos} = useAgendamentoStore()

    
    useEffect (()=>{
        getAllAgendamentos()
    }, [])

    console.log(agendamentosData)
    return (
        <div className=" w-full overflow-y-auto ">
            <HeaderTitle title="Agendamentos"/>
            {agendamentosData && (
                <Calendar agendamentosData={agendamentosData}/>
            )}
        </div>
    )
}