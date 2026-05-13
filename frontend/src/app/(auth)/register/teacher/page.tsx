'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterTeacherSchema, registerTeacherSchema } from "@/schemas/authSchema";
import { BiError, BiSolidTrashAlt } from "react-icons/bi";
import { useLanguage } from "@/hooks/useLanguage";
import { useSelectedLanguages } from "@/hooks/useSelectedLanguages";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Teacher(){

    const {languages} = useLanguage();
    const languageTaught = useSelectedLanguages();
    const languageSpoken = useSelectedLanguages();
    const {handleRegisterTeacher} = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: {errors},
    } = useForm<RegisterTeacherSchema>({
        resolver: zodResolver(registerTeacherSchema),
        defaultValues:{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            bio: "",
            description: "",
            price: 0,
            teacherLanguageTaught: [],
            teacherLanguageSpoken: [],
        }
    })

    const handleAddTaught = () => {

        const ids = languageTaught.handleAdd(languages);

        if(ids){
            setValue("teacherLanguageTaught", ids);
        }

    }

    const handleAddSpoken = () => {

        const ids = languageSpoken.handleAdd(languages);

        if(ids){
            setValue("teacherLanguageSpoken", ids);
        }

    }

    const handleRemoveTaught = (id: string) => {

        const ids = languageTaught.handleRemove(id);

        setValue("teacherLanguageTaught", ids);

    }

    const handleRemoveSpoken = (id: string) => {

        const ids = languageSpoken.handleRemove(id);

        setValue("teacherLanguageSpoken", ids);

    }

    const onsubmit = async (data: RegisterTeacherSchema) => {
        await handleRegisterTeacher(data, setError)
    }

    return(

        <div className="min-h-screen pt-16.5 lg:pt-18 overflow-hidden flex">
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="flex items-center p-10 md:p-20 md:w-1/2 bg-violet-700">
                    <div className="text-white">
                        <h2 className="text-2xl md:text-3xl mb-2 font-semibold">Crie sua conta de professor</h2>
                        <p className="text-sm">Compartilhe seu conhecimento, conecte-se com alunos e transforme seu idioma em oportunidades.</p>
                    </div>
                </div>
                <div className="p-10 md:p-20 md:w-1/2">
                    <h2 className="text-xl font-bold text-center mb-5">Seja professor no Speakly</h2>
                    {errors.root && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.root.message}</span>}
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="mx-4">
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Nome</label>
                                <input 
                                    type="text"
                                    placeholder="Nome"
                                    {...register("name")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.name && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.name.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">E-mail</label>
                                <input 
                                    type="email"
                                    placeholder="E-mail"
                                    {...register("email")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.email && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.email.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Senha</label>
                                <input 
                                    type="password"
                                    placeholder="Senha"
                                    {...register("password")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.password && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.password.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Confirme senha</label>
                                <input 
                                    type="password"
                                    placeholder="Confirmar senha"
                                    {...register("confirmPassword")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.confirmPassword && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.confirmPassword.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Biografia</label>
                                <textarea           
                                    placeholder="Biografia"
                                    {...register("bio")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.bio && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.bio.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Descrição</label>
                                <textarea
                                    placeholder="Descreva como são as aulas"
                                    {...register("description")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.description && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.description.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Preço</label>
                                <input 
                                    type="text"
                                    placeholder="Preço"
                                    {...register("price", { valueAsNumber: true })}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.price && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.price.message}</span>}
                            </div>
                            <div className="mb-10">
                                <label className="font-semibold text-neutral-800/90">Idiomas que ensina</label>
                                <div className="mt-2 flex gap-2">
                                    <select
                                        value={languageTaught.selectedLanguageId}
                                        onChange={(e)=>languageTaught.setSelectedLanguageId(e.target.value)}
                                        className="w-full border border-neutral-300 rounded-lg text-sm pl-2 pr-4 py-1 focus:outline-none focus:border-violet-700"
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
                                        onClick={handleAddTaught}
                                        className="bg-violet-700 text-white px-3 rounded-lg"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                                {errors.teacherLanguageTaught && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.teacherLanguageTaught.message}</span>}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {languageTaught.selectedLanguages.map((language)=>(                                       
                                        <div 
                                            key={language.id} 
                                            className="flex items-center gap-2 px-3 py-1 rounded-full text-neutral-700 border border-violet-700"
                                        >
                                            <span>{language.name}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveTaught(language.id)} 
                                                className="text-neutral-400 hover:text-neutral-800 cursor-pointer transition-colors duration-300"
                                            >
                                                <BiSolidTrashAlt />
                                            </button>
                                        </div>   
                                    ))}
                                </div>
                            </div>
                            <div className="mb-10">
                                <label className="font-semibold text-neutral-800/90">Idiomas que fala</label>
                                <div className="mt-2 flex gap-2">
                                    <select
                                        value={languageSpoken.selectedLanguageId}
                                        onChange={(e)=>languageSpoken.setSelectedLanguageId(e.target.value)}
                                        className="w-full border border-neutral-300 rounded-lg text-sm pl-2 pr-4 py-1 focus:outline-none focus:border-violet-700"
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
                                        onClick={handleAddSpoken}
                                        className="bg-violet-700 text-white px-3 rounded-lg"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                                {errors.teacherLanguageSpoken && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.teacherLanguageSpoken.message}</span>}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {languageSpoken.selectedLanguages.map((language)=>(                                       
                                        <div 
                                            key={language.id} 
                                            className="flex items-center gap-2 px-3 py-1 rounded-full text-neutral-700 border border-violet-700"
                                        >
                                            <span>{language.name}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveSpoken(language.id)} 
                                                className="text-neutral-400 hover:text-neutral-800 cursor-pointer transition-colors duration-300"
                                            >
                                                <BiSolidTrashAlt />
                                            </button>
                                        </div>   
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="py-2 w-full text-white font-semibold bg-neutral-800 hover:bg-neutral-700 rounded-md cursor-pointer transition-colors duration-300"
                        >
                            Criar conta
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-neutral-600 text-sm">Já tem uma conta ? <Link href={"/login"} className="text-violet-500 hover:underline">Entrar</Link></p>
                    </div>
                </div>
            </div>
        </div>

    )

}