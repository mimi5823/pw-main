import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CallToActionSection() {
  return (
    <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-15"></div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/3 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
          Ready to transform your trading skills?
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join Botcamp Cohort 12 and learn professional market making.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="bg-primary text-black hover:bg-yellow-400 w-full sm:w-auto px-8 py-3 text-base font-semibold">
            <Link href="https://courses.botcamp.xyz/event/botcamp-cohort-12-12/register">Enroll Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto px-8 py-3 text-base font-semibold">
            <Link href="https://t.me/botcampcohorts">Chat in Telegram</Link>
          </Button>
        </div>
      </div>
      
      {/* Wave pattern for transition to next section */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image 
          src="/wave-pattern.svg" 
          alt="Wave transition" 
          width={1440} 
          height={120}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
