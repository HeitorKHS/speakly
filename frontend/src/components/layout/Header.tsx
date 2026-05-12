'use client'

import Link from "next/link";
import { BiMenu, BiX  } from "react-icons/bi";
import { useEffect, useState, useRef } from "react";
import { useAuthProvider } from "@/provider/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { BiUser, BiStar, BiCalendar, BiLogOut } from "react-icons/bi";

const links = [
    {href: "", label: "Opção 1"},
    {href: "", label: "Opção 2"},
    {href: "", label: "Opção 3"},
    {href: "/register/teacher", label: "Seja um professor"},
];

export function Header(){
    
    const { user } = useAuthProvider();
    const { handleLogout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [menuDropdown, setMenuDropdown] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        const handleResize = () => {

            if(window.innerWidth >= 768){
                setMobileOpen(false);
            }

        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    },[])

    useEffect(()=>{

        const handleOutside = (event:MouseEvent) => {

            if (menuDropdown && menuRef.current && !menuRef.current.contains(event.target as Node)){
                setMenuDropdown(false);
            }

        }

        document.addEventListener("mousedown", handleOutside);

        return () => document.removeEventListener("mousedown", handleOutside);

    }, [menuDropdown]);

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
                <div className="flex gap-8">
                    <div className="hidden md:flex items-center text-neutral-800 font-semibold text-sm gap-15">
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
                    </div>
                    <button 
                        className="flex md:hidden cursor-pointer"
                        onClick={()=>setMobileOpen(!mobileOpen)}
                    >
                        <BiMenu size={30}/>
                    </button>
                    {user && user.role === "STUDENT" ? (
                        <div className="relative" ref={menuRef}>
                            <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                <button
                                    className="cursor-pointer"
                                    onClick={()=>setMenuDropdown(!menuDropdown)}
                                >
                                    <Image
                                        src={"/img/avatar.png"}
                                        alt="avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            </div>                        
                            <div className={`
                                fixed inset-0 flex flex-col bg-white
                                md:absolute md:inset-auto md:right-0 md:w-50 md:rounded-2xl md:shadow-2xl md:border md:border-neutral-100
                                ${menuDropdown ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"}`}>
                                <div className="flex md:hidden justify-end px-4 sm:px-6 h-10">
                                    <button 
                                        className="cursor-pointer"
                                        onClick={()=>setMenuDropdown(!menuDropdown)}
                                    >
                                        <BiX size={30}/> 
                                    </button>
                                </div>
                                <div className="flex flex-col text-neutral-800 text-sm font-normal p-2">
                                    <p className="p-2 border-b border-neutral-300">Olá, {user.name}</p>                           
                                    <Link href={"/"} className="flex items-center gap-2 p-2">{<BiUser size={18}/>}Perfil</Link>
                                    <Link href={"/"} className="flex items-center gap-2 p-2">{<BiStar size={18}/>}Favoritos</Link>
                                    <Link href={"/"} className="flex items-center gap-2 p-2">{<BiCalendar size={18}/>}Agenda</Link>                                    
                                    <div className="p-2 border-t border-neutral-300">
                                        <button 
                                            className="cursor-pointer flex items-center gap-2"
                                            onClick={()=>{
                                                setMenuDropdown(false)
                                                handleLogout()
                                            }}
                                        >
                                            {<BiLogOut size={18}/>}Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>        
                        </div>
                    ):(
                        <div className="flex items-center gap-5">
                            <Link 
                                href={"/login"} 
                                className="hover:text-neutral-500 transition-colors duration-300"
                            >
                                Entrar
                            </Link>
                            <Link 
                                href={"/register/student"} 
                                className="p-2 border border-neutral-800 rounded-lg hover:text-neutral-500 hover:border-neutral-500 transition-colors duration-300"
                            >
                                Criar uma conta
                            </Link>    
                        </div>   
                    )}
                </div>
            </nav>

            <div className={`text-neutral-800 font-semibold text-lg bg-white transition-all duration-200 ease-in-out transform
                ${mobileOpen ? "opacity-100 fixed inset-0 z-50" : "opacity-0 max-h-0 pointer-events-none"}`}>
                    <div className="flex justify-end px-4 sm:px-6 h-16.5">
                        <button 
                            className="cursor-pointer"
                            onClick={()=>setMobileOpen(!mobileOpen)}
                        >
                            <BiX size={30}/> 
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 px-5">    
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
                    <div className="flex flex-col items-center px-5 mt-5 gap-5">
                        <Link 
                            href={"/login"} 
                            className="hover:text-neutral-500 transition-colors duration-300"
                        >
                            Entrar
                        </Link>
                        <Link 
                            href={"/register/student"} 
                            className="w-full text-center p-2 border border-neutral-800 rounded-lg hover:text-neutral-500 hover:border-neutral-500 transition-colors duration-300"
                        >
                            Criar uma conta
                        </Link>    
                    </div>                      
                </div> 
        </header>

    )

}