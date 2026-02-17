import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Upload, AlertCircle, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ReportDumping = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const [binId, setBinId] = useState("");
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    const id = searchParams.get("binId");
    if (id) setBinId(id);
  }, [searchParams]);

  // 📍 AUTO GPS LOCATION
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation(`https://maps.google.com/?q=${lat},${lng}`);
        },
        () => {
          setLocation("Location access denied. Enter manually.");
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Report Submitted Successfully!",
      description: `Report recorded for Dustbin ${binId || "Manual Entry"}.`,
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setBinId("");
    setLocation("Fetching location...");
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <div className="w-full max-w-3xl">

        {/* CAMERA → DATA FLOW */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="bg-green-700 text-white px-6 py-2 rounded-lg shadow">
            Camera
          </div>
          <span className="text-2xl font-bold text-white">→</span>
          <div className="bg-green-700 text-white px-6 py-2 rounded-lg shadow">
            Data
          </div>
        </div>

        {/* WHITE FORM CARD */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Report Issue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* BIN ID */}
            <div>
              <Label className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Dustbin Serial
              </Label>
              <Input value={binId} readOnly className="bg-gray-100" />
            </div>

            {/* ISSUE */}
            <div>
              <Label>Issue</Label>
              <Input placeholder="Enter issue" required />
            </div>

            {/* ADDRESS / GPS */}
            <div>
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address (Auto GPS)
              </Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* CONTACT */}
            <div>
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Number
              </Label>
              <Input type="tel" placeholder="Phone number" required />
            </div>

            {/* SUGGESTION */}
            <div>
              <Label>Suggestions</Label>
              <Textarea rows={3} required />
            </div>

            {/* PHOTO */}
            <div>
              <Label className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo / Video
              </Label>
              <Input type="file" multiple />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-lg rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white mt-6 text-sm">
          "True development begins with a clean and conscious community."
        </p>
      </div>
    </section>
  );
};

export default ReportDumping;
