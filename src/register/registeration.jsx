import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default role

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { name, email, role, password };
    localStorage.setItem("currentUser", JSON.stringify(user)); // Store user in localStorage
    alert("Registration successful! Redirecting to homepage.");
    window.location.href = "/"; // Redirect to home
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-600 hover:text-orange-500">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </a>
          <h1 className="text-xl font-semibold text-gray-800">GHRCEM Learning</h1>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-center">Create Your Account</h2>

        <form onSubmit={handleRegister} className="mx-auto max-w-2xl">
          <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg mb-4" onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email Address" required className="w-full p-3 border rounded-lg mb-4" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full p-3 border rounded-lg mb-4" onChange={(e) => setPassword(e.target.value)} />

          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border rounded-lg mb-4">
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>

          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}