import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import PYQCard from '../components/PYQCard'
import PYQFilter from '../components/PYQFilter'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useQuestions } from '../context/QuestionContext'
import { authService } from '../utils/authService'
import { filterQuestions } from '../utils/questionService'

const PYQLibrary = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { questions: allQuestions, subjects: allSubjects, chapters: allChapters, loading } = useQuestions()

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

  const [filters, setFilters] = useState({})

  const branches = ['CSE', 'IT', 'ECE', 'EE', 'ME', 'CE']
  const years = [1, 2, 3, 4]
  const semesters = [1, 2]

  // Filter questions based on selected filters
  const filteredQuestions = useMemo(() => {
    return filterQuestions(allQuestions, filters);
  }, [allQuestions, filters]);

  // Filter subjects based on branch/year/sem
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
    // Find the subject ID first if needed, or filter chapters by subject name if populated
    // Assuming chapters have populated subject or we match by name
    return allChapters
      .filter(c => c.subject?.name === filters.subject)
      .map(c => c.name);
  }, [allChapters, filters.subject]);

  const handleViewSolution = (questionId) => {
    navigate(`/pyq/${questionId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Modern Header */}
      <Header 
        user={user}
        subtitle="PYQ Library"
        searchPlaceholder="Search questions by topic, keyword..."
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
              showExamSession={true}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-96">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-500 font-medium mt-6 animate-pulse">Loading your questions...</p>
              </div>
            ) : filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredQuestions.map((question) => (
                  <PYQCard
                    key={question._id}
                    question={question}
                    onViewDetails={handleViewSolution}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-gray-200 border-dashed p-8 text-center">
                <div className="bg-blue-50 p-6 rounded-full mb-6">
                  <FileText className="text-blue-400" size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-500 max-w-md mb-8">
                  We couldn't find any questions matching your current filters. Try adjusting your search or clearing some filters.
                </p>
                <button 
                  onClick={() => setFilters({})}
                  className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
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

export default PYQLibrary
