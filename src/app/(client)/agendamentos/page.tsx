import ContainerAgendamentos from "@/components/ContainerAgendamentos/Index";
import Header from "@/components/Header/Index";
import HeaderTitle from "@/components/HeaderTitle/Index";

export default function AgendamentosPage(){
    return(
        <div>
            <Header colorMode="dark"/>

            <HeaderTitle title="Agendamentos"/>

            <main className="mt-16">
                <h5 className="text-2xl text-[var(--color-gray-80)] font-medium mb-6">29/09/2025 </h5>
                <ContainerAgendamentos status="COMPLETO"/>
                <ContainerAgendamentos status="COMPLETO"/>
                <ContainerAgendamentos status="PENDENTE"/>
          

            </main>
        </div>
    )
}