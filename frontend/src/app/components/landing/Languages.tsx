import Image from "next/image";
import Link from "next/link";

const languages = [
    {name: "Chinês", teachers: "2658", flag: "cn"},
	{name: "Espanhol", teachers: "2453", flag: "es"},
	{name: "Inglês", teachers: "3548", flag: "us"},
	{name: "Francês", teachers: "1578", flag: "fr"},
	{name: "Italiano", teachers: "972", flag: "it"},
	{name: "Português", teachers: "875", flag: "br"},
];

export function Languages(){

    return(

        <section className="py-22">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold text-violet-700 uppercase mb-3">Idiomas populares</p>
                    <h2 className="text-3xl sm:text-4xl font-bold">Mais de 50 idiomas disponíveis</h2>
                </div>
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {languages.map((language)=>(
                        <Link href={""} key={language.flag} className="flex gap-2">
                            <div className="relative h-9 w-12 shrink-0 my-auto rounded-lg overflow-hidden">
                                <Image
                                    src={`/flags/${language.flag}1.png`}
                                    alt={`Bandeira do pais ${language.flag}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-800">{language.name}</h3>
                                <p className="text-xs md:text-sm text-neutral-500 whitespace-nowrap">{language.teachers} Professores</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

    )

}