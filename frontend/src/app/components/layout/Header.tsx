'use client'

import Link from "next/link";
import { BiMenu, BiX  } from "react-icons/bi";
import { useState } from "react";

const links = [
    {href: "", label: "Opção 1"},
    {href: "", label: "Opção 2"},
    {href: "", label: "Opção 3"},
    {href: "", label: "Seja um professor"},
];

export function Header(){
    
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    return(

        <header className="fixed top-0 left-0 right-0 z-50 bg-white">
            <nav className="px-4 sm:px-6 lg:px-8 h-16.5 lg:h-18 flex justify-between items-center">
                <Link 
                    href={"/"} 
                    aria-label="Ir para home"
                    className="text-violet-700 text-xl font-bold"
                >
                    Speakly
                </Link>
                <div className="hidden lg:flex items-center text-neutral-800 font-semibold text-sm gap-15">
                    <div className="flex items-center gap-5">
                        {links.map((link)=>(
                            <Link
                                key={link.label}
                                href={link.href}
                                className="hover:text-neutral-500 transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}                     
                    </div>
                    <div className="flex items-center gap-5">
                        <Link 
                            href={""} 
                            className="hover:text-neutral-500 transition-colors duration-300"
                        >
                            Entrar
                        </Link>
                        <Link 
                            href={""} 
                            className="p-2 border border-neutral-800 rounded-lg hover:text-neutral-500 hover:border-neutral-500 transition-colors duration-300"
                        >
                            Criar uma conta
                        </Link>    
                    </div>                      
                </div>
                <button 
                    className="flex lg:hidden"
                    onClick={()=>setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <BiX size={30}/> : <BiMenu size={30}/>}
                </button>
            </nav>

            <div className={`flex flex-col text-neutral-800 font-semibold text-sm gap-2 transition-all duration-400 ease-in-out transform overflow-hidden
                ${mobileOpen ? "opacity-100 translate-y-0 p-4" : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"}`}>
                {links.map((link)=>(
                    <Link
                        key={link.label}
                        href={link.href}
                        className="hover:text-neutral-500 transition-colors duration-300"
                    >
                        {link.label}
                    </Link>
                ))}     
                <div className="flex flex-col items-center mt-5 gap-5">
                    <Link 
                        href={""} 
                        className="hover:text-neutral-500 transition-colors duration-300"
                    >
                        Entrar
                    </Link>
                    <Link 
                        href={""} 
                        className="w-full text-center p-2 border border-neutral-800 rounded-lg hover:text-neutral-500 hover:border-neutral-500 transition-colors duration-300"
                    >
                        Criar uma conta
                    </Link>    
                </div>                      
            </div>

        </header>

    )

}