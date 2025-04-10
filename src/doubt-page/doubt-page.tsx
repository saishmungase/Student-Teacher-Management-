" "

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Send, MessageCircle } from 'lucide-react'

export default function DoubtsPage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [doubts, setDoubts] = useState([])
  const [newDoubt, setNewDoubt] = useState({ title: "", description: "" })
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      navigate("/login")
    }

    // Get doubts from localStorage
    const storedDoubts = localStorage.getItem("doubts")
    if (storedDoubts) {
      setDoubts(JSON.parse(storedDoubts))
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewDoubt((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newDoubt.title || !newDoubt.description) {
      setError("Please fill in all required fields")
      return
    }

    if (!currentUser) {
      setError("You must be logged in to post a doubt")
      return
    }

    const newDoubtObj = {
      id: Date.now(), // Just for unique identification of the doubt
      title: newDoubt.title,
      description: newDoubt.description,
      postedBy: {
        email: currentUser.email,
        name: currentUser.name,
        role: currentUser.role,
      },
      postedAt: new Date().toISOString(),
      replies: [],
      resolved: false,
    }

    const updatedDoubts = [...doubts, newDoubtObj]
    localStorage.setItem("doubts", JSON.stringify(updatedDoubts))
    setDoubts(updatedDoubts)
    setNewDoubt({ title: "", description: "" })
    setError("")
  }

  const handleReply = (doubtId, replyText) => {
    if (!replyText.trim()) return

    const updatedDoubts = doubts.map((doubt) => {
      if (doubt.id === doubtId) {
        const newReply = {
          id: Date.now(), // Just for unique identification of the reply
          text: replyText,
          postedBy: {
            email: currentUser.email,
            name: currentUser.name,
            role: currentUser.role,
          },
          postedAt: new Date().toISOString(),
        }
        return {
          ...doubt,
          replies: [...doubt.replies, newReply],
        }
      }
      return doubt
    })

    localStorage.setItem("doubts", JSON.stringify(updatedDoubts))
    setDoubts(updatedDoubts)
  }

  const markAsResolved = (doubtId) => {
    const updatedDoubts = doubts.map((doubt) => {
      if (doubt.id === doubtId) {
        return {
          ...doubt,
          resolved: true,
        }
      }
      return doubt
    })

    localStorage.setItem("doubts", JSON.stringify(updatedDoubts))
    setDoubts(updatedDoubts)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center text-gray-600 hover:text-orange-500">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </button>
        </div>

        <h2 className="mb-8 text-3xl font-bold text-center">Student Doubts Forum</h2>

        {error && <div className="mb-6 bg-red-100 p-4 text-red-700 rounded-lg">{error}</div>}

        {/* Post a new doubt section */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Post Your Doubt</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newDoubt.title}
              onChange={handleChange}
              placeholder="Title of your doubt"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              name="description"
              value={newDoubt.description}
              onChange={handleChange}
              placeholder="Describe your doubt in detail..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition"
            >
              <MessageCircle className="inline-block mr-2 h-5 w-5" /> Post Doubt
            </button>
          </form>
        </div>

        {/* List of doubts */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Recent Doubts</h3>

          {doubts.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">No doubts have been posted yet. Be the first to ask a question!</p>
            </div>
          ) : (
            doubts.map((doubt) => (
              <DoubtCard
                key={doubt.id}
                doubt={doubt}
                currentUser={currentUser}
                onReply={handleReply}
                onResolve={markAsResolved}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function DoubtCard({ doubt, currentUser, onReply, onResolve }) {
  const [replyText, setReplyText] = useState("")
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleSubmitReply = (e) => {
    e.preventDefault()
    if (replyText.trim()) {
      onReply(doubt.id, replyText)
      setReplyText("")
      setShowReplyForm(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Check if current user is the one who posted the doubt or is a teacher
  const canResolve = currentUser && 
    (currentUser.email === doubt.postedBy.email || currentUser.role === "Teacher")

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${doubt.resolved ? "border-l-4 border-green-500" : ""}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-semibold">{doubt.title}</h4>
          <p className="text-sm text-gray-500">
            Posted by {doubt.postedBy.name} ({doubt.postedBy.role}) on {formatDate(doubt.postedAt)}
          </p>
        </div>
        {doubt.resolved && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Resolved</span>
        )}
      </div>

      <p className="mb-6 text-gray-700">{doubt.description}</p>

      {/* Replies section */}
      {doubt.replies.length > 0 && (
        <div className="mb-6 border-t pt-4">
          <h5 className="font-medium mb-3">Replies:</h5>
          <div className="space-y-4">
            {doubt.replies.map((reply) => (
              <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium">
                    {reply.postedBy.name}
                    {reply.postedBy.role === "Teacher" && (
                      <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Teacher
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(reply.postedAt)}</p>
                </div>
                <p className="mt-2 text-gray-700">{reply.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply and resolve actions */}
      <div className="flex flex-wrap gap-3">
        {!doubt.resolved && (
          <>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-orange-500 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition"
            >
              Reply
            </button>

            {canResolve && (
              <button
                onClick={() => onResolve(doubt.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Mark as Resolved
              </button>
            )}
          </>
        )}
      </div>

      {/* Reply form */}
      {showReplyForm && !doubt.resolved && (
        <form onSubmit={handleSubmitReply} className="mt-4 space-y-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              <Send className="inline-block mr-2 h-4 w-4" /> Send Reply
            </button>
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

