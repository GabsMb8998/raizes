'use client'
import Header from "@/components/Header/Index"
import "../../../globals.css"
import TextDefault from "@/components/TextDefault/Index"
import ContentDescription from "@/components/ContentDescription/Index"
import DropDown, { SelectedDropDown } from "@/components/DropDown/Index"
import Button from "@/components/Button/Button"
import IconAgenda from "../../../../../public/icons/IconAgenda"
import useModeloStore from "@/store/useModeloStore"
import { useEffect, useRef, useState } from "react"
import { formatarDia, formatarHora, formatarReais } from "@/utils/functions/formater"
import { monthsName, url } from "@/utils/constants/constants"
import useAgendamentoStore, { AgendamentoState } from "@/store/useAgendamentoStore"
import Image from "next/image"
import useCoresStore, { CoresState } from "@/store/useColorStore"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useUsuarioAtual from "@/hooks/useUsuarioAtual"

interface ModeloPageProps {
  params: {
    slug: string
  }
}

const schemaMarcarAgendamento = z.object ({
    mes: z.string().nonempty('campo obrigatório'),
    dia: z.string().nonempty('campo obrigatório'),
    hora: z.string().nonempty('campo obrigatório'),
    cor: z.string().nonempty('campo obrigatório')
})

export type ModeloFormDataMarcarAgendamento = z.infer<typeof schemaMarcarAgendamento>


export default function ModelsDescription ({params}: ModeloPageProps) {
    
    const id = params.slug?.split("-")[0]
    
    const { getModeloById, modelo } = useModeloStore()
    const {availableDate, getAvailableDate, postAgendamento} = useAgendamentoStore()
    const {getCores, corData } = useCoresStore()
    
    const currentMonth = new Date().getMonth()
    const [optionsHour, setOptionsHours] = useState<string[]>([])
    
    const [optionsColor, setOptionsColor] = useState<string[]>([])
    const [selectedColor, setSelectedColor] = useState<string>(optionsColor?.[0])

    const refMonth = useRef<SelectedDropDown>(null) 

    const year = new Date().getFullYear()
    
    const [optionsDays, setOptionsDays] = useState<string[]>()

    const {
        register,
        handleSubmit,
        formState: {errors},
        clearErrors,
        reset,
        control,
        getValues,
        watch,
        setValue
    } = useForm ({
        resolver: zodResolver(schemaMarcarAgendamento),
        defaultValues: {
            mes: monthsName[currentMonth],
            dia: new Date().getDate().toString(),
            hora: optionsHour?.[0]
        }
    })

    const mes = watch("mes")
    const dia = watch("dia")

    useEffect(()=> {
        getModeloById(Number(id))
    }, [id])

     useEffect(()=>{
        // 🔹 Busca as datas disponíveis do modelo assim que o mês muda
        if(getValues("mes")){
            getAvailableDate(year,monthsName.indexOf(getValues("mes")) + 1, Number(id))
        }
    }, [getValues("mes"), id])    

    useEffect(()=>{
        if(availableDate){

            const monthNumber = (monthsName.indexOf(getValues("mes")) + 1).toString().padStart(2, "0");
            console.log("monthNumber:",monthNumber)
            const dayNumber = getValues("dia").toString().padStart(2, "0");
            const dataKey = `${year}-${monthNumber}-${dayNumber}`;
            setOptionsDays(formatarDia(Object.keys(availableDate)))
            setOptionsHours(availableDate?.[dataKey])
        }
    }, [availableDate, dia, mes])

    useEffect(() => {
        if (optionsHour?.length > 0) {
            setValue("hora", optionsHour[0])
        }
    }, [optionsHour])

    
    useEffect(()=>{
        getCores()
    }, [])
    
    useEffect(()=>{
        if(corData){
            corData.map((item, index)=> {
                optionsColor.push(item.nome)
            })
        }
    }, [corData])
    
    useEffect(() => {
        
        console.log('teste 2')
        console.log('option lenght:', optionsColor?.length)
        console.log('option color:', optionsColor)
        if (optionsColor?.length > 0) {
            console.log('teste')
            setSelectedColor(optionsColor[0]);
        }
    }, [optionsColor])

    useEffect(()=>{
        console.log(selectedColor)
        console.log(optionsColor)
    },[selectedColor])
    
    const {user} = useUsuarioAtual()
    
    const onsubmit = (form: ModeloFormDataMarcarAgendamento) =>{

        const monthNumber = (monthsName.indexOf(getValues("mes")) + 1).toString().padStart(2, "0");
        const diaFormatado = getValues("dia").padStart(2, "0");

        const dateTimeStr = `${year}-${monthNumber}-${diaFormatado}T${getValues("hora")}`;
        const date = new Date(dateTimeStr)

        // console.log("date strinf:", dateTimeStr)
        // console.log("date date:", date)

        const corSelected = corData?.find(cor=>{
            return cor.nome == form.cor
        })

        const userId = user?.email

        if (!userId) {
            console.error("Usuário não logado ou ID não disponível");
        return;
        }


        const postForm: Omit<AgendamentoState, "id" | "status"> = {
            usuarioEmail: userId,
            corId: corSelected!.id,
            modeloId: Number(id),
            dataHora: dateTimeStr
        }

        postAgendamento(postForm)
        console.log("form:",form)
    }

    return (
        <div className="">
            <Header colorMode="dark"/>

            {modelo && (
                <form className="flex my-10" onSubmit={handleSubmit(onsubmit)}>
                    <div className="bg-amber-300 w-[430px] h-[730px]">img</div>
                    {/* <Image alt="" src={`${url}/uploads/${modelo.imagemUrl}`} width={400} height={630}/> */}
    
                    <div className="w-1/2 ml-16">
    
                        <div className="">
                            <TextDefault content={modelo?.nome} className="font-semibold text-4xl" />
                        </div>
    
                        <div className="my-14">
                            <TextDefault content="valor final" variant="subtext" className="text-2xl"/>
                            <TextDefault content={formatarReais(modelo.precoTotal)} variant="text" className="text-4xl font-semibold"/>
                        </div>
    
                        <ContentDescription duração={formatarHora(modelo.duracaoHoras)} material={modelo.descricao} valorSinal={formatarReais(modelo.precoSinal)} />
    
                        {/* <div className="my-8">
                            <TextDefault content="selecione uma data:" variant="subtext" className="text-2xl"/>
    
                            <div className="flex w-[80%] gap-4 mt-3">
                                <div className="w-72">
                                    <Controller
                                    name="mes"
                                    control={control}
                                    render={({field}) => (
                                        <DropDown 
                                        {...field}
                                        onChange={field.onChange} 
                                        options={optionsMonths} 
                                        value={field.value} 
                                        ref={refMonth}/>
                                    )}
                                        >

                                    </Controller>
                                </div>
                                <div className="flex-3">

                                    <Controller
                                    name="dia"
                                    control={control}
                                    render={({field})=> (
                                        <DropDown 
                                        options={optionsDays} 
                                        onChange={field.onChange} 
                                        value={field.value}/>
                                    )}
                                    >
                                        
                                    </Controller>
                                </div>
                                <div className="flex-3">

                                    <Controller
                                    name="hora"
                                    control={control}
                                    render={({field})=> (
                                        <DropDown 
                                        options={optionsHour} 
                                        onChange={field.onChange} 
                                        value={field.value} 
                                        key={field.value} 
                                        defaultLabel="09:00"/>
                                    )}
                                    >

                                    </Controller>
                                </div>
                            </div>
    
                            <div className="my-8 flex flex-col">
                                <TextDefault content="selecione uma cor:" variant="subtext" className="text-2xl"/>

                                <div className="w-[100%] flex">
                                    <div className="w-72">
                                        <Controller
                                        name="cor"
                                        control={control}
                                        render={({field})=>(
                                            <DropDown options={optionsColor} value={field.value} onChange={field.onChange} />
                                        )}
                                        >
                                        </Controller>
                                    </div>
                                </div>
                            </div>
                        </div> */}

    
                        <Button label="agendar" variant="agendar" type="submit">
                            <IconAgenda fill="#fff"/>
                        </Button>
                    </div>
                </form>

            )}
        </div>
    )
}