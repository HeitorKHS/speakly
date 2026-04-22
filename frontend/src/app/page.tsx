import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Features } from "../components/landing/Features";
import { Languages } from "../components/landing/Languages";
import { Testimonial } from "../components/landing/Testimonial";
import { Faq } from "../components/landing/Faq";
import { Download } from "../components/landing/Download";

export default function Home(){

  return (

    <div>
      <Hero/>
      <HowItWorks/>
      <Features/>
      <Languages/>
      <Testimonial/>
      <Faq/>
      <Download/>
    </div>
    
  );

}
