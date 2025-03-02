import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function UploadMaterial() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "📄",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      if (parsedUser.role !== "Teacher") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file");
        setFile(null);
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !file) {
      setError("Please fill in all required fields and upload a PDF file");
      return;
    }

    if (!currentUser || currentUser.role !== "Teacher") {
      setError("Only teachers can upload materials");
      return;
    }

    setLoading(true);

    try {
      const base64 = await convertFileToBase64(file);
      const materials = JSON.parse(localStorage.getItem("materials") || "[]");
      const newMaterial = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        fileData: base64,
        uploadedBy: currentUser.id,
        uploadedAt: new Date().toISOString(),
      };

      materials.push(newMaterial);
      localStorage.setItem("materials", JSON.stringify(materials));
      navigate("/upload-material");
    } catch (err) {
      setError("Error uploading file. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  if (!currentUser) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-lg md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center text-gray-600 hover:text-orange-500">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </button>
        </div>

        <h2 className="mb-2 text-3xl font-bold text-center">Upload Learning Material</h2>

        {error && <div className="mb-6 bg-red-100 p-4 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter title"
          />
          
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter description"
          />
          
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Uploading..." : "Upload Material"}
          </button>
        </form>
      </div>
    </div>
  );
}