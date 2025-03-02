
import { useEffect, useState } from "react"
import {
  Menu,
  Home,
  BookOpen,
  FileText,
  Phone,
  User,
  Edit,
  LogOut,
  Activity,
  Play,
  CheckCircle,
  MapPin,
  Mail
} from "lucide-react"


export default function GHRCEMLearning() {
  const [currentUser, setCurrentUser] = useState(null)
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user)) // Convert string back to object
    }

    // Get materials from localStorage
    const storedMaterials = localStorage.getItem("materials")
    if (storedMaterials) {
      setMaterials(JSON.parse(storedMaterials))
    } else {
      // Set default materials if none exist
      const defaultMaterials = [
        {
          id: 1,
          title: "DSA Fundamentals",
          description: "Comprehensive guide to data structures and algorithms with Java examples.",
          icon: "📕",
          path: "Notes/java programming dsa.pdf",
        },
        {
          id: 2,
          title: "Web Development Handbook",
          description: "Complete reference for HTML, CSS, JavaScript, and modern frameworks.",
          icon: "📘",
          path: "Notes/WEB APPLICATION DEVELOPMENT NOTES.pdf",
        },
        {
          id: 3,
          title: "Advanced Algorithms Guide",
          description: "In-depth exploration of complex algorithms with practical examples.",
          icon: "📗",
          path: "materials/advanced-algorithms.pdf",
        },
      ]
      localStorage.setItem("materials", JSON.stringify(defaultMaterials))
      setMaterials(defaultMaterials)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-5 py-4 shadow-md md:px-[5%]">
        <div className="flex items-center">
          <span className="mr-2 text-3xl">🎓</span>
          <h1 className="text-xl font-semibold text-gray-800">GHRCEM Learning</h1>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li>
              <a href="#" className="flex items-center font-medium text-gray-800 transition-colors hover:text-orange-500">
                <Home className="mr-2 h-5 w-5" /> Home
              </a>
            </li>
            <li>
              <a href="#courses" className="flex items-center font-medium text-gray-800 transition-colors hover:text-orange-500">
                <BookOpen className="mr-2 h-5 w-5" /> Courses
              </a>
            </li>
            <li>
              <a href="#materials" className="flex items-center font-medium text-gray-800 transition-colors hover:text-orange-500">
                <FileText className="mr-2 h-5 w-5" /> Materials
              </a>
            </li>
            <li>
              <a href="#contact" className="flex items-center font-medium text-gray-800 transition-colors hover:text-orange-500">
                <Phone className="mr-2 h-5 w-5" /> Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex md:gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="font-medium">{currentUser.name} ({currentUser.role})</span>
              <button onClick={handleLogout} className="flex items-center rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition-all hover:bg-gray-700">
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </button>
            </div>
          ) : (
            <>
              <a href="/login" className="flex items-center rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition-all hover:bg-gray-700">
                <User className="mr-2 h-5 w-5" /> Sign In
              </a>
              <a href="/register" className="flex items-center rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-all hover:bg-orange-600">
                <Edit className="mr-2 h-5 w-5" /> Register
              </a>
            </>
          )}
        </div>

        <button className="flex flex-col gap-[5px] md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="flex flex-col gap-12 bg-gradient-to-br from-gray-50 to-gray-200 px-5 py-20 md:px-[5%]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              <span className="text-orange-500">Unlock Your Potential</span> with GHRCEM Online Courses
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Discover a world of knowledge and enhance your skills with our expert-led courses designed for the modern
              learner.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#courses"
                className="flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:-translate-y-1"
              >
                <Activity className="mr-2 h-5 w-5" /> Explore Courses
              </a>
              <a
                href="#"
                className="flex items-center justify-center rounded-lg border-2 border-orange-500 px-6 py-3 font-medium text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:-translate-y-1"
              >
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="min-w-[150px] transform rounded-lg bg-white p-6 text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
              <span className="mb-2 block text-4xl">👨‍🎓</span>
              <h3 className="text-3xl font-semibold text-orange-500">10,000+</h3>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="min-w-[150px] transform rounded-lg bg-white p-6 text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
              <span className="mb-2 block text-4xl">🏆</span>
              <h3 className="text-3xl font-semibold text-orange-500">50+</h3>
              <p className="text-gray-600">Courses</p>
            </div>
            <div className="min-w-[150px] transform rounded-lg bg-white p-6 text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
              <span className="mb-2 block text-4xl">⭐</span>
              <h3 className="text-3xl font-semibold text-orange-500">4.8/5</h3>
              <p className="text-gray-600">Rating</p>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="bg-white px-5 py-20 md:px-[5%]">
          <div className="mb-12 text-center">
            <h2 className="mb-4 inline-block text-4xl font-bold">🔥 Featured Courses</h2>
            <p className="mx-auto max-w-2xl text-gray-600">Expand your knowledge with our most popular courses</p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative transform overflow-hidden rounded-lg bg-gray-50 p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Popular
              </div>
              <div className="mb-6 text-5xl">💻</div>
              <h3 className="mb-4 text-2xl font-semibold">Data Structures & Algorithms</h3>
              <div className="mb-4 flex gap-4 text-sm text-gray-600">
                <span className="flex items-center">⏱️ 12 Weeks</span>
                <span className="flex items-center">👨‍💻 Beginner</span>
              </div>
              <p className="mb-6 text-gray-600">
                Master the fundamentals of DSA with Java and boost your problem-solving skills.
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center font-semibold text-orange-500">⭐ 4.9</span>
                <a
                  href="https://www.apnacollege.in/course/alpha-plus-4"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600"
                >
                  Enroll Now
                </a>
              </div>
            </div>

            <div className="relative transform overflow-hidden rounded-lg bg-gray-50 p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                New
              </div>
              <div className="mb-6 text-5xl">🌐</div>
              <h3 className="mb-4 text-2xl font-semibold">Full-Stack Web Development</h3>
              <div className="mb-4 flex gap-4 text-sm text-gray-600">
                <span className="flex items-center">⏱️ 16 Weeks</span>
                <span className="flex items-center">👨‍💻 Intermediate</span>
              </div>
              <p className="mb-6 text-gray-600">
                Learn to build responsive, dynamic websites from front-end to back-end.
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center font-semibold text-orange-500">⭐ 4.8</span>
                <a
                  href="https://www.apnacollege.in/course/delta-6"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600"
                >
                  Enroll Now
                </a>
              </div>
            </div>

            <div className="transform overflow-hidden rounded-lg bg-gray-50 p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 text-5xl">🧠</div>
              <h3 className="mb-4 text-2xl font-semibold">Advanced Algorithms</h3>
              <div className="mb-4 flex gap-4 text-sm text-gray-600">
                <span className="flex items-center">⏱️ 10 Weeks</span>
                <span className="flex items-center">👨‍💻 Advanced</span>
              </div>
              <p className="mb-6 text-gray-600">Dive deep into complex algorithms and their real-world applications.</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center font-semibold text-orange-500">⭐ 4.7</span>
                <a
                  href="https://www.coursera.org/learn/algorithms-part2"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-gray-800 px-6 py-3 font-medium text-white transition-all hover:bg-gray-700"
            >
              View All Courses 👉
            </a>
          </div>
        </section>

        {/* Materials Section */}
        <section id="materials" className="bg-gray-50 px-5 py-20 md:px-[5%]">
          <div className="mb-12 text-center">
            <h2 className="mb-4 inline-block text-4xl font-bold">📚 Learning Resources</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Access high-quality study materials to support your learning journey
            </p>
          </div>

          {currentUser && currentUser.role === "Teacher" && (
            <div className="mb-10 mx-auto max-w-2xl">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Upload New Material</h3>
                <a
                  href="/upload-material"
                  className="inline-flex items-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-600"
                >
                  Upload PDF
                </a>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex transform flex-col items-center gap-6 rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl md:flex-row md:items-start"
              >
                <div className="text-5xl text-orange-500">{material.icon}</div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{material.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{material.description}</p>
                  {material.fileData ? (
                    <a
                      href={material.fileData}
                      download={`${material.title}.pdf`}
                      className="inline-flex items-center rounded-lg border-2 border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition-all hover:bg-orange-500 hover:text-white"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <a
                      href={material.path}
                      className="inline-flex items-center rounded-lg border-2 border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition-all hover:bg-orange-500 hover:text-white"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Section */}
        {!currentUser && (
          <section
            id="registration"
            className="bg-gradient-to-br from-gray-800 to-gray-900 px-5 py-20 text-white md:px-[5%]"
          >
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold">Join Our Learning Community</h2>
                <p className="mb-8 text-gray-300">
                  Register now to get access to exclusive courses, materials, and updates.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span>Access to all courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-8 text-gray-800">
                <h3 className="mb-6 text-2xl font-bold">Quick Registration</h3>
                <p className="mb-4">
                  Already have an account?{" "}
                  <a href="/login" className="text-orange-500 hover:underline">
                    Sign in here
                  </a>
                </p>
                <a
                  href="/register"
                  className="flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-600 hover:shadow-lg"
                >
                  <Activity className="mr-2 h-5 w-5" /> Register Now
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="bg-white px-5 py-20 md:px-[5%]">
          <div className="mb-12 text-center">
            <h2 className="mb-4 inline-block text-4xl font-bold">💬 Student Testimonials</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              See what our students have to say about their learning experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center gap-6 rounded-lg bg-gray-50 p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl md:flex-row">
              <div className="text-5xl">👨‍🎓</div>
              <div>
                <p className="mb-4 italic text-gray-700">
                  "The DSA course completely transformed my approach to problem-solving. The instructors are excellent!"
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-orange-500">Rahul Sharma</h4>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 rounded-lg bg-gray-50 p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl md:flex-row">
              <div className="text-5xl">👩‍🎓</div>
              <div>
                <p className="mb-4 italic text-gray-700">
                  "I landed my dream job after completing the Web Development course. The hands-on projects were
                  invaluable."
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-orange-500">Priya Patel</h4>
                  <p className="text-sm text-gray-600">Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="grid gap-12 px-5 py-16 md:grid-cols-2 md:px-[5%] lg:grid-cols-3">
          <div>
            <h3 className="relative mb-6 inline-block text-xl font-semibold after:absolute after:bottom-[-8px] after:left-0 after:h-1 after:w-10 after:bg-orange-500">
              🎓 GHRCEM Learning
            </h3>
            <p className="mb-6 text-gray-300">
              Empowering students with quality education and practical skills for the digital age.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-all hover:-translate-y-1 hover:bg-orange-500"
              >
                <span>📱</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-all hover:-translate-y-1 hover:bg-orange-500"
              >
                <span>💻</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-all hover:-translate-y-1 hover:bg-orange-500"
              >
                <span>📷</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-all hover:-translate-y-1 hover:bg-orange-500"
              >
                <span>📺</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="relative mb-6 inline-block text-xl font-semibold after:absolute after:bottom-[-8px] after:left-0 after:h-1 after:w-10 after:bg-orange-500">
              Quick as
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 transition-all hover:text-orange-500 hover:pl-1">
                  Home
                </a>
              </li>
              <li>
                <a href="#courses" className="text-gray-300 transition-all hover:text-orange-500 hover:pl-1">
                  Courses
                </a>
              </li>
              <li>
                <a href="#materials" className="text-gray-300 transition-all hover:text-orange-500 hover:pl-1">
                  Materials
                </a>
              </li>
              <li>
                <a href="#registration" className="text-gray-300 transition-all hover:text-orange-500 hover:pl-1">
                  Register
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="relative mb-6 inline-block text-xl font-semibold after:absolute after:bottom-[-8px] after:left-0 after:h-1 after:w-10 after:bg-orange-500">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-500" /> GHRCEM Campus, Pune
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-500" /> +91 1234567890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-500" /> info@ghrcem.edu.in
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 px-5 py-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 GHRCEM Online Learning Platform. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

