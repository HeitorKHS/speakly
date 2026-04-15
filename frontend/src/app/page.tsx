import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";

export default function Home(){

  return (

    <div className="min-h-screen">
      <Hero/>
      <HowItWorks/>
    </div>
    
  );

}
