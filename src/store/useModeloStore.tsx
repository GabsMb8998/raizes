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

interface ModeloStore {
    isLoading: boolean
    modeloData: ModeloState[] | null
    modelo: ModeloState | null
    setModelo: (modelo: ModeloState) => void
    getModelo : () => void
    getModeloById: (id: number) => Promise<ModeloState>
    postModelo: (modelo: Omit<ModeloState, 'id'>) => void
    patchModelo: (modelo: Partial<ModeloState>, id: number) => void
    deleteModelo: (id: number) => void
}

const useModeloStore = create<ModeloStore>((set)=> ({
    isLoading: false,
    modeloData: null,
    modelo: null,
    setModelo(modelo) {
        set({modelo: modelo})
    },
    getModelo: async () => {
        try {
            set({isLoading: true})
            const response = await GetModelo()
            set({modeloData: response})
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
            set({modeloData : responseGet})
            
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

    patchModelo: async (modelo, id) => {
        try {
            set({isLoading: true})
            const response = await PatchModelos(modelo, id)

            const responseGet = await GetModelo()
            set({modeloData: responseGet})

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

            const responseGet = await GetModelo()
            set({modeloData: responseGet})

            set({isLoading: false})

        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição')
        }
    },
}))

export default useModeloStore