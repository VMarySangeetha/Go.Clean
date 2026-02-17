import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomBar from "./components/BottomBar";

import NotFound from "./pages/NotFound";

// Existing
import BinQRGenerator from "./components/BinQRGenerator";
import ReportDumping from "./components/ReportDumping";

// New UI Pages
import Hero from "./components/Hero";
import RecyclingIdeas from "./components/RecyclingIdeas";
import ReportFlow from "./components/ReportFlow";
import CameraPage from "./components/CameraPage";
import About from "./components/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* NAVBAR on all pages */}
        <Navbar />

        {/* Add bottom padding so content isn't hidden behind BottomBar */}
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Hero />} />

            {/* RECYCLING */}
            <Route path="/recycling" element={<RecyclingIdeas />} />

            {/* REPORT FLOW */}
            <Route path="/report" element={<ReportFlow />} />

            {/* CAMERA */}
            <Route path="/camera" element={<CameraPage />} />

            {/* REPORT FORM (QR redirect) */}
            <Route path="/report-dumping" element={<ReportDumping />} />

            {/* ABOUT */}
            <Route path="/about" element={<About />} />

            {/* QR GENERATOR */}
            <Route path="/generate-qr" element={<BinQRGenerator />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* FOOTER */}
          <Footer />
        </div>

        {/* MOBILE BOTTOM BAR */}
        <BottomBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
