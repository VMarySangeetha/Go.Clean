import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroEnvironment from '@/assets/hero-environment.jpg';
import communityClear from '@/assets/community-clean.jpg';
import heroSegregation from '@/assets/hero-segregation.jpg';
import heroPlanet from '@/assets/hero-planet.jpg';
import heroOcean from '@/assets/hero-ocean.jpg';
import heroGreenCity from '@/assets/hero-green-city.jpg';
import heroZeroWaste from '@/assets/hero-zero-waste.jpg';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: heroEnvironment,
    title: 'BIN IT RIGHT, WIN THE FIGHT',
    subtitle: 'Together we can make our environment cleaner and healthier'
  },
  {
    image: heroSegregation,
    title: 'SORT IT OUT, SAVE THE EARTH',
    subtitle: 'Proper waste segregation starts with you - every item in the right bin matters'
  },
  {
    image: heroPlanet,
    title: 'ONE PLANET, ONE CHANCE',
    subtitle: 'Protect our home - reduce, reuse, recycle for a sustainable future'
  },
  {
    image: heroOcean,
    title: 'KEEP OUR OCEANS CLEAN',
    subtitle: 'Join the movement to prevent plastic pollution and protect marine life'
  },
  {
    image: heroGreenCity,
    title: 'GREEN CITIES, HEALTHY LIVES',
    subtitle: 'Building sustainable communities through responsible waste management'
  },
  {
    image: heroZeroWaste,
    title: 'ZERO WASTE, INFINITE IMPACT',
    subtitle: 'Small changes in daily habits create massive environmental benefits'
  },
  {
    image: communityClear,
    title: 'CLEAN COMMUNITY, BRIGHT FUTURE',
    subtitle: 'Report illegal dumping and help protect our planet'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
          </div>
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="max-w-4xl text-center animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground tracking-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
                  onClick={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Report Illegal Dumping
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="font-semibold px-8 py-6 text-lg"
                  onClick={() => document.getElementById('ideas')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn Recycling Tips
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 hover:bg-card transition-colors shadow-medium"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 hover:bg-card transition-colors shadow-medium"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-card/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
