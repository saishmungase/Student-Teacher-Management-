import { useState } from "react"
import { Mail, Lock, ArrowLeft } from "lucide-react"
import { Navigate } from "react-router-dom"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((user) => user.email === formData.email && user.password === formData.password)

    if (!user) {
      setError("Invalid email or password")
      return
    }

    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(user))
    Navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-600 transition-colors hover:text-orange-500">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </a>
          <div className="flex items-center">
            <span className="mr-2 text-3xl">🎓</span>
            <h1 className="text-xl font-semibold text-gray-800">GHRCEM Learning</h1>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>

        {error && <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="mb-2 flex items-center font-medium">
              <Mail className="mr-2 h-5 w-5" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-gray-300 p-3 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="flex items-center font-medium">
                <Lock className="mr-2 h-5 w-5" /> Password
              </label>
              <a href="#" className="text-sm text-orange-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 p-3 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-600 hover:shadow-lg"
          >
            Sign In
          </button>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-orange-500 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

