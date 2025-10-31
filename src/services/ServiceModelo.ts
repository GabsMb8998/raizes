import { apiClient } from "@/lib/api/apiClient"
import { ModeloState, ModeloStateGet } from "@/store/useModeloStore"
import { doFetch } from "@/utils/request"

const fetcher = doFetch(apiClient)

export const GetModelo = async () => {
    try {
        const response = await fetcher<ModeloStateGet[]>('get', '/modelos')
        return response
    }catch(error){
        throw new Error('Erro ao fazer ao buscar modelos')
    }
} 

export const GetModeloById = async (id:number) => {
    try {
        const response = await fetcher<ModeloStateGet>('get', `/modelos/${id}`)
        return response
    }catch(error){
        throw new Error('Erro ao fazer ao buscar o modelo')
    }
} 

export const PostModelos = async (modelo: Omit<ModeloState, 'id'>) => {
    try {
        const formData = new FormData()
        const {imagem, ...dados} = modelo
        formData.append("dados", JSON.stringify(dados))

        if(imagem){
            formData.append("imagem", imagem)
        }
        const response = await fetcher<FormData>('post', '/modelos', formData)
        console.log('requisição feita post') 
        return response
    }catch(error){
        throw new Error('Erro ao criar o modelo')
    }
} 


export const PatchModelos = async (modelo: Partial<Omit<ModeloState, "imagem">>, imagem: File,  id: number) => {
    try {

        interface EnviarProps {
            dados?: Partial<ModeloState>
        }
        console.log("imagem patch:",imagem)

        const formData = new FormData()
        
        if(imagem){
            formData.append("imagem", imagem)
        }

        const enviarDados : EnviarProps = {
            dados: modelo,
        }

        // formData.append(
        //     "dados",
        //     new Blob([JSON.stringify(modelo)], { type: "application/json" })
        // )

        formData.append("dados", JSON.stringify(modelo));

        

        console.log("JSON REAL:",JSON.stringify(modelo));        

        console.log("id na service:",id)
        console.log("modelo na service:", enviarDados)
        const responseDados = await fetcher<FormData>('patch', `/modelos/${id}`, formData)
        // const responseImage = await fetcher<FormData>('patch', `/modelos/${id}`, formData)

        return
    }catch(error){
        throw new Error('Erro ao atualizar o modelo')
    }
} 


export const DeleteModelos = async (id: number) => {
    try {
        const response = await fetcher<ModeloState>('delete', `/modelos/${id}`)
        return response
    }catch(error){
        throw new Error('Erro ao deletar o modelo')
    }
} 