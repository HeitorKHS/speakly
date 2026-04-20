import Link from "next/link";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export function Download(){

    return(

        <section className="bg-violet-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative text-white flex flex-col md:flex-row justify-between overflow-hidden">
                    <div className="text-white flex flex-col justify-center items-center md:items-start gap-4 py-4">
                        <p className="text-3xl font-bold">Speakly disponível para Android e iOS</p>
                        <div className="text-sm flex gap-3">
                            <Link href={""} className="inline-flex gap-2 items-center justify-center font-semibold bg-black px-3 py-2 rounded-lg">
                                <FaApple size={20}/>
                                Apple Store
                            </Link>
                            <Link href={""} className="inline-flex gap-2 items-center justify-center font-semibold bg-black px-3 py-2 rounded-lg">
                                <FaGooglePlay size={20}/>
                                Google Play
                            </Link>
                        </div>
                    </div>
                    <Image
                        src={"/img/download_mobile.png"}
                        alt={"Download"}
                        width={300}
                        height={300}
                        className="hidden md:block translate-y-15"
                    />
                </div>
            </div>
        </section>

    )

}