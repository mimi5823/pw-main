import Image from 'next/image'

const courses = [
  { name: 'Intro to Algorithmic Trading', level: 'Basic', difficulty: 1 },
  { name: 'Market Making Strategies', level: 'Intermediate', difficulty: 2 },
  { name: 'Directional Strategies', level: 'Intermediate', difficulty: 3 },
  { name: 'Cross Exchange Market Making', level: 'Advanced', difficulty: 4 },
];

const features = [
  {
    icon: 'https://ext.same-assets.com/1232453280/538812354.svg',
    title: '12+ LIVE SESSIONS',
    description: 'Dive deep into market theory, technical implementation, and deployment strategies with expert instructors',
  },
  {
    icon: 'https://ext.same-assets.com/1232453280/4031047187.svg',
    title: 'BUILD YOUR ALGO',
    description: 'Design, build, and deploy your own custom algorithmic trading strategy from concept to live execution',
  },
  {
    icon: 'https://ext.same-assets.com/1232453280/1877744345.svg',
    title: 'HANDS-ON COACHING',
    description: 'Get personalized help during office hours to troubleshoot your code and optimize your trading strategies',
  },
  {
    icon: 'https://ext.same-assets.com/1232453280/2833895142.svg',
    title: 'GET CERTIFIED',
    description: 'Present your strategy on Demo Day and earn official recognition as a certified Hummingbot market maker',
  },
];

export default function AccelerateCareerSection() {
  return (
    <section className="py-16 md:py-20 bg-black text-white relative overflow-hidden">
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-repeat opacity-15"></div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 gradient-text">
          ACCELERATE YOUR TRADING CAREER
        </h2>
        <p className="text-base md:text-lg text-gray-400 text-center mb-10">
          From zero to professional market maker in just 4 intense weeks
        </p>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10 text-sm md:text-base">
          Your cohort enrollment includes all four premium{' '}
          <a href="https://courses.botcamp.xyz/slides/all" className="text-primary hover:text-primary/80 transition-colors duration-300">
            Botcamp courses
          </a>{' '}
          an $800 value with over 20 hours of expert instruction from basic to advanced trading concepts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <div
              key={course.name}
              className="bg-black backdrop-blur-sm border border-gray-800 p-5 rounded-md flex flex-col items-center text-center hover:bg-gray-800/40 transition-all duration-300 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-primary mb-1.5">{course.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{course.level}</p>
              <div className="mt-auto">
                <Image 
                  src={`/difficulty-${course.difficulty}.svg`} 
                  alt={`Difficulty level ${course.difficulty}`} 
                  width={60} 
                  height={20} 
                  className="mt-2"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center group">
              <div className="relative w-12 h-12 mb-3 transition-transform duration-300 group-hover:scale-110">
                <Image src={feature.icon} alt={feature.title} layout="fill" objectFit="contain" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-1.5">{feature.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Diagonal transition to next section */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image 
          src="/diagonal-transition.svg" 
          alt="Diagonal transition" 
          width={1440} 
          height={100}
          className="w-full h-auto"
        />
      </div>
    </section>
  )
}
