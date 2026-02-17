import heroEnvironment from '@/assets/hero-environment.jpg';

const About = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${heroEnvironment})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-white w-full max-w-3xl">

        {/* TITLE */}
        <div className="mb-12">
          <div className="inline-block bg-green-600 px-10 py-3 rounded-full text-lg font-semibold shadow-lg">
            ABOUT US
          </div>
        </div>

        {/* 3 GREEN BLOCKS */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">

          <div className="bg-green-700 hover:bg-green-800 px-8 py-6 rounded-xl w-72 shadow-lg">
            <h3 className="font-bold text-lg mb-2">01</h3>
            <p className="font-semibold">What we work on</p>
          </div>

          <div className="bg-green-700 hover:bg-green-800 px-8 py-6 rounded-xl w-72 shadow-lg">
            <h3 className="font-bold text-lg mb-2">02</h3>
            <p className="font-semibold">How we work</p>
          </div>

          <div className="bg-green-700 hover:bg-green-800 px-8 py-6 rounded-xl w-72 shadow-lg">
            <h3 className="font-bold text-lg mb-2">03</h3>
            <p className="font-semibold">Progress Status</p>
          </div>

        </div>

        {/* FOOTER LINE */}
        <p className="mt-14 text-sm opacity-90">
          "Together, small actions create a big environmental impact."
        </p>
      </div>
    </section>
  );
};

export default About;
