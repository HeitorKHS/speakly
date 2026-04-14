export function Footer(){

    return(

        <footer className="bg-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-800">
                <p>
                    © 2026 Speakly. Todos os direitos reservados.
                </p>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-neutral-500 transition-colors duration-300">Termos</a>
                    <a href="#" className="hover:text-neutral-500 transition-colors duration-300">Privacidade</a>
                    <a href="#" className="hover:text-neutral-500 transition-colors duration-300">Cookies</a>
                </div>
            </div>
        </footer>

    )

}