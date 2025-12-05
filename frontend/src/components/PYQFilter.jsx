import { X, Filter, ChevronDown } from 'lucide-react'

const PYQFilter = ({ filters, onFiltersChange, branches, years, semesters, subjects, chapters, showExamSession }) => {
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value || undefined }
    onFiltersChange(newFilters)
  }

  const handleReset = () => {
    onFiltersChange({})
  }

  const activeFilterCount = Object.values(filters).filter(v => v).length

  const SelectWrapper = ({ label, value, onChange, options, disabled, placeholder = "Select..." }) => (
    <div className="group">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300"
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" size={16} />
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-800">
          <Filter size={20} className="text-blue-600" />
          <h2 className="font-bold text-lg">Filters</h2>
        </div>
        {activeFilterCount > 0 && (
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
            {activeFilterCount} Active
          </span>
        )}
      </div>

      <div className="space-y-5">
        {/* Active Filters Reset */}
        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-all font-semibold group"
          >
            <X size={16} className="group-hover:rotate-90 transition-transform" />
            Clear All Filters
          </button>
        )}

        <SelectWrapper 
          label="Branch"
          value={filters.branch}
          onChange={(val) => handleFilterChange('branch', val)}
          options={branches}
          placeholder="All Branches"
        />

        <div className="grid grid-cols-2 gap-3">
          <SelectWrapper 
            label="Year"
            value={filters.year}
            onChange={(val) => handleFilterChange('year', val)}
            options={years.map(y => ({ value: y, label: `${y}${y === 1 ? 'st' : y === 2 ? 'nd' : y === 3 ? 'rd' : 'th'} Year` }))}
            placeholder="All"
          />
          <SelectWrapper 
            label="Semester"
            value={filters.semester}
            onChange={(val) => handleFilterChange('semester', val)}
            options={semesters.map(s => ({ value: s, label: `Sem ${s}` }))}
            placeholder="All"
          />
        </div>

        <SelectWrapper 
          label="Subject"
          value={filters.subject}
          onChange={(val) => handleFilterChange('subject', val)}
          options={subjects}
          disabled={subjects.length === 0}
          placeholder="All Subjects"
        />

        <SelectWrapper 
          label="Chapter"
          value={filters.chapter}
          onChange={(val) => handleFilterChange('chapter', val)}
          options={chapters}
          disabled={chapters.length === 0}
          placeholder="All Chapters"
        />

        <div className="pt-4 border-t border-gray-100 space-y-5">
          {showExamSession ? (
            <div className="grid grid-cols-2 gap-3">
              <SelectWrapper 
                label="Exam Session"
                value={filters.examSession}
                onChange={(val) => handleFilterChange('examSession', val)}
                options={[
                  { value: 'End Sem', label: 'End Sem' },
                  { value: 'Mid Sem', label: 'Mid Sem' },
                  { value: 'Re Exam', label: 'Re Exam' }
                ]}
                placeholder="All Exams"
              />
              <SelectWrapper 
                label="Question Type"
                value={filters.questionType}
                onChange={(val) => handleFilterChange('questionType', val)}
                options={[
                  { value: 'theory', label: 'Theory' },
                  { value: 'numerical', label: 'Numerical' },
                  { value: 'mcq', label: 'MCQ' }
                ]}
                placeholder="All Types"
              />
            </div>
          ) : (
            <SelectWrapper 
              label="Question Type"
              value={filters.questionType}
              onChange={(val) => handleFilterChange('questionType', val)}
              options={[
                { value: 'theory', label: 'Theory' },
                { value: 'numerical', label: 'Numerical' },
                { value: 'mcq', label: 'MCQ' }
              ]}
              placeholder="All Types"
            />
          )}

          <SelectWrapper 
            label="Difficulty"
            value={filters.difficulty}
            onChange={(val) => handleFilterChange('difficulty', val)}
            options={[
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' }
            ]}
            placeholder="All Difficulties"
          />
        </div>
      </div>
    </div>
  )
}

export default PYQFilter
