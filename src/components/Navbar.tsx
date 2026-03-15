import logo from "@/assets/logo.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1f3b57]/90 backdrop-blur-md shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-14 text-white">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="GO CLEAN" className="h-8 w-auto" />
            <span className="text-lg md:text-xl font-bold tracking-wide">
              GO.CLEAN
            </span>
          </NavLink>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

            <NavLink
              to="/"
              className="hover:text-green-400 transition"
            >
              HOME
            </NavLink>

            <NavLink
              to="/recycling"
              className="hover:text-green-400 transition"
            >
              RECYCLING
            </NavLink>

            <NavLink
              to="/report"
              className="hover:text-green-400 transition"
            >
              REPORT
            </NavLink>

            <NavLink
              to="/about"
              className="hover:text-green-400 transition"
            >
              ABOUT
            </NavLink>

            <NavLink
              to="/login"
              className="bg-green-600 px-4 py-1 rounded-full hover:bg-green-700"
            >
              LOGIN
            </NavLink>

            <NavLink
              to="/signup"
              className="border border-white px-4 py-1 rounded-full hover:bg-white hover:text-[#1f3b57]"
            >
              SIGNUP
            </NavLink>

          </div>

          {/* MOBILE MENU (ONLY ABOUT + LOGIN + SIGNUP) */}
          <div className="flex md:hidden items-center gap-4 text-sm font-semibold">

            <NavLink
              to="/about"
              className="hover:text-green-400"
            >
              ABOUT
            </NavLink>

            <NavLink
              to="/login"
              className="hover:text-green-400"
            >
              LOGIN
            </NavLink>

            <NavLink
              to="/signup"
              className="hover:text-green-400"
            >
              SIGNUP
            </NavLink>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;