
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Edit, Trash2, CheckCircle } from "lucide-react"

export default function QuizPage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [quizzes, setQuizzes] = useState([])
  const [userScores, setUserScores] = useState([])
  const [activeTab, setActiveTab] = useState("available")

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      navigate("/login")
    }

    // Get quizzes from localStorage
    const storedQuizzes = localStorage.getItem("quizzes")
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes))
    }

    // Get user scores from localStorage
    const storedScores = localStorage.getItem("quizScores")
    if (storedScores) {
      setUserScores(JSON.parse(storedScores))
    }
  }, [navigate])

  const deleteQuiz = (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId)
      localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes))
      setQuizzes(updatedQuizzes)
    }
  }

  const getUserScore = (quizId) => {
    if (!currentUser) return null

    const score = userScores.find((score) => score.quizId === quizId && score.userEmail === currentUser.email)

    return score
  }

  const hasAttemptedQuiz = (quizId) => {
    return getUserScore(quizId) !== undefined
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center text-gray-600 hover:text-orange-500">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </button>
        </div>

        <h2 className="mb-8 text-3xl font-bold text-center">Quizzes</h2>

        {/* Teacher's Quiz Creation Button */}
        {currentUser && currentUser.role === "Teacher" && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => navigate("/create-quiz")}
              className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              <Plus className="mr-2 h-5 w-5" /> Create New Quiz
            </button>
          </div>
        )}

        {/* Tabs for students */}
        {currentUser && currentUser.role === "Student" && (
          <div className="mb-6 border-b">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("available")}
                className={`pb-2 px-1 ${
                  activeTab === "available"
                    ? "border-b-2 border-orange-500 text-orange-500 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Available Quizzes
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`pb-2 px-1 ${
                  activeTab === "completed"
                    ? "border-b-2 border-orange-500 text-orange-500 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Completed Quizzes
              </button>
            </div>
          </div>
        )}

        {/* Quiz List */}
        <div className="space-y-6">
          {quizzes.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">
                {currentUser && currentUser.role === "Teacher"
                  ? "You haven't created any quizzes yet. Create your first quiz!"
                  : "No quizzes available at the moment. Check back later!"}
              </p>
            </div>
          ) : (
            <>
              {currentUser && currentUser.role === "Teacher"
                ? // Teacher view - all quizzes with edit/delete options
                  quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{quiz.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">{quiz.questions.length} questions</p>
                          <p className="text-gray-700">{quiz.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button onClick={() => deleteQuiz(quiz.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : // Student view - filtered by tab
                  quizzes
                    .filter((quiz) => {
                      if (activeTab === "available") {
                        return !hasAttemptedQuiz(quiz.id)
                      } else {
                        return hasAttemptedQuiz(quiz.id)
                      }
                    })
                    .map((quiz) => {
                      const score = getUserScore(quiz.id)

                      return (
                        <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold">{quiz.title}</h3>
                              <p className="text-sm text-gray-500 mb-2">{quiz.questions.length} questions</p>
                              <p className="text-gray-700 mb-4">{quiz.description}</p>

                              {score && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                  <p className="font-medium">
                                    Your Score: {score.score}/{quiz.questions.length}(
                                    {Math.round((score.score / quiz.questions.length) * 100)}%)
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Completed on {new Date(score.completedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>

                            <div>
                              {score ? (
                                <div className="flex items-center text-green-500">
                                  <CheckCircle className="h-5 w-5 mr-1" />
                                  <span className="text-sm font-medium">Completed</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => navigate(`/take-quiz/${quiz.id}`)}
                                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                >
                                  Take Quiz
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
