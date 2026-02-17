import { Button } from '@/components/ui/button';
import heroEnvironment from '@/assets/hero-environment.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${heroEnvironment})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-3xl text-white">

        {/* QUOTE */}
        <h1 className="text-2xl md:text-5xl font-semibold leading-snug mb-6">
          “Cleanliness is not a duty imposed by law,
          <br />
          but a responsibility owed to society.”
        </h1>

        {/* WEB OF LIFE BUTTON STYLE TITLE */}
        <div className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg md:text-xl font-medium shadow-lg mb-6">
          The Web of Life
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm md:text-base opacity-90 mb-10">
          Cleanliness is essential for maintaining a healthy and sustainable environment.
          Proper waste disposal reduces diseases and improves quality of life.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/recycling')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full"
          >
            RECYCLING IDEAS
          </Button>

          <Button
            onClick={() => navigate('/report')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full"
          >
            REPORT
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
