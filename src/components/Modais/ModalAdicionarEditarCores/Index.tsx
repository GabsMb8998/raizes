import Button from "@/components/Button/Button";
import ContainerModal, { ModalHandle } from "../ContainerModal/Index";
import { forwardRef, useEffect, useState } from "react";
import Textfield from "@/components/TextField/Index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useModeloStore from "@/store/useModeloStore";
import { CoresState } from "@/store/useColorStore";

export interface ModalAdicionarEditarProps{
    onSubmit: (form: ModeloFormDataCores) => void
    method:  'POST' | 'PATCH',
    data?: CoresState | null
}

const schemaCor = z.object ({
    nome: z.string().nonempty('campo obrigatório'),
    codigoCor: z.string().nonempty('campo obrigatório'),
})
export type ModeloFormDataCores = z.infer<typeof schemaCor>

const ModalAdicionarEditarCores = forwardRef<ModalHandle, ModalAdicionarEditarProps>(({onSubmit, method, data}, ref)=>{

    const {isLoading} = useModeloStore()

    useEffect(()=>{
        async function testeToken() {
            // console.log('tokem no modal:', await getToken())
            const token = localStorage.getItem('token')
            console.log(token, 'token')
        }
        testeToken()
    }, [])

    const {
        register,
        handleSubmit,
        formState: {errors},
        clearErrors,
        reset
    } = useForm ({
        resolver: zodResolver(schemaCor),
    })

    useEffect(() => {
        if (data) {
            reset({
                nome: data.nome || "",
                codigoCor: data.codigoCor || "",
            }); 
        } else {
            reset({
            nome: "",
            });
        }
        }, [JSON.stringify(data), reset]);

    const clearValues = () => {
        clearErrors()
        reset()
    }
    
        return(
            <ContainerModal width="w-[600px]" title={method== "PATCH"? 'Editar Modelo' : 'Adicionar Modelo'} ref={ref as any} clearErrors={clearValues} >
                <form onSubmit={handleSubmit((data)=>{
                    if (!isLoading){
                            onSubmit(data)
                        }
                    })}>

                    <div className="flex flex-col gap-5">
                            <Textfield label="Nome" {...register('nome')} error={errors.nome?.message}/>
                            <Textfield label="Código da cor" {...register('codigoCor')} error={errors.codigoCor?.message }/>
                    </div>

                    <div className="flex gap-6 justify-end w-full mt-8">
                        <Button label="cancelar" variant="secondary" onClick={()=>(ref as any).current?.close()} />
                        <Button type="submit" label={method=='PATCH' ? 'Editar' : 'Adicionar' } variant="primary"/>
                    </div>
                </form>       
                
            </ContainerModal>
        )
    })

    export default ModalAdicionarEditarCores