import { GetModelo } from "@/services/ServiceModelo"
import { boolean } from "zod"
import { create } from "zustand"

export type AgendamentosState = {
    id: number
    idUsuario: number
    idModelo: number
    idCor: number
    Data: Date
}

interface AgendamentosStore {
    isLoading: boolean
    agendamentosData: AgendamentosState[] | null
    agendamento: AgendamentosState | null
    setAgendamento: (agendamento: AgendamentosState) => void
    getAllAgendamentos: () => void
    getAgendamentosByUser: () => void
    postAgendamento: () => void
    cancelarAgendamento: () => void
    listarAgendamentosPendentes: () => void
    confirmarAgendamento: () => void
}

const useAgendamentoStore = create<AgendamentosStore>((set)=> ({
    isLoading: false,
    agendamentosData: null,
    agendamento: null,
    setAgendamento(agendamento) {
        set({agendamento: agendamento})
    },
    getAllAgendamentos() {
        try {
            set({isLoading: true})
            // const response = await GetModelo()
            // set({agendamentosData: response})
            set({isLoading: false})
            
        }catch {
            set({isLoading: false})
            console.log('erro ao tentar pegar todos os agendamentos')
        }
    },
    getAgendamentosByUser() {
        
    },
      
    cancelarAgendamento() {
        
    },
    confirmarAgendamento() {
        
    },
    listarAgendamentosPendentes() {
        
    },
    postAgendamento() {
        
    },
}))

