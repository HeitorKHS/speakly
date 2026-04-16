import Image from "next/image";
import Link from "next/link";

const badges = [
    {
        title: "10.000 +",
        text: "Professores",
    },
    {
        title: "50 +",
        text: "Idiomas disponíveis",
    },
    {
        title: "100 +",
        text: "Nacionalidades de professores",
    },
    {
        title: "4.8",
        text: "Avaliação média dos professores",
    },
];

export function Hero(){

    return(

        <section className="min-h-screen pt-16.5 lg:pt-18 overflow-hidden flex">
            <div className="flex-1 flex flex-col justify-between md:pt-20 md:pb-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-800">Aprender <span className="text-violet-700">idiomas</span> nunca foi tão <span 					className="text-violet-700">simples</span></h1>
                        <p className="mt-4 lg:mt-6 text-lg text-neutral-500">Conecte-se com professores nativos e certificados do mundo inteiro. Aulas ao vivo, personalizadas e no seu ritmo</p>
                        <div className="mt-10 md:mt-20">
                            <Link 
                                href={""}
                                className="px-6 py-3 bg-violet-700 text-white font-bold rounded-lg"
                            >
                                Comece agora
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src={"/img/hero_landingpage.png"}
                            alt="Imagen da hero ladingpage"
                            width={1774}
                            height={1024}
                            className="object-contain"
                            priority
                        />      
                    </div>
                </div>
                <div className="pt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {badges.map((badge)=>(
                        <div key={badge.title}>
                            <h3 className="text-xl font-bold text-neutral-800">{badge.title}</h3>
                            <p className="text-neutral-500">{badge.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )

}