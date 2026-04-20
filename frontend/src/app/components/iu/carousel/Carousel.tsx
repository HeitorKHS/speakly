'use client'

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface CarouselProps {
  children: React.ReactNode;
}

export function Carousel({children}: CarouselProps){

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 3500 })]
    );

    return(

        <div className="mt-16 relative">
            <button
                className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 rounded-full cursor-pointer"
                onClick={() => emblaApi?.scrollPrev()}
            >
                <BiChevronLeft size={30}/>
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                {children}
                </div>
            </div>

            <button
                className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 rounded-full cursor-pointer"
                onClick={() => emblaApi?.scrollNext()}
            >
                <BiChevronRight size={30}/>
            </button>
        </div>
        
    )

}