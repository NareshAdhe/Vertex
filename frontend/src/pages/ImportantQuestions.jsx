import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Download, Loader, AlertCircle, FileText, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import PYQCard from '../components/PYQCard'
import PYQFilter from '../components/PYQFilter'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useQuestions } from '../context/QuestionContext'
import { authService } from '../utils/authService'
import { filterQuestions } from '../utils/questionService'

const ImportantQuestions = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { questions: allQuestions, subjects: allSubjects, chapters: allChapters, loading } = useQuestions()

  const [filters, setFilters] = useState({})

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

  const branches = ['CSE', 'IT', 'ECE', 'EE', 'ME', 'CE']
  const years = [1, 2, 3, 4]
  const semesters = [1, 2]

  // Filter important questions
  const filteredQuestions = useMemo(() => {
    const importantQuestions = allQuestions.filter(q => q.isImportant);
    return filterQuestions(importantQuestions, filters);
  }, [allQuestions, filters]);

  const filteredSubjects = useMemo(() => {
    let relevant = allSubjects;
    if (filters.branch) relevant = relevant.filter(s => s.branch === filters.branch);
    if (filters.year) relevant = relevant.filter(s => s.year === parseInt(filters.year));
    if (filters.semester) relevant = relevant.filter(s => s.semester === parseInt(filters.semester));
    return relevant.map(s => s.name);
  }, [allSubjects, filters.branch, filters.year, filters.semester]);

  // Filter chapters based on subject
  const filteredChapters = useMemo(() => {
    if (!filters.subject) return [];
    return allChapters
      .filter(c => c.subject?.name === filters.subject)
      .map(c => c.name);
  }, [allChapters, filters.subject]);

  const handleViewSolution = (questionId) => {
    navigate(`/pyq/${questionId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <Header 
        user={user}
        subtitle="Important Questions"
        searchPlaceholder="Search important questions..."
        onSearchChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        onLogout={handleLogout}
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors font-medium group w-fit"
        >
          <div className="p-1 rounded-full group-hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} />
          </div>
          Back to Dashboard
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-72 shrink-0">
            <PYQFilter 
              filters={filters} 
              setFilters={setFilters}
              branches={branches}
              years={years}
              semesters={semesters}
              subjects={filteredSubjects}
              chapters={filteredChapters}
              loading={loading}
              showExamSession={true}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader className="animate-spin text-amber-600 mb-4" size={32} />
                <p className="text-gray-500">Loading important questions...</p>
              </div>
            ) : filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredQuestions.map((question) => (
                  <PYQCard
                    key={question._id}
                    question={question}
                    onViewDetails={handleViewSolution}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-gray-200 border-dashed">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <Star className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No important questions found</h3>
                <p className="text-gray-500 text-center max-w-sm">
                  Try adjusting your filters to find more questions.
                </p>
                <button 
                  onClick={() => setFilters({})}
                  className="mt-4 text-amber-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportantQuestions
