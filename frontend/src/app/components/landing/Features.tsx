import { BiVideo, BiCalendar, BiShield, BiMessageRounded, BiAward, BiTime } from "react-icons/bi";

const features = [
    {
        icon: BiVideo,
        title: "Aulas ao vivo por vídeo",
        description: "Aulas individuais em alta qualidade com professores dedicados exclusivamente a você.",
    },
    {
        icon: BiCalendar,
        title: "Horários flexíveis",
        description: "Agende aulas quando quiser — manhã, tarde ou noite, incluindo finais de semana.",
    },
    {
        icon: BiShield,
        title: "Professores verificados",
        description: "Todos os professores passam por uma verificação rigorosa de certificação e experiência.",
    },
    {
        icon: BiMessageRounded,
        title: "Método conversacional",
        description: "Foco em conversação real para você ganhar fluência e confiança rapidamente.",
    },
    {
        icon: BiAward,
        title: "Aula experimental grátis",
        description: "Experimente uma aula gratuita com qualquer professor antes de se comprometer.",
    },
    {
        icon: BiTime,
        title: "Progresso acompanhado",
        description: "Relatórios de progresso e feedback do professor após cada aula realizada.",
    },
];

export function Features(){

    return(

        <section className="py-18" id="Por que nos escolher">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold text-violet-700 uppercase mb-3">Por que nos escolher</p>
                    <h2 className="text-3xl sm:text-4xl font-bold">Tudo que você precisa para aprender</h2>
                </div>
                <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-6 rounded-2xl bg-card border border-border/50 border-transparent hover:border-violet-700 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-violet-700/15 transition-colors">
                                <feature.icon size={25} className="text-violet-700"/>
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-neutral-800">{feature.title}</h3>
                            <p className="mt-2 text-neutral-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
    
}