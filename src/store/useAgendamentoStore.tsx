import { cancelarAgendamento, confirmarAgendamento, getAllAgendamentos, getAllAgendamentosByUser, getAllPendingScheduling, getAvailableDates, postAgendamento } from "@/services/serviceAgendamentos"
import { create } from "zustand"
import { CoresState } from "./useColorStore"
import { ModeloState } from "./useModeloStore"

export type AgendamentoState = {
    id: number
    usuarioEmail: string
    modeloId: number
    corId: number
    dataHora: string
    status: "PENDENTE" | "COMPLETO" | "CANCELADO"
}

export interface AgendamentoResponse {
        id: number
        corEscolhida: CoresState
        dataHora: Date
        modelo: ModeloState
        status: 'COMPLETO' | 'PENDENTE' | "CANCELADO"
        usuario: string
}

interface AgendamentosStore {
    isLoading: boolean
    availableDate: Record<string, string[]> | null
    agendamentosData: AgendamentoResponse[] | null
    pendingScheduling: AgendamentoResponse[] | null
    completedScheduling: AgendamentoResponse[] | null
    agendamento: AgendamentoResponse | null
    getAvailableDate: (year: number, month: number, idModel: number) => void
    setAgendamento: (agendamento: AgendamentoResponse) => void
    getAllAgendamentos: () => void
    getAgendamentosByUser: (emailId:string) => void
    postAgendamento: (agendamento: Omit<AgendamentoState, "id" | "status">) => void
    cancelarAgendamento: (id: number) => void
    listarAgendamentosPendentes: () => void
    confirmarAgendamento: (id: number) => void
}

const useAgendamentoStore = create<AgendamentosStore>((set)=> ({
    isLoading: false,
    agendamentosData: null,
    agendamento: null,
    availableDate: null,
    pendingScheduling:  null,
    completedScheduling: null,
    getAvailableDate: async (year, month, idModel) =>{

        try {
            set({isLoading: true})
            const response = await getAvailableDates(year, month, idModel)
            set({availableDate: response})
            set({isLoading: false})
        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição getAvailable')
        }

    },
    setAgendamento(agendamento) {
        set({agendamento: agendamento})
    },
    getAllAgendamentos: async () => {
      try {
            set({isLoading: true})
            const response = await getAllAgendamentos()
            set({agendamentosData: response})
            set({isLoading: false})
        }catch {
            set({isLoading: false})
            console.log('erro ao tentar pegar todos os agendamentos')
        }
    },
    getAgendamentosByUser: async (emailId) => {
        try {
            set({isLoading: true})
            const response = await getAllAgendamentosByUser(emailId)
            set({agendamentosData: response})
            set({isLoading: false})
        }catch {
            set({isLoading: false})
            console.log('erro ao tentar pegar todos os agendamentos')
        }
    },
      
    cancelarAgendamento: async (id) => {
        try {
            set({isLoading: true})
            const response = await cancelarAgendamento(id)
            set({isLoading: false})
        }catch {
            set({isLoading: false})
            console.log('erro ao tentar pegar todos os agendamentos')
        }
    },
    confirmarAgendamento: async (id) => {
        try {
            set({isLoading: true})
            const response = await confirmarAgendamento(id)
            set({isLoading: false})
        }catch {
            set({isLoading: false})
            console.log('erro ao tentar pegar todos os agendamentos')
        }
    },
    listarAgendamentosPendentes: async () => {
        try {
            set({isLoading: true})
            const response = await getAllPendingScheduling()
            set({pendingScheduling: response})
            set({isLoading: false})
        }catch {
            set({isLoading: false})
            console.log('erro ao tentar pegar todos os agendamentos')
        }

    },
    postAgendamento:async (agendamento) => {
        try {
            set({isLoading: true})
                const response = await postAgendamento(agendamento)
            set({isLoading: false})
            
        }catch {
            set({isLoading: false})
            console.log('erro ao tentar pegar todos os agendamentos')
        }
    },
}))

export default useAgendamentoStore