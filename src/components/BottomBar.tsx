import { Home, Camera, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-green-400" : "text-white";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#1f3b57] shadow-2xl md:hidden z-50">
      <div className="flex justify-around items-center h-16 relative">

        {/* HOME */}
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center ${isActive("/")}`}
        >
          <Home size={24} />
        </button>

        {/* CENTER CAMERA */}
        <button
          onClick={() => navigate("/camera")}
          className="absolute -top-6 bg-green-500 p-4 rounded-full shadow-xl border-4 border-[#1f3b57]"
        >
          <Camera size={26} className="text-white" />
        </button>

        {/* REPORT */}
        <button
          onClick={() => navigate("/report")}
          className={`flex flex-col items-center ${isActive("/report")}`}
        >
          <FileText size={24} />
        </button>

      </div>
    </div>
  );
};

export default BottomBar;
