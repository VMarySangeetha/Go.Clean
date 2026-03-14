import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

import heroEnvironment from "@/assets/hero-environment.jpg";
import heroGreenCity from "@/assets/hero-green-city.jpg";
import heroOcean from "@/assets/hero-ocean.jpg";

const images = [
  heroEnvironment,
  heroGreenCity,
  heroOcean
];

const Hero = () => {

  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  // Background slider
  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (

    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Background Images */}
      {images.map((img, index) => (

        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />

      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CENTER CONTENT */}
      <div className="relative z-10 max-w-3xl text-white">

        {/* MAIN QUOTE */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">

          Cleanliness is not a duty imposed by law,<br />
          but a responsibility owed to society.

        </h1>

        {/* SUB TEXT */}
        <p className="text-lg md:text-xl italic opacity-90">
          Every small action today creates a cleaner tomorrow.
        </p>

      </div>


      {/* BOTTOM BUTTONS */}
      <div className="absolute bottom-16 z-10 flex flex-col sm:flex-row gap-6">

        <Button
          onClick={() => navigate("/recycling")}
          className="w-56 h-14 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg"
        >
          Recycling Ideas
        </Button>

        <Button
          onClick={() => navigate("/report")}
          className="w-56 h-14 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg"
        >
          Report
        </Button>

      </div>


      {/* FLOATING CAMERA BUTTON (BOTTOM RIGHT) */}
      <button
  onClick={() => navigate("/scan")}
  className="fixed bottom-8 right-8 z-20 bg-white hover:bg-gray-100 text-black p-4 rounded-full shadow-xl transition transform hover:scale-110"
>
  <Camera size={28} />
</button>

    </section>

  );

};

export default Hero;