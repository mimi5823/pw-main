import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import AccelerateCareerSection from '@/components/accelerate-career';
import CohortScheduleSection from '@/components/cohort-schedule';
import CallToActionSection from '@/components/call-to-action';
import PoweredByHummingbotSection from '@/components/powered-by-hummingbot';

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center text-center px-4 pt-20 pb-16 md:pt-28 md:pb-24 relative overflow-hidden bg-black text-white">
        {/* Hero pattern overlay */}
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-repeat opacity-15"></div>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
        
        {/* Original decorative background */}
        <div className="absolute -top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-xl md:max-w-2xl lg:max-w-3xl z-0 opacity-10 pointer-events-none">
          <Image
            src="https://ext.same-assets.com/1232453280/402683122.svg"
            alt="Decorative background"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-primary font-semibold mb-3 text-base md:text-lg">Welcome to Pnyx Institute</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Shape the Future with <span className="gradient-text">Pnyx</span>
          </h1>
          <p className="max-w-xl lg:max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-8">
            Explore our cutting-edge programs starting <span className="text-primary">this Fall</span> and learn to build, innovate, and lead in the new digital era.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-6 py-3 text-sm font-semibold"
            >
              <Link href="#">Explore Programs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto px-6 py-3 text-sm font-semibold"
            >
              <Link href="#">Contact Us</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-8">
            Have questions? Our admissions team is here to help.
          </p>
          <Link
            href="#"
            className="text-primary hover:underline flex items-center justify-center text-sm"
          >
            Learn More About Pnyx
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
        
        {/* Wave transition to next section */}
        <div className="absolute bottom-0 left-0 w-full">
          <Image 
            src="/hero-wave.svg" 
            alt="Wave transition" 
            width={1440} 
            height={80}
            className="w-full h-auto"
          />
        </div>
      </main>
      <AccelerateCareerSection />
      <CohortScheduleSection />
      <CallToActionSection />
      <PoweredByHummingbotSection />
    </>
  );
}
