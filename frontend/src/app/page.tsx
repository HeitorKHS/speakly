import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Features } from "./components/landing/Features";
import { Languages } from "./components/landing/Languages";
import { Testimonial } from "./components/landing/Testimonial";

export default function Home(){

  return (

    <div className="min-h-screen">
      <Hero/>
      <HowItWorks/>
      <Features/>
      <Languages/>
      <Testimonial/>
    </div>
    
  );

}
