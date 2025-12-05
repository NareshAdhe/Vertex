import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Check, Share2, Loader, AlertCircle, BookOpen, Award, Calendar, BarChart3, Search, Bell, Settings, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import { fetchQuestionById } from '../utils/questionService'
import { Logo } from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { authService } from '../utils/authService'

const QuestionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      toast.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  useEffect(() => {
    loadQuestion()
  }, [id])

  const loadQuestion = async () => {
    try {
      setLoading(true)
      const data = await fetchQuestionById(id)
      setQuestion(data)
    } catch (error) {
      toast.error('Failed to load question')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyQuestion = () => {
    navigator.clipboard.writeText(question.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('Question copied to clipboard')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PYQ Question',
        text: question.text,
        url: window.location.href,
      })
    } else {
      toast.success('Link copied to clipboard')
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader size={40} className="text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Loading question...</p>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-md mx-4">
          <AlertCircle size={40} className="text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Question Not Found</h3>
          <p className="text-gray-500 mb-6">The question you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/pyq')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to PYQ Library
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Modern Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
                <Logo size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Vertex
                </h1>
                <p className="text-xs text-gray-500">Question Details</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.branch} • Year {user?.year}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white font-semibold shadow-md">
                  {user?.name?.charAt(0)}
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 rounded-xl transition-colors text-red-600"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors font-medium group"
        >
          <div className="p-1 rounded-full group-hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} />
          </div>
          Back to Library
        </button>
        {/* Question Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 md:p-8">
            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {question.questionType?.toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1)}
              </span>
              {question.isImportant && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Award size={14} /> Important
                </span>
              )}
            </div>

            {/* Question Text */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
              {question.text}
            </h2>

            {/* Context Info */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Subject:</span>
                {question.subject}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Chapter:</span>
                {question.chapter}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Topic:</span>
                {question.topic}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleCopyQuestion}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Award size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Marks</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{question.marks}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Calendar size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Year</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{question.examYear}</p>
            <p className="text-xs text-gray-500">{question.examSession}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <BarChart3 size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Frequency</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{question.frequency} times</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <BookOpen size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Branch</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{question.branch}</p>
            <p className="text-xs text-gray-500">Sem {question.semester}</p>
          </div>
        </div>

        {/* Solution Section (Placeholder) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Solution</h3>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>
          
          {showSolution ? (
            <div className="p-6 bg-gray-50">
              <div className="prose max-w-none text-gray-800">
                <p>This is a placeholder for the solution. In a real application, the detailed solution would be rendered here, potentially including mathematical equations, diagrams, and code snippets.</p>
                <p className="mt-4">For now, this demonstrates the UI layout for the solution section.</p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-gray-50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h4 className="text-gray-900 font-medium mb-1">Solution Hidden</h4>
              <p className="text-gray-500 text-sm mb-4">Click the button above to reveal the solution.</p>
              <button
                onClick={() => setShowSolution(true)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                Reveal Solution
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionDetail
