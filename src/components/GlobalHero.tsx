import { useEffect, useState } from "react";

import heroEnvironment from "@/assets/hero-environment.png";
import heroGreenCity from "@/assets/hero-green-city.jpeg";
import heroOcean from "@/assets/hero-ocean.webp";
import gar from "@/assets/gar.webp";
import sar from "@/assets/sar.jpeg";

const images = [
  heroEnvironment,
  heroGreenCity,
  heroOcean,
  gar,
  sar
];

const GlobalHero = ({ children }) => {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={images[currentImage]}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};

export default GlobalHero;