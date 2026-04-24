'use client'

import { useLanguage } from "@/hooks/useLanguage"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { BiSolidTrashAlt, BiError } from "react-icons/bi";
import { registerStudentSchema, RegisterStudentSchema } from "@/schemas/authSchema";
import { useAuth } from "@/hooks/useAuth";
import { useSelectedLanguages } from "@/hooks/useSelectedLanguages";

export default function Student(){

    const { handleRegisterStudent } = useAuth();
    const {languages} = useLanguage();
    const languageGoals = useSelectedLanguages();

    //Configuração do form
    const {
            register, //Register cria no input o name, onChange, onBlur, ref
            handleSubmit, //event.preventDefault() e valida os dados com o zod
            setValue, //Seta o valor no campo que escolher
            setError,
            formState: {errors}, //Ele salva os erros dos campos
        } = useForm<RegisterStudentSchema>({
            resolver: zodResolver(registerStudentSchema), //Utiliza o schema do zod para validar os dados
            defaultValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                studentLanguageGoal: [],
            }
    });

    const handleAddLanguage = () => {

        const ids = languageGoals.handleAdd(languages);

        if(ids){
            setValue("studentLanguageGoal", ids);
        }

    }

    const handleRemoveLanguage = (id: string) => {

        const ids = languageGoals.handleRemove(id);

        setValue("studentLanguageGoal", ids);

    }

    const onSubmit = async (data: RegisterStudentSchema) => {
        await handleRegisterStudent(data, setError)
    }

    return(

        <div className="min-h-screen pt-16.5 lg:pt-18 overflow-hidden flex">
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="flex-1 flex items-center p-10 md:p-20 md:w-1/2 bg-violet-700">
                    <div className="text-white">
                        <h2 className="text-2xl md:text-3xl mb-2 font-semibold">Crie sua conta gratuita</h2>
                        <p className="text-sm">Explore novos idiomas, conecte-se com culturas e amplie suas oportunidades.</p>  
                    </div>
                </div>
                <div className="flex-1 p-10 md:p-20">
                    <h2 className="text-xl font-bold text-center mb-5">Inscreva-se no Speakly</h2>
                    {errors.root && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.root.message}</span>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-4">
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Nome:</label>
                                <input 
                                    type="text"
                                    placeholder="Nome"
                                    {...register("name")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.name && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.name.message}</span>}
                             </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">E-mail</label>
                                <input 
                                    type="email"
                                    placeholder="E-mail"
                                    {...register("email")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.email && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.email.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Senha</label>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    {...register("password")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.password && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.password.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-neutral-800/90">Confirme a senha</label>
                                <input
                                    type="password"
                                    placeholder="Confirmar senha"
                                    {...register("confirmPassword")}
                                    className="mt-2 w-full rounded-lg px-2 py-1 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:border-violet-700 transition-colors duration-300"
                                />
                                {errors.confirmPassword && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.confirmPassword.message}</span>}
                            </div>
                            <div className="mb-10">
                                <label className="font-semibold text-neutral-800/90">Idiomas que quer aprender</label>
                                <div className="mt-2 flex gap-2">
                                    <select
                                        value={languageGoals.selectedLanguageId}
                                        onChange={(e)=>languageGoals.setSelectedLanguageId(e.target.value)}
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
                                        onClick={handleAddLanguage}
                                        className="bg-violet-700 text-white px-3 rounded-lg"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                                {errors.studentLanguageGoal && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.studentLanguageGoal.message}</span>}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {languageGoals.selectedLanguages.map((language)=>(                                       
                                        <div 
                                            key={language.id} 
                                            className="flex items-center gap-2 px-3 py-1 rounded-full text-neutral-700 border border-violet-700"
                                        >
                                            <span>{language.name}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveLanguage(language.id)} 
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
                        <p className="text-neutral-600 text-sm">Já tem uma conta ? <Link href={""} className="text-violet-500 hover:underline">Entrar</Link></p>
                    </div>     
                </div>
            </div>
        </div>

    )

}