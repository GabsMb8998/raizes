import TextDefault from "../TextDefault/Index";

interface Icontentcontainer {
    subtext: string
    text: string
}

interface IContainerAgendamentosProps {
    status: 'COMPLETO' | 'PENDENTE'
}

export default function ContainerAgendamentos({status}: IContainerAgendamentosProps){

    const contentContainer: Icontentcontainer[]  = [
        {
            subtext: 'modelo',
            text: 'Nagô'
        },
        {
            subtext: 'duração',
            text: '8h'
        },
        {
            subtext: 'material',
            text: 'Jumbo e cachos'
        },
    ]


    return(
        <div className={`${status =='PENDENTE' ? 'border-l-[#4897FF]' : 'border-l-[#7FC487] '} w-full flex p-8 rounded-lg justify-between px-20 border-l-8  shadow-container-agendamentos `}>
            
            <div className="flex flex-col items-center">
                <TextDefault content="status" variant="subtext" className="text-xl" />
                <div className={`${status =='PENDENTE' ? 'bg-[#4897FF]' : 'bg-[#7FC487]'} rounded-full p-2  h-8 text-center flex items-center font-medium text-white px-4`}>
                    <span>confirmado</span>
                </div>
            </div>
            {contentContainer.map((item, index)=>(
                <div key={index} className="flex flex-col items-center ">
                    <TextDefault content={item.subtext} variant="subtext" className="text-xl"/>
                    <TextDefault content={item.text} variant="text" className="text-xl"/>
                </div>
            ))}

            <div className="self-center">
                <button className="bg-[#FFC5C5] text-[#633030] px-10 py-3 rounded-lg font-semibold text-lg ">confirmar</button>
            </div>
        </div>
    )
}