import Button from "@/components/Button/Button";
import ContainerModal, { ModalHandle } from "../ContainerModal/Index";
import { forwardRef, useEffect, useState } from "react";
import Textfield from "@/components/TextField/Index";
import IconUploadFile from "../../../../public/icons/IconUploadFile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useModeloStore, { ModeloStateGet } from "@/store/useModeloStore";
import Image from "next/image";

export interface ModalAdicionarEditarProps{
    onSubmit: (form: ModeloFormData) => Promise<void>
    method:  'POST' | 'PATCH',
    data?: ModeloStateGet | null
}

const schemaModelos = z.object ({
    nome: z.string().nonempty('campo obrigatório'),
    descricao: z.string().nonempty('campo obrigatório'),
    precoTotal: z.preprocess(
        (val) => (val === '' ? undefined : Number(val)),
        z.number({ error: 'Campo obrigatório' })
    ),
    precoSinal: z.preprocess(
        (val) => (val === '' ? undefined : Number(val)),
        z.number({ error: 'Campo obrigatório' })
    ),
    duracaoHoras: z.preprocess(
        (val) => (val === '' ? undefined : Number(val)),
        z.number({ error: 'Campo obrigatório' })
    ),
    imagem: z.any().refine((files)=>files?.[0] instanceof File, {
        message: 'Imagem obriatória'
    }).transform((files)=> files?.[0] as File)
})
export type ModeloFormData = z.infer<typeof schemaModelos>

const ModalAdicionarEditar = forwardRef<ModalHandle, ModalAdicionarEditarProps>(({onSubmit, method, data},ref)=>{

    const {isLoading} = useModeloStore()
    const [preview, setPreview] = useState('')

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
        resolver: zodResolver(schemaModelos),
    })

    useEffect(() => {
        if (data) {
            reset({
                nome: data.nome || "",
                descricao: data.descricao || "",
                precoTotal: data.precoTotal?.toString() || "",
                precoSinal: data.precoSinal?.toString() || "",
                duracaoHoras: data.duracaoHoras?.toString() || "",
                imagem: undefined as any,
            }); 
        } else {
            reset({
            nome: "",
            descricao: "",
            precoTotal: "",
            precoSinal: "",
            duracaoHoras: "",
            imagem: undefined as any,
            });
        }
        }, [JSON.stringify(data), reset]);

    const clearValues = () => {
        clearErrors()
        reset()
        clearImage()
    }

    const clearImage = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview("")
    }

    const handleFileChange = ( e:React.ChangeEvent<HTMLInputElement> ) =>{
        const file = e.target.files?.[0]
        if(file) {
            const imageURL = URL.createObjectURL(file)
            setPreview(imageURL)
        }
    }

    console.log("imageURL:",data?.imagemUrl)
    
        return(
            <ContainerModal width="w-[800px]" title={method== "PATCH"? 'Editar Modelo' : 'Adicionar Modelo'} ref={ref as any} clearErrors={clearValues} onClose={clearImage} >
                <div className="flex gap-8">

                    <div className="w-[400px] flex flex-col ">
                        <div className="h-[250px] bg-[#FCFCFC] border-1 border-[var(--color-brown-30)] rounded-sm" >

                            <div className="relative flex flex-col items-center w-full h-full justify-center text-[var(--color-gray-60)] gap-2">
                                {preview ? (
                                    <Image alt="" src={preview} fill className="rounded-md" />
                                ): (
                                    <div className="flex flex-col justify-center items-center">
                                        <IconUploadFile width={24}/>
                                        <p>Insira a foto do modelo</p>
                                    </div>
                                )}
                                
                            </div>
                        </div>

                        <div className="flex justify-center mt-5 relative">
                            <input className="absolute w-44 bottom-0 z-10 opacity-0 bg-[var(--color-brown-50)] text-white px-5 py-2 rounded mt-7" type="file" {...register('imagem', {onChange: (e)=>handleFileChange(e)})} ></input>
                            <div className="relative">
                                <span className="absolute mt-1.5 ml-5">
                                    <IconUploadFile fill="#fff" width={20}/>
                                </span>
                                <button className="bg-[var(--color-brown-50)] w-44 rounded py-2 text-white font-medium pl-5">choose a file</button>
                            </div>
                        </div>

                    </div>


                        <form onSubmit={handleSubmit((data)=>{
                             if (!isLoading){
                                onSubmit(data)
                            }
                        })}>
                            <div className="flex flex-col gap-5">
                                <Textfield label="Nome" {...register('nome')} error={errors.nome?.message}/>
                                <Textfield label="Materiais" {...register('descricao')} error={errors.descricao?.message }/>

                                <div className="flex gap-5">
                                    <Textfield label="Duração" {...register('duracaoHoras')} error={errors.duracaoHoras?.message} />
                                    <Textfield label="Valor Sinal"  {...register('precoSinal')} error={errors.precoSinal?.message}/>
                                    <Textfield label="Valor Final" {...register('precoTotal')} error={errors.precoTotal?.message}/>
                                </div>
                            </div>

                            <div className="flex gap-6 justify-end w-full mt-8">
                                <Button label="cancelar" variant="secondary" onClick={()=>(ref as any).current?.close()} />
                                <Button type="submit" label={method=='PATCH' ? 'Editar' : 'Adicionar' } variant="primary"/>
                            </div>
                        </form>       
                </div>
            </ContainerModal>
        )
    })

    export default ModalAdicionarEditar