'use client'

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { BiError } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

export default function Login(){

    const { handleLogin } = useAuth();

    const {
        register, //Register cria no input o name, onChange, onBlur, ref
        handleSubmit, //event.preventDefault() e valida os dados com o zod
        setError,
        formState: {errors}, //Ele salva os erros dos campos
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: LoginSchema) => {
        await handleLogin(data, setError);
    }

    return(

        <div className="h-screen pt-16.5 lg:pt-18 overflow-hidden">
            <div className="flex flex-col justify-center h-full gap-5 max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-violet-700 text-4xl font-bold">Speakly</h2>
                    <p className="text-neutral-800 text-xl">Bem-vindo ao Speakly</p>
                </div>
                <div>
                    {errors.root && <span className="flex items-center gap-2 text-sm text-red-500"><BiError/>{errors.root.message}</span>}
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <button
                            type="submit"
                            className="py-2 w-full text-white font-semibold bg-neutral-800 hover:bg-neutral-700 rounded-md cursor-pointer transition-colors duration-300"
                        >
                            Entrar
                        </button>
                    </form>
                    <div className="mt-2 flex flex-col items-center">
                        <span>ou</span>
                        <Link 
                            href={"/"} 
                            className="mt-2 inline-flex justify-center items-center w-full py-1 gap-2 border border-neutral-300 rounded-md"
                        >
                            <FcGoogle/><span>Cotinue com Google</span>
                        </Link>
                        <Link 
                            href={"/"}
                            className="mt-2 inline-flex justify-center items-center w-full py-1 gap-2 border border-neutral-300 rounded-md"
                        >
                            <DiApple/><span>Continue com Apple</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-neutral-600 text-sm">Não tem uma conta ? <Link href={"/register/student"} className="text-violet-500 hover:underline">Criar</Link></p>
                </div>   
            </div>
        </div>

    )

}