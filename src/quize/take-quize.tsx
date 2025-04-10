" "

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function TakeQuiz() {
  const navigate = useNavigate()
  const { quizId } = useParams()
  const [currentUser, setCurrentUser] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      navigate("/login")
      return
    }

    // Get quiz data
    if (quizId) {
      const storedQuizzes = localStorage.getItem("quizzes")
      if (storedQuizzes) {
        const quizzes = JSON.parse(storedQuizzes)
        const foundQuiz = quizzes.find((q) => q.id === Number.parseInt(quizId))

        if (foundQuiz) {
          setQuiz(foundQuiz)

          // Initialize answers object
          const initialAnswers = {}
          foundQuiz.questions.forEach((question) => {
            initialAnswers[question.id] = null
          })
          setAnswers(initialAnswers)
        } else {
          setError("Quiz not found")
        }
      }
    }

    setLoading(false)
  }, [navigate, quizId])

  const handleAnswerSelect = (questionId, optionId) => {
    if (submitted) return

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const calculateScore = () => {
    let correctAnswers = 0

    quiz.questions.forEach((question) => {
      const selectedOptionId = answers[question.id]
      if (selectedOptionId) {
        const selectedOption = question.options.find((option) => option.id === selectedOptionId)
        if (selectedOption && selectedOption.isCorrect) {
          correctAnswers++
        }
      }
    })

    return correctAnswers
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if all questions are answered
    const unansweredQuestions = Object.values(answers).filter((answer) => answer === null).length
    if (unansweredQuestions > 0) {
      setError(`Please answer all questions. ${unansweredQuestions} question(s) remaining.`)
      return
    }

    // Calculate score
    const userScore = calculateScore()
    setScore(userScore)

    // Save score to localStorage
    const quizScore = {
      userEmail: currentUser.email,
      userName: currentUser.name,
      quizId: Number.parseInt(quizId),
      score: userScore,
      totalQuestions: quiz.questions.length,
      completedAt: new Date().toISOString(),
    }

    const storedScores = localStorage.getItem("quizScores")
    const scores = storedScores ? JSON.parse(storedScores) : []
    scores.push(quizScore)
    localStorage.setItem("quizScores", JSON.stringify(scores))

    setSubmitted(true)
    setError("")
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-red-500">{error || "Quiz not found"}</p>
            <button
              onClick={() => navigate("/quiz")}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {!submitted && (
          <div className="mb-8 flex items-center justify-between">
            <button onClick={() => navigate("/quiz")} className="flex items-center text-gray-600 hover:text-orange-500">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Quizzes
            </button>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
          <p className="text-gray-600 mb-4">{quiz.description}</p>
          <p className="text-sm text-gray-500">Total Questions: {quiz.questions.length}</p>
        </div>

        {error && <div className="mb-6 bg-red-100 p-4 text-red-700 rounded-lg">{error}</div>}

        {submitted ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">Quiz Completed!</h3>
              <p className="text-gray-600 mt-2">
                Your Score: {score} out of {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}
                %)
              </p>
            </div>

            <div className="space-y-6 mt-8">
              {quiz.questions.map((question, index) => {
                const selectedOptionId = answers[question.id]
                const selectedOption = question.options.find((option) => option.id === selectedOptionId)
                const correctOption = question.options.find((option) => option.isCorrect)
                const isCorrect = selectedOption && selectedOption.isCorrect

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 rounded-full p-1 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          Question {index + 1}: {question.text}
                        </h4>
                        <div className="mt-2 space-y-2">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className={`p-2 rounded-lg ${
                                option.id === selectedOptionId
                                  ? option.isCorrect
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                  : option.isCorrect
                                    ? "bg-green-50 border border-green-200"
                                    : ""
                              }`}
                            >
                              {option.text}
                              {option.isCorrect && option.id !== selectedOptionId && (
                                <span className="ml-2 text-sm text-green-600">(Correct answer)</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/quiz")}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4">
                    Question {index + 1}: {question.text}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-lg cursor-pointer ${
                          answers[question.id] === option.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => handleAnswerSelect(question.id, option.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-5 w-5 rounded-full border ${
                              answers[question.id] === option.id ? "border-orange-500 bg-orange-500" : "border-gray-300"
                            }`}
                          >
                            {answers[question.id] === option.id && (
                              <div className="h-full w-full flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                              </div>
                            )}
                          </div>
                          <span>{option.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Submit Quiz
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
