import { apiClient } from "@/lib/api/apiClient"
import { AgendamentoResponse, AgendamentoState } from "@/store/useAgendamentoStore"
import { doFetch } from "@/utils/request"

const fetcher = doFetch(apiClient)

export const getAvailableDates = async (year: number, month: number, idModel: number) => {
    try {
        const response = await fetcher<Record<string, string[]> >('get', `/disponibilidades?ano=${year}&mes=${month}&idModelo=${idModel}`)
        return response
    } catch(error){
        throw new Error('Erro ao fazer ao buscar modelos')
    }
} 
 
export const getAllAgendamentos = async () => {
    try {
        const response = await fetcher<AgendamentoResponse[]>('get', `/agendamentos`)
        return response
    } catch(error){
        throw new Error('Erro ao fazer ao buscar modelos')
    }
} 
export const getAllAgendamentosByUser = async (emailId: string) => {
    try {
        const response = await fetcher<AgendamentoResponse[]>('get', `/agendamentos/usuario/${emailId}`)
        return response
    } catch(error){
        throw new Error('Erro ao fazer ao buscar modelos')
    }
} 
export const getAllPendingScheduling = async () => {
    try {
        const response = await fetcher<AgendamentoResponse[]>('get', `/agendamentos/status/PENDENTE`)
        console.log("rensponse:",response)
        return response
    } catch(error){
        throw new Error('Erro ao buscar agendamentos pendentes')
    }
} 

export const postAgendamento = async (agendamento: Omit<AgendamentoState, "id"| "status">) => {
    try {
        const response = await fetcher<Omit<AgendamentoState, "id"| "status">>('post', `/agendamentos`, agendamento)
        return response
    } catch(error){
        throw new Error('Erro ao fazer ao buscar modelos')
    }
} 

export const confirmarAgendamento = async (id: number) => {
    try {
        const response = await fetcher<AgendamentoResponse[]>('patch', `/agendamentos/confirmar-agendamento/${id}`)
        return response
    } catch(error){
        throw new Error('Erro ao buscar agendamentos pendentes')
    }
} 

export const cancelarAgendamento = async (id: number) => {
    try {
        const response = await fetcher<AgendamentoResponse[]>('patch', `/agendamentos/confirmar-agendamento/${id}`)
        return response
    } catch(error){
        throw new Error('Erro cancelar agendamento')
    }
} 

export const filterAgendamentoByCompletedAndPending = async (agendamentoData: AgendamentoResponse[]) =>{
    agendamentoData.filter((ag)=>{return ag.status !== "CANCELADO"})
}