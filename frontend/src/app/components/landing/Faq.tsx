'use client'

import { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

const faqs = [
    {question: "Posso trocar de professor se não gostar?", answer: "Sim! Você tem total liberdade para escolher e trocar de professor quando quiser. Recomendamos experimentar alguns professores antes de decidir com quem vai estudar regularmente."},
    {question: "Quais idiomas estão disponíveis na plataforma?", answer: "Temos mais de 50 idiomas disponíveis, incluindo os mais populares como Inglês, Espanhol, Francês, Alemão, Italiano, Japonês, Coreano, Mandarim, Russo e muito mais."},
    {question: "Como funciona o pagamento?", answer: "O pagamento é feito diretamente na plataforma de forma segura. Você compra créditos que são utilizados para agendar aulas. Aceitamos cartões de crédito, débito e PIX."},
    {question: "Os professores são certificados?", answer: "Todos os professores passam por um processo de verificação que inclui análise de certificações, entrevista em vídeo e avaliação de experiência. Temos tanto professores nativos quanto não-nativos com certificações reconhecidas internacionalmente."},
    {question: "O que acontece se eu precisar cancelar uma aula?", answer: "Você pode cancelar ou reagendar uma aula com até 24 horas de antecedência sem nenhuma cobrança. Cancelamentos com menos de 24 horas podem ter uma taxa dependendo da política do professor."},
];

export function Faq(){

    const [isOpen, setIsOpen] = useState<number | null>(null);

    const toogle = (index: number) => {
        setIsOpen(isOpen === index ? null : index);
    };

    return(

        <section className="py-18" id="Faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold text-violet-700 uppercase mb-3">Perguntas frequentes</p>
                    <h2 className="text-3xl sn:text-4xl font-bold uppercase">Faq</h2>
                </div>
                <div className="mt-16 flex flex-col gap-3">
                    {faqs.map((item, index)=>(
                        <div key={index} className="overflow-hidden">
                            <button
                                onClick={()=>toogle(index)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left gap-4 cursor-pointer"
                            >
                                <span className="font-semibold">{item.question}</span>
                                <div className="text-violet-700">
                                    {isOpen === index ? (
                                        <BiMinus/>
                                        ):(
                                        <BiPlus/>
                                        )
                                    }
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all ease-in-out duration-400
                                ${isOpen === index ? "opacity-100 mt-2 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
                                <p  className="px-6 pb-5 text-neutral-800/80">{item.answer}</p>
                            </div>   
                        
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )

}