import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, Phone, Upload, Hash, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ReportDumping = () => {

  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [binId, setBinId] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [issueType, setIssueType] = useState("");

  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  /* -------------------------------
     Get logged in user
  --------------------------------*/
  const user = JSON.parse(localStorage.getItem("user") || "null");


  /* -------------------------------
     Detect bin ID from QR
  --------------------------------*/
  useEffect(() => {
    const id = searchParams.get("binId");
    if (id) setBinId(id);
  }, [searchParams]);


  /* -------------------------------
     Detect GPS Location
  --------------------------------*/
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLocation(`https://maps.google.com/?q=${lat},${lng}`);

        },
        () => {
          setLocation("Location access denied.");
        }
      );

    }

  }, []);


  /* -------------------------------
     Handle Image Preview
  --------------------------------*/
  const handleFileChange = (e:any) => {

    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }

  };


  /* -------------------------------
     Submit Report
  --------------------------------*/
  const handleSubmit = async (e:any) => {

    e.preventDefault();

    if (!issueType) {
      toast({
        title: "Select issue type",
        description: "Please choose the problem type."
      });
      return;
    }

    setIsSubmitting(true);

    try {

      const formData = new FormData();

      formData.append("binId", binId);
      formData.append("issueType", issueType);
      formData.append("location", location);
      formData.append("phone", phone);
      formData.append("description", description);

      /* attach userId if logged in */
      if (user) {
        formData.append("userId", user._id);
      }

      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(
        "https://go-clean-8c5n.onrender.com/api/report",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();

      if (response.ok) {

        toast({
          title: "Report Submitted",
          description: "Thank you for helping keep the city clean!"
        });

        /* reset form */
        setPhone("");
        setDescription("");
        setIssueType("");
        setFile(null);
        setPreview("");

      } else {

        toast({
          title: "Submission Failed",
          description: result.message || "Something went wrong"
        });

      }

    } catch (error) {

      toast({
        title: "Server Error",
        description: "Unable to submit report"
      });

    }

    setIsSubmitting(false);

  };


  return (

    <section
      className="min-h-screen bg-cover bg-center flex items-start justify-center px-4 py-24"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')"
      }}
    >

      <div className="w-full max-w-xl">

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
            Report Waste Issue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* BIN ID */}
            <div>

              <Label className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4" />
                Dustbin ID
              </Label>

              <Input
                value={binId || "Manual Report"}
                readOnly
                className="bg-gray-100 h-11"
              />

            </div>


            {/* ISSUE TYPE */}
            <div>

              <Label className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4" />
                Issue Type
              </Label>

              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-green-600"
              >

                <option value="">Select Issue Type</option>
                <option value="Illegal Dumping">Illegal Dumping</option>
                <option value="Overflowing Bin">Overflowing Bin</option>
                <option value="Damaged Bin">Damaged Bin</option>

              </select>

            </div>


            {/* LOCATION */}
            <div>

              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                GPS Location
              </Label>

              <Input
                value={location}
                readOnly
                className="bg-gray-100 h-11"
              />

            </div>


            {/* PHONE */}
            <div>

              <Label className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4" />
                Contact Number
              </Label>

              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-11"
              />

            </div>


            {/* DESCRIPTION */}
            <div>

              <Label className="mb-2">
                Additional Details
              </Label>

              <Textarea
                rows={4}
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="text-sm"
              />

            </div>


            {/* IMAGE */}
            <div>

              <Label className="flex items-center gap-2 mb-2">
                <Upload className="w-4 h-4" />
                Upload Photo
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="h-11"
              />

              {/* preview */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-3 rounded-lg max-h-40 object-cover"
                />
              )}

            </div>


            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-base rounded-xl"
              disabled={isSubmitting}
            >

              {isSubmitting ? "Submitting..." : "Submit Report"}

            </Button>

          </form>

        </div>

      </div>

    </section>

  );

};

export default ReportDumping;