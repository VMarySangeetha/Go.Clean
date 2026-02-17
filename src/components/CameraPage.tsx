import { useNavigate } from 'react-router-dom';
import heroEnvironment from '@/assets/hero-environment.jpg';

const CameraPage = () => {
  const navigate = useNavigate();

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

      <div className="relative z-10 text-white">

        {/* TITLE */}
        <div className="mb-12">
          <div className="inline-block bg-green-600 px-10 py-3 rounded-full text-lg font-semibold shadow-lg">
            CAMERA
          </div>
        </div>

        {/* ICON OPTIONS */}
        <div className="flex gap-16 justify-center items-center">

          {/* CLICK PICTURE */}
          <div
            onClick={() => navigate('/report-dumping')}
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="bg-white p-6 rounded-full shadow-lg mb-3">
              📷
            </div>
            <p className="font-semibold">CLICK PICTURE</p>
          </div>

          {/* UPLOAD PICTURE */}
          <div
            onClick={() => navigate('/report-dumping')}
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="bg-white p-6 rounded-full shadow-lg mb-3">
              🖼️
            </div>
            <p className="font-semibold">UPLOAD PICTURE</p>
          </div>
        </div>

        <p className="mt-14 text-sm opacity-90">
          "A small report today prevents a big problem tomorrow."
        </p>
      </div>
    </section>
  );
};

export default CameraPage;
