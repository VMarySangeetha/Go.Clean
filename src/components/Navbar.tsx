import { useState } from "react";
import logo from "@/assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {

  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

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

            <NavLink to="/" className="hover:text-green-400">
              HOME
            </NavLink>

            <NavLink to="/recycling" className="hover:text-green-400">
              RECYCLING
            </NavLink>

            <NavLink to="/report" className="hover:text-green-400">
              REPORT
            </NavLink>

            <NavLink to="/about" className="hover:text-green-400">
              ABOUT
            </NavLink>

            {user && (
              <NavLink to="/my-reports" className="hover:text-green-400">
                MY REPORTS
              </NavLink>
            )}

            {/* USER LOGIN STATUS */}
            {user ? (

              <div className="flex items-center gap-4">

                <span className="text-green-400">
                  Welcome {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-[#1f3b57]"
                >
                  LOGOUT
                </button>

              </div>

            ) : (

              <>
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
              </>

            )}

          </div>


          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={()=>setOpen(!open)}
          >
            {open ? <X size={26}/> : <Menu size={26}/>}
          </button>

        </div>

      </div>


      {/* MOBILE DROPDOWN */}
      {open && (

        <div className="md:hidden bg-[#1f3b57] text-white px-6 py-4 space-y-4">

          <NavLink
            to="/about"
            onClick={()=>setOpen(false)}
            className="block"
          >
            ABOUT
          </NavLink>

          {user && (
            <NavLink
              to="/my-reports"
              onClick={()=>setOpen(false)}
              className="block"
            >
              MY REPORTS
            </NavLink>
          )}

          {user ? (

            <button
              onClick={()=>{
                handleLogout();
                setOpen(false);
              }}
              className="block text-left w-full"
            >
              LOGOUT
            </button>

          ) : (

            <>
              <NavLink
                to="/login"
                onClick={()=>setOpen(false)}
                className="block"
              >
                LOGIN
              </NavLink>

              <NavLink
                to="/signup"
                onClick={()=>setOpen(false)}
                className="block"
              >
                SIGNUP
              </NavLink>
            </>

          )}

        </div>

      )}

    </nav>

  );

};

export default Navbar;