import { apiClient } from "@/lib/api/apiClient"
import { CoresState } from "@/store/useColorStore"
import { doFetch } from "@/utils/request"

const fetcher = doFetch(apiClient)

export const getCores = async () => {
    try {
        const response = await fetcher<CoresState[]>('get', `/cores`)
        return response
    }catch(error){
        throw new Error('Erro ao buscar cores')
    }
}

export const postCores = async (cor: Omit<CoresState, "id">) => {
    try {
        const response = await fetcher<Omit<CoresState, "id">>('post', `/cores`, cor)
        return response
    }catch(error){
        throw new Error('Erro ao adicionar cor')
    }
} 

export const patchCores = async (cor: Omit<CoresState, "id">, id: number) => {
    try {
        const response = await fetcher<Omit<CoresState, "id">>('put', `/cores/${id}`, cor)
        return response
    }catch(error){
        throw new Error('Erro ao atualizar cor')
    }
} 

export const deleteCores = async (id: number) => {
    try {
        const response = await fetcher<CoresState>('delete', `/cores/${id}`,)
        return response
    }catch(error){
        throw new Error('Erro ao deletar cor')
    }
} 


