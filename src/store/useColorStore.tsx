import { deleteCores, getCores, patchCores, postCores } from "@/services/serviceColor"
import { create } from "zustand"

export type CoresState = {
    id: number
    nome: string
    codigoCor: string
}

interface CoresStore{
    isLoading: boolean
    cor: CoresState | null
    corData: CoresState[] | null
    getCores: () => void 
    postCor: (cor: Omit<CoresState, "id"> ) => void
    patchCor: (cor: Omit<CoresState, "id"> , id: number) => void
    deletarCor: (id: number) => void
    setCor: (cor: CoresState) => void
}

const useCoresStore = create<CoresStore>((set)=> ({
    isLoading: false,
    cor: null,
    corData: null,
    setCor(cor) {
        set({cor: cor})
    },
    getCores: async () => {
        
        try {
            set({isLoading: true})
            const response = await getCores()
            set({corData: response})
            set({isLoading: false})
        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição getAvailable')
        }
    },
    deletarCor: async (id) => {
        try {
            set({isLoading: true})
            const response = await deleteCores(id)

            set((state) => ({
                corData: state.corData?.filter(item => item.id !== id) || []
            }))

            set({isLoading: false})
        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição getAvailable')
        }
    },
    patchCor: async (cor, id) => {
        try {
            set({isLoading: true})
            const response = await patchCores(cor, id)

            set((state) => ({
            corData: state.corData?.map(item =>
                item.id === id ? { ...item, ...cor } : item
            ) || []
        }))
            set({isLoading: false})
        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição getAvailable')
        }
    },
    postCor: async (cor) => {
        try {
            set({isLoading: true})
            const response = await postCores(cor)


            set({isLoading: false}) 
        } catch (err){
            set({isLoading: false})
            console.log('erro ao fazer requisição getAvailable')
        }
    },
}))

export default useCoresStore