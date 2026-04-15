import Image from "next/image";
import Link from "next/link";

export function Hero(){

    return(

        <section className="min-h-screen pt-16.5 lg:pt-18 overflow-hidden">
            <div className="h-full md:pt-12 md:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-800">Aprender <span className="text-violet-700">idiomas</span> nunca foi tão <span className="text-violet-700">simples</span></h1>
                        <p className="mt-4 lg:mt-6 text-lg text-neutral-500">Conecte-se com professores nativos e certificados do mundo inteiro. Aulas ao vivo, personalizadas e no seu ritmo</p>
                        <div className="mt-10 md:mt-20">           
                            <Link 
                                href={""}
                                className="px-6 py-3 bg-violet-700 text-white font-bold rounded-lg"
                            >
                                <span>Comece agora</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <Image
                            src={"/img/hero_ladingpage.png"}
                            alt="Imagen da hero ladingpage"
                            width={1774}
                            height={1024}
                            className="object-contain"
                            priority
                        />      
                    </div>
                </div>
                <div className="pt-10 md:pt-20 grid grid-cols-2 lg:grid-cols-4 gap-5 text-neutral-800">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">10.000 +</span>
                        <span className="text-neutral-500">Professores</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">50 +</span>
                        <span className=" text-neutral-500">Idiomas disponíveis</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">100 +</span>
                        <span className=" text-neutral-500">Nacionalidades de professores</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">4.8</span>
                        <span className=" text-neutral-500">Avaliação média dos professores</span>
                    </div>

                </div>
            </div>
        </section>

    )

}