import { Controller } from "react-hook-form";
import TextDefault from "../TextDefault/Index";
import DropDown from "../DropDown/Index";
import { monthsName } from "@/utils/constants/constants";

export default function DateDropDown ({control}: {control: any}) {

        
    const currentMonth = new Date().getMonth()

        
    const optionsMonths = [
        monthsName[currentMonth],
        monthsName[currentMonth + 1],
        monthsName[currentMonth + 2],
    ]   
    
    return (
        <div className="my-8">
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
        </div>
    )
}