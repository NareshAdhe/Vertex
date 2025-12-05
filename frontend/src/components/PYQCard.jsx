import { BookOpen, Award, BarChart3, Calendar, Clock, School, ArrowRight } from 'lucide-react'

const PYQCard = ({ question, onViewDetails }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'hard':
        return 'bg-rose-50 text-rose-700 border-rose-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'mcq':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'numerical':
        return 'bg-violet-50 text-violet-700 border-violet-200'
      case 'theory':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getAccentColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-500'
      case 'medium':
        return 'bg-amber-500'
      case 'hard':
        return 'bg-rose-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      {/* Top Accent Line */}
      <div className={`h-1 w-full ${getAccentColor(question.difficulty)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="p-6 flex flex-col grow">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getTypeColor(question.questionType)}`}>
              {question.questionType?.toUpperCase()}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {question.frequency > 1 && (
              <span className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                <Clock size={12} />
                Asked {question.frequency} times
              </span>
            )}
            {question.isImportant && (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                <Award size={12} />
                Important
              </span>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6 grow">
          <h3 className="text-lg font-medium text-gray-900 leading-relaxed line-clamp-3 group-hover:text-blue-700 transition-colors">
            {question.text}
          </h3>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-blue-700" />
            <span className="truncate font-medium text-gray-700">{question.subject}</span>
          </div>
          <div className="flex items-center gap-2">
            <School size={14} className="text-purple-500" />
            <span className="truncate">{question.year}{question.year === 1 ? 'st' : question.year === 2 ? 'nd' : question.year === 3 ? 'rd' : 'th'} Year</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-green-500" />
            <span>{question.examSession} {question.examYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 size={14} className="text-orange-500" />
            <span>{question.marks} Marks</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100">
          <div className="text-xs text-gray-400 font-medium">
            {question.branch} • Sem {question.semester}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(question._id)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow group-hover:translate-x-1 cursor-pointer"
            >
              View Details
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PYQCard