import Link from 'next/link';

const stats = [
  { value: '$34 billion', label: 'Last 12M Reported Trade Volume' },
  { value: '50+', label: 'Official CEX and DEX Connectors' },
  { value: '15K+', label: 'Active Discord Members' },
];

export default function PoweredByHummingbotSection() {
  return (
    <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Dots pattern overlay */}
      <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-repeat opacity-15"></div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
          Powered by Hummingbot
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Hummingbot is an open source Python framework that helps you run automated trading strategies on any CEX and DEX
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-md border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:bg-gray-800/40 transition-all duration-300">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-6">
          <Link href="https://hummingbot.org" className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium">
            Website
          </Link>
          <Link href="https://github.com/hummingbot/hummingbot" className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium">
            Github
          </Link>
        </div>
      </div>
    </section>
  );
}
