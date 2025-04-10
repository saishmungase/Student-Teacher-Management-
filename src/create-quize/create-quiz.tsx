" "

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'

export default function CreateQuiz() {
  const navigate = useNavigate()
  const { quizId } = useParams()
  const [currentUser, setCurrentUser] = useState(null)
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    questions: [
      {
        id: Date.now(),
        text: "",
        options: [
          { id: Date.now() + 1, text: "", isCorrect: false },
          { id: Date.now() + 2, text: "", isCorrect: false },
          { id: Date.now() + 3, text: "", isCorrect: false },
          { id: Date.now() + 4, text: "", isCorrect: false },
        ],
      },
    ],
  })
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Check if user is logged in and is a teacher
    const user = localStorage.getItem("currentUser")
    if (user) {
      const parsedUser = JSON.parse(user)
      setCurrentUser(parsedUser)
      if (parsedUser.role !== "Teacher") {
        navigate("/")
      }
    } else {
      navigate("/login")
    }

    // If quizId is provided, load the quiz data for editing
    if (quizId) {
      const storedQuizzes = localStorage.getItem("quizzes")
      if (storedQuizzes) {
        const quizzes = JSON.parse(storedQuizzes)
        const quizToEdit = quizzes.find((quiz) => quiz.id === Number.parseInt(quizId))
        if (quizToEdit) {
          setQuizData(quizToEdit)
          setIsEditing(true)
        } else {
          navigate("/quiz")
        }
      }
    }
  }, [navigate, quizId])

  const handleQuizDataChange = (e) => {
    const { name, value } = e.target
    setQuizData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuestionChange = (questionId, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id === questionId) {
          return { ...question, [field]: value }
        }
        return question
      }),
    }))
  }

  const handleOptionChange = (questionId, optionId, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, [field]: value }
              }
              return option
            }),
          }
        }
        return question
      }),
    }))
  }

  const setCorrectOption = (questionId, optionId) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.map((option) => ({
              ...option,
              isCorrect: option.id === optionId,
            })),
          }
        }
        return question
      }),
    }))
  }

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: "",
      options: [
        { id: Date.now() + 1, text: "", isCorrect: false },
        { id: Date.now() + 2, text: "", isCorrect: false },
        { id: Date.now() + 3, text: "", isCorrect: false },
        { id: Date.now() + 4, text: "", isCorrect: false },
      ],
    }

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const removeQuestion = (questionId) => {
    if (quizData.questions.length <= 1) {
      setError("Quiz must have at least one question")
      return
    }

    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== questionId),
    }))
    setError("")
  }

  const validateQuiz = () => {
    // Check if title and description are provided
    if (!quizData.title.trim() || !quizData.description.trim()) {
      setError("Quiz title and description are required")
      return false
    }

    // Check each question
    for (const question of quizData.questions) {
      if (!question.text.trim()) {
        setError("All questions must have text")
        return false
      }

      // Check if at least one option is marked as correct
      const hasCorrectOption = question.options.some((option) => option.isCorrect)
      if (!hasCorrectOption) {
        setError("Each question must have a correct answer selected")
        return false
      }

      // Check if all options have text
      for (const option of question.options) {
        if (!option.text.trim()) {
          setError("All options must have text")
          return false
        }
      }
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateQuiz()) {
      return
    }

    // Get existing quizzes
    const storedQuizzes = localStorage.getItem("quizzes")
    let quizzes = storedQuizzes ? JSON.parse(storedQuizzes) : []

    if (isEditing) {
      // Update existing quiz
      quizzes = quizzes.map((quiz) => {
        if (quiz.id === Number.parseInt(quizId)) {
          return { ...quizData, updatedAt: new Date().toISOString() }
        }
        return quiz
      })
    } else {
      // Add new quiz
      const newQuiz = {
        ...quizData,
        id: Date.now(),
        createdBy: currentUser.email,
        creatorName: currentUser.name,
        createdAt: new Date().toISOString(),
      }
      quizzes.push(newQuiz)
    }

    localStorage.setItem("quizzes", JSON.stringify(quizzes))
    navigate("/quiz")
  }

  if (!currentUser) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate("/quiz")} className="flex items-center text-gray-600 hover:text-orange-500">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Quizzes
          </button>
        </div>

        <h2 className="mb-8 text-3xl font-bold text-center">{isEditing ? "Edit Quiz" : "Create New Quiz"}</h2>

        {error && <div className="mb-6 bg-red-100 p-4 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Quiz Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
                <input
                  type="text"
                  name="title"
                  value={quizData.title}
                  onChange={handleQuizDataChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter quiz title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={quizData.description}
                  onChange={handleQuizDataChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter quiz description"
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center text-orange-500 hover:text-orange-600"
              >
                <Plus className="h-5 w-5 mr-1" /> Add Question
              </button>
            </div>

            {quizData.questions.map((question, qIndex) => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Question {qIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your question"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                    {question.options.map((option, oIndex) => (
                      <div key={option.id} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={option.isCorrect}
                          onChange={() => setCorrectOption(question.id, option.id)}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(question.id, option.id, "text", e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder={`Option ${oIndex + 1}`}
                        />
                      </div>
                    ))}
                    <p className="text-sm text-gray-500">Select the radio button next to the correct answer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              <Save className="mr-2 h-5 w-5" /> {isEditing ? "Update Quiz" : "Save Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

