import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Features } from "./components/landing/Features";

export default function Home(){

  return (

    <div className="min-h-screen">
      <Hero/>
      <HowItWorks/>
      <Features/>
    </div>
    
  );

}
