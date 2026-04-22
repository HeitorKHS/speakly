import Link from "next/link";

const links = {
  "Plataforma": ["Como Funciona", "Por que nos escolher", "Idiomas", "Depoimentos", "Faq"],
  "Para Professores": ["Seja um Professor", "Central do Professor", "Recursos"],
  "Empresa": ["Sobre Nós", "Blog", "Carreiras", "Contato"],
  "Suporte": ["Central de Ajuda", "Termos de Uso", "Privacidade", "FAQ"],
};

export function Footer(){

    return(

        <footer className="bg-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <Link 
                        href={"/"} 
                        aria-label="Ir para home"
                        className="text-violet-700 text-xl font-bold col-span-2 md:col-span-1"
                    >
                        Speakly
                    </Link>
                    {Object.entries(links).map(([title, items])=>(
                        <div key={title}>
                            <h4 className="font-semibold text-sm mb-3">{title}</h4>
                            <ul className="space-y-2">
                                {items.map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`#${item}`}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-800">
                    <p>
                        © 2026 Speakly. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-neutral-500 transition-colors duration-300">Termos</a>
                        <a href="#" className="hover:text-neutral-500 transition-colors duration-300">Privacidade</a>
                        <a href="#" className="hover:text-neutral-500 transition-colors duration-300">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>

    )

}