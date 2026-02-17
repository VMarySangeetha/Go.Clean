import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1f3b57] text-white py-3 px-4 text-sm">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <div className="flex items-center gap-2">
      <Leaf className="w-5 h-5 text-green-400" />
      <span className="font-semibold">GO.CLEAN</span>
    </div>

    <p className="text-xs opacity-80">
      © 2026 GO.CLEAN · Clean community, healthy future
    </p>

    <span className="text-xs opacity-80">Punjab, India</span>
  </div>
</footer>

  );
};

export default Footer;
