import Header from "@/components/Header/Index"
import "../globals.css"
import TextDefault from "@/components/TextDefault/Index"
import ContentDescription from "@/components/ContentDescription/Index"
import DropDown from "@/components/DropDown/Index"
import Button from "@/components/Button/Button"
import IconAgenda from "../../../public/icons/IconAgenda"

export default function ModelsDescription () {
    return (
        <div className="">
            <Header colorMode="dark"/>

            <div className="flex my-10">
                <div className="bg-amber-300 w-[400px] h-[630px]">img</div>

                <div className="w-1/2 ml-16">

                    <div className="">
                        <TextDefault content="modelos1" className="font-semibold text-4xl" />
                    </div>

                    <div className="my-14">
                        <TextDefault content="valor final" variant="subtext" className="text-2xl"/>
                        <TextDefault content="R$380,00" variant="text" className="text-4xl font-semibold"/>
                    </div>

                    <ContentDescription/>

                    <div className="my-8">
                        <TextDefault content="selecione uma data:" variant="subtext" className="text-2xl"/>

                        <div className="flex w-[80%] gap-4 mt-3">
                            <div className="flex-5">
                                <DropDown>
                                    <TextDefault content="mês" className="text-lg text-[#B1B1B1] font-normal"/>
                                </DropDown>
                            </div>
                            <div className="flex-3">
                                <DropDown defaultLabel={'01'} >
                                    <TextDefault content="dia" className="text-lg text-[#B1B1B1] font-normal" />
                                </DropDown>
                            </div>
                            <div className="flex-3">
                                <DropDown defaultLabel="13:00">
                                    <TextDefault content="horário" className="text-lg text-[#B1B1B1] font-normal"/>
                                </DropDown>
                            </div>
                        </div>

                    </div>

                    <Button label="agendar" variant="agendar">
                        <IconAgenda fill="#fff"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}