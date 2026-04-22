import { BiUserPlus, BiSearch, BiVideo } from "react-icons/bi";

const steps = [
    {
        icon: BiUserPlus,
        title: "Crie sua conta",
        description: "Cadastre-se gratuitamente em menos de 1 minuto e configure seu perfil com seus objetivos de aprendizado.",
    },
    {
        icon: BiSearch,
        title: "Encontre seu professor",
        description: "Explore professores nativos e certificados. Filtre por idioma, preço, disponibilidade e avaliações.",
    },
    {
        icon: BiVideo,
        title: "Comece a aprender",
        description: "Agende sua aula, conecte-se por vídeo e comece sua jornada de aprendizado personalizada.",
    },
];

export function HowItWorks(){

    return(

        <section className="py-18" id="Como Funciona">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold text-violet-700 uppercase mb-3">Simples e rápido</p>
                    <h2 className="text-3xl sm:text-4xl font-bold">Como funciona</h2>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-15">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="relative inline-flex">
                                <div className="w-24 h-24 flex justify-center items-center shadow-xl">
                                    <step.icon size={33} className="text-violet-700"/>
                                </div>
                                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-violet-700 text-white text-sm font-bold flex items-center justify-center">
                                    0{index+1}
                                </span>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-neutral-800">{step.title}</h3>
                            <p className="mt-3 max-w-xs mx-auto text-neutral-500">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )

}