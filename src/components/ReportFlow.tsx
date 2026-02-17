import { useNavigate } from 'react-router-dom';
import heroEnvironment from '@/assets/hero-environment.jpg';
import { Button } from '@/components/ui/button';

const ReportFlow = () => {
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

      <div className="relative z-10 text-white w-full max-w-md">

        {/* REPORT TITLE */}
        <div className="mb-10">
          <div className="inline-block bg-green-600 px-10 py-3 rounded-full text-lg font-semibold shadow-lg">
            REPORT
          </div>
        </div>

        {/* CAMERA → DATA FLOW */}
        <div className="flex flex-col items-center gap-6">

          <Button
            onClick={() => navigate('/camera')}
            className="bg-green-800 hover:bg-green-900 text-white px-10 py-4 rounded-xl text-lg shadow-lg w-56"
          >
            CAMERA
          </Button>

          <span className="text-3xl font-bold">↓</span>

          <Button
            onClick={() => navigate('/report-dumping')}
            className="bg-green-800 hover:bg-green-900 text-white px-10 py-4 rounded-xl text-lg shadow-lg w-56"
          >
            DATA
          </Button>
        </div>

        {/* FOOTER QUOTE */}
        <p className="mt-14 text-sm opacity-90">
          "Waste ignored today becomes a crisis tomorrow."
        </p>
      </div>
    </section>
  );
};

export default ReportFlow;
