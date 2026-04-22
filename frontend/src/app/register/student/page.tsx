'use client'

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage"
import Link from "next/link";
import { BiSolidTrashAlt } from "react-icons/bi";

interface Language{
    id: string,
    name: string,
};

export default function Student(){

    const [selectedLanguageId, setSelectedLanguageId] = useState<string>("");
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
    const {languages} = useLanguage();

    function addLanguage(){

        const language = languages.find(l => l.id === selectedLanguageId);

        if(!language) return;

        // evita duplicados
        if (selectedLanguages.some(l => l.id === language.id)) return;

        setSelectedLanguages(prev => [...prev, language]);

    }

    function removeLanguage(id: string){

        setSelectedLanguages(prev => prev.filter(l => l.id !== id));
    
    }

    return(

        <div className="min-h-screen pt-16.5 lg:pt-18 overflow-hidden flex">
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="flex-1 flex items-center p-20 md:w-1/2 bg-violet-700">
                    <div className="text-white">
                        <h2 className="text-2xl md:text-3xl mb-2 font-semibold">Crie sua conta gratuita</h2>
                        <p className="text-sm">Explore novos idiomas, conecte-se com culturas e amplie suas oportunidades.</p>  
                    </div>
                </div>
                <div className="flex-1 p-20">
                    <h2 className="text-xl font-bold text-center mb-5">Inscreva-se no Speakly</h2>
                    <form action="">
                        <div className="mx-4">
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">E-mail</label>
                                <input 
                                    type="email"
                                    placeholder="E-mail"
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Senha</label>
                                <input 
                                    type="password"
                                    placeholder="Senha"
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Nome:</label>
                                <input 
                                    type="text" 
                                    placeholder="Nome"
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                            </div>
                            <div className="mb-10">
                                <label className="font-semibold text-neutral-800/90">Idiomas que quer aprender</label>
                                <div className="mt-2 flex gap-2">
                                    <select 
                                        value={selectedLanguageId}
                                        onChange={(e)=>setSelectedLanguageId(e.target.value)}
                                        className="w-full border border-neutral-300 rounded-lg px-2 py-1 focus:outline-none focus:border-violet-700"
                                    >
                                        <option value="">Selecione um idioma</option>
                                        {languages.map((language)=>(
                                            <option key={language.id} value={language.id}>
                                                {language.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={addLanguage}
                                        className="bg-violet-700 text-white px-3 rounded-lg"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {selectedLanguages.map((language)=>(
                                        <div 
                                            key={language.id}
                                            className="flex items-center gap-2 px-3 py-1 rounded-full text-neutral-700 border border-violet-700"
                                        >
                                            <span>{language.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeLanguage(language.id)}
                                                className="text-neutral-400 hover:text-neutral-800 cursor-pointer transition-colors duration-300"
                                            >
                                                <BiSolidTrashAlt/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    className="py-2 w-full text-white font-semibold bg-neutral-800 hover:bg-neutral-700 rounded-md cursor-pointer transition-colors duration-300"
                                 >
                                    Criar conta
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-neutral-600 text-sm">Já tem uma conta ? <Link href={""} className="text-violet-500 hover:underline">Entrar</Link></p>
                    </div>     
                </div>
            </div>
        </div>

    )

}