import Header from "@/components/Header/Index";
import Image from "next/image";
import imageYagoLima from "../../../../public/YagoLima.png"

export default function HomePage(){

    return(
        <>
        <div className="absolute top-0 left-0 w-screen h-[60vh] -z-10">
            <Image alt="" src={"banner1.svg"} fill style={{ objectFit: 'cover' }} />

            <div className="text-white absolute z-10 left-24 bottom-[15%]">
                <h5 className="text-5xl">STUDIO RAIZES</h5>
                <p className="text-xl w-2/3 font-light text-[#BFBFBF] mt-6">algum texto ai algum texto ai algum texto ai algum algum tex</p>
                <button className="bg-transparent border-1 border-[#B8B8B8] px-12 py-4 text-xl text-[#EDEDED] mt-12 cursor-pointer">AGENDE JÁ</button>
            </div>
        </div>
    
        <div className="">
            <Header colorMode="light"/>
            
            <div className="h-[60vh] w-full" ></div>

            {/* modelos 1  */}
            <div className="flex gap-6 justify-center">
                <div className="bg-amber-950 h-[430px] w-72"></div>
                <div className="bg-amber-950 h-[430px] w-72"></div>
                <div className="bg-amber-950 h-[430px] w-72"></div>
                <div className="bg-amber-950 h-[430px] w-72"></div>
            </div>

            {/* banner1 */}

            <div className="relative left-1/2 -translate-x-1/2 w-[90vw] flex gap-3 mt-16">
                <div className="w-full h-[80vh] bg-amber-900"></div>
                <div className="w-full h-[80vh] bg-amber-900"></div>
                <div className="w-full h-[80vh] bg-amber-900"></div>
            </div>
         
            <div className="flex gap-6 justify-center mt-16 w-full">
               <div className="bg-amber-950 h-[430px] w-72"></div>
                <div className="bg-amber-950 h-[430px] w-72"></div>
                <div className="bg-amber-950 h-[430px] w-72"></div>
                <div className="bg-amber-950 h-[430px] w-72"></div>
            </div>

            {/* sobre o trancista */}
            <div className="relative left-1/2 -translate-x-1/2 w-[90vw] mt-20">
                <Image src={imageYagoLima} alt="" style={{ position: 'relative', width: '80%', height: '100%' }} objectFit="cover"/>
               
                {/* <div className="bg-amber-800 w-[60vw] h-[60vh]"></div>

                <div className="absolute bottom-50 bg-[var(--color-brown-80)] text-white w-[40vw] h-[30vh] flex flex-col justify-center pb-10 px-10 right-80 rounded-bl-4xl rounded-tr-4xl">
                    <h5 className="text-3xl">YAGO LIMA</h5>
                    <p className="font-light text-xl">Trabalho com beleza e cuidados pessoais a mais de * anos, vamos agendar comigo? </p>
                </div> */}
            </div>
        </div>
        </>
    )
}