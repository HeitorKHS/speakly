import { Carousel } from "../iu/carousel/Carousel";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

const testimonials = [
    {name: "Testimonial 1", comment: "Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial.", language: "Japonês", raiting: 5},
    {name: "Testimonial 2", comment: "Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial.", language: "Espanhol", raiting: 5},
    {name: "Testimonial 3", comment: "Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial.", language: "Italiano", raiting: 5},
    {name: "Testimonial 4", comment: "Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial.", language: "Português", raiting: 5},
    {name: "Testimonial 5", comment: "Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial Testimonial.", language: "Inglês", raiting: 5},
];

export function Testimonial(){

    return(

        <section className="py-22">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold text-violet-700 uppercase mb-3">Depoimentos</p>
                    <h2 className="text-3xl sm:text-4xl font-bold">O que dizem nossos usuários</h2>
                </div>
                <Carousel>
                    {testimonials.map((testimonial)=>(
                        <div key={testimonial.name} className="flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_40%] px-4">
                            <div className="p-6 border border-neutral-300 shadow-2xl rounded-2xl">
                                <div className="flex gap-4">
                                    <div className="relative w-full max-w-20 aspect-square rounded-2xl overflow-hidden">
                                        <Image
                                            src={"/img/testimonial.jpg"}
                                            alt="Testimonial"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="my-auto">
                                        <p className="lg:text-lg font-semibold text-neutral-800">{testimonial.name}</p>
                                        <span className="text-sm text-neutral-400 font-semibold">{testimonial.language}</span>
                                        <div className="flex gap-1 text-yellow-400">
                                            {Array.from({ length: testimonial.raiting }).map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-5">
                                    {testimonial.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>

    )

}