export default function Footer(){
    return(
        <footer className="relative bottom-0 mt-20 w-full flex p-16 gap-32 font-light text-xl bg-[var(--color-gray-100)] text-[#ededed]">
                <div>
                    <h5 className="text-2xl text-white font-normal">NAVEGAÇÃO</h5>
                    <div className="mt-2 flex flex-col gal-1">
                        <p>Inicio</p>
                        <p>Agendamentos</p>
                    </div>
                </div>

                <div>
                    <h5 className="text-2xl text-white font-normal">CONTATO</h5>

                    <div className="mt-2 flex flex-col gap-1">
                        <div>
                            <span></span>
                            <a>yltrancista</a>
                        </div>

                        <div>
                            <span></span>
                            <a>(19) 99415 - 4729</a>
                        </div>
                    </div>
                    
                </div>
        </footer>
    )
}