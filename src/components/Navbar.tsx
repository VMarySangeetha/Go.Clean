import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1f3b57]/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-7">
        <div className="flex items-center justify-between h-12 text-white">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Leaf className="w-7 h-7 text-green-400" />
            <span className="text-xl font-bold tracking-wide">GO.CLEAN</span>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => navigate('/')}
              className="hover:text-green-300 transition"
            >
              HOME
            </button>

            <button
              onClick={() => navigate('/recycling')}
              className="hover:text-green-300 transition"
            >
              RECYCLING
            </button>

            <button
              onClick={() => navigate('/report')}
              className="hover:text-green-300 transition"
            >
              REPORT
            </button>

            <button
              onClick={() => navigate('/about')}
              className="hover:text-green-300 transition"
            >
              ABOUT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
