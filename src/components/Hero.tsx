import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import langData from "@/lang"; // ✅ ADDED

import heroEnvironment from "@/assets/hero-environmentt.jpg";
//import heroGreenCity from "@/assets/hero-green-city.jpeg";
//import heroOcean from "@/assets/hero-ocean.webp";

//import gar from "@/assets/gar.webp";
//import sar from "@/assets/sar.jpeg";
import few from "@/assets/new.jpg";
import hhh from "@/assets/hhh.jpg";
import abc from "@/assets/abc.jpg";
//import five from "@/assets/5.jpg";
import six from "@/assets/6.jpg";
import seven from "@/assets/7.jpg";
import eight from "@/assets/8.jpg";
import nine from "@/assets/9.jpg";

const images = [
  heroEnvironment,
  //heroGreenCity,
  //heroOcean,
  //gar,
  //sar,
  few,
  hhh,
  abc,
  //five,
  six,
  seven,
  eight,
  nine
];

const Hero = () => {

  const navigate = useNavigate();

  // ✅ LANGUAGE SETUP
  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      {/* Background Images */}
      {images.map((img, index) => (

        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? "opacity-80" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />

      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* TEXT CONTENT */}
      <div className="relative z-10 max-w-3xl text-white">

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight mb-6">

          {t.heroTitle.split(",")[0]},<br />
          {t.heroTitle.split(",")[1]}

        </h1>

        <p className="text-sm sm:text-base md:text-lg italic opacity-90 mb-12">
          {t.heroSubtitle}
        </p>

      </div>


      {/* BOTTOM BUTTONS */}
      <div className="absolute bottom-32 sm:bottom-20 z-10 flex flex-col sm:flex-row gap-4 sm:gap-6">

        <Button
          onClick={() => navigate("/recycling")}
          className="w-48 sm:w-56 h-12 sm:h-14 bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg rounded-full shadow-lg"
        >
          {t.recycleBtn}
        </Button>

        <Button
          onClick={() => navigate("/report")}
          className="w-48 sm:w-56 h-12 sm:h-14 bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg rounded-full shadow-lg"
        >
          {t.reportBtn}
        </Button>

      </div>


      {/* CAMERA BUTTON (DESKTOP ONLY) */}
      <button
        onClick={() => navigate("/scan")}
        className="hidden md:block fixed bottom-8 right-8 z-20 bg-white hover:bg-gray-100 text-black p-4 rounded-full shadow-xl transition transform hover:scale-110"
      >
        <Camera size={28} />
      </button>

    </section>

  );

};

export default Hero;