import heroEnvironment from '@/assets/hero-environment.jpg';

const RecyclingIdeas = () => {

  const openVideo = (type: string) => {
    let url = "";

    if (type === "solid") {
      url = "https://www.youtube.com/results?search_query=solid+waste+management+recycling+process";
    } 
    else if (type === "organic") {
      url = "https://www.youtube.com/results?search_query=organic+waste+composting+at+home";
    } 
    else if (type === "hazardous") {
      url = "https://www.youtube.com/results?search_query=hazardous+waste+disposal+and+ewaste+management";
    }

    window.open(url, "_blank");
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${heroEnvironment})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-3xl text-white">

        {/* TITLE PILL */}
        <div className="mb-12">
          <div className="inline-block bg-green-600 px-10 py-3 rounded-full text-lg md:text-xl font-semibold shadow-lg">
            RECYCLING IDEAS
          </div>
        </div>

        {/* 3 GREEN CATEGORY BUTTONS */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          
          <button
            onClick={() => openVideo("solid")}
            className="bg-green-800 hover:bg-green-900 px-8 py-4 rounded-xl text-white font-semibold w-64 shadow-lg"
          >
            SOLID WASTE
          </button>

          <button
            onClick={() => openVideo("organic")}
            className="bg-green-800 hover:bg-green-900 px-8 py-4 rounded-xl text-white font-semibold w-64 shadow-lg"
          >
            ORGANIC WASTE
          </button>

          <button
            onClick={() => openVideo("hazardous")}
            className="bg-green-800 hover:bg-green-900 px-8 py-4 rounded-xl text-white font-semibold w-64 shadow-lg"
          >
            LIQUID & HAZARDOUS WASTE
          </button>

        </div>

        {/* FOOTER QUOTE */}
        <p className="mt-14 text-sm md:text-base opacity-90">
          "When we keep our surroundings clean, we protect not just nature, but our future."
        </p>
      </div>
    </section>
  );
};

export default RecyclingIdeas;
