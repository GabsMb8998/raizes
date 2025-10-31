import { DeleteModelos, GetModelo, GetModeloById, PatchModelos, PostModelos } from "@/services/ServiceModelo";
import { create } from "zustand";

export type ModeloState = {
    id : number
    nome: string
    descricao: string
    precoTotal: number
    precoSinal: number
    duracaoHoras: number
    imagem: File
}

export type ModeloStateGet = {
    imagemUrl: string
} & Omit<ModeloState, "imagem">

interface ModeloStore {
    isLoading: boolean
    modeloDataGet: ModeloStateGet[] | null
    modelo: ModeloStateGet | null
    setModelo: (modelo: ModeloStateGet) => void
    getModelo : () => void
    getModeloById: (id: number) => Promise<ModeloStateGet>
    postModelo: (modelo: Omit<ModeloState, 'id'>) => void
    patchModelo: (modelo: Partial<ModeloState>, imagem: File, id: number) => void
    deleteModelo: (id: number) => void
}

const useModeloStore = create<ModeloStore>((set)=> ({
    isLoading: false,
    modeloDataGet: null,
    modelo: null,

    setModelo(modelo) {
        set({modelo: modelo})
    },
    getModelo: async () => {
        try {
            set({isLoading: true})
            const response = await GetModelo()
            set({modeloDataGet: response})
            set({isLoading: false})
        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição')
        }
    },
    postModelo: async (modelo) => {

        try {
            set({isLoading: true})
            const response = await PostModelos(modelo)

            const responseGet = await GetModelo()
            set({modeloDataGet : responseGet})
            
            set({isLoading: false})

        }catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição')
        }
    },

    getModeloById: async (id) => {
        try {
            set({isLoading: true})
            const response = await GetModeloById(id)
            set({modelo: response})
            set({isLoading: false})
            return response
        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição')
            throw new Error('erro ao fa')
        }
    },

    patchModelo: async (modelo, imagem, id) => {
        try {
            set({isLoading: true})
            const response = await PatchModelos(modelo, imagem,  id)

            set((state) => ({
            modeloDataGet: state.modeloDataGet?.map(item =>
                item.id === id ? { ...item, ...modelo } : item
            ) || []
        }))

            set({isLoading: false})

        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição')
        }
    },
    deleteModelo: async (id) => {
         try {
            set({isLoading: true})
            const response = await DeleteModelos(id)

            set((state) => ({
                modeloDataGet: state.modeloDataGet?.filter(item => item.id !== id) || []
            }))

            set({isLoading: false})

        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição')
        }
    },
}))

export default useModeloStore