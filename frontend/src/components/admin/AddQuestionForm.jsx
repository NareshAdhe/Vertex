import { useState } from 'react';
import { useQuestions } from '../../context/QuestionContext';
import { createQuestion } from '../../utils/questionService';
import { Upload, Layers, FileText, Tag, Save, Image as ImageIcon, PenTool, FileType, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const AddQuestionForm = () => {
  const { subjects, chapters, refreshQuestions } = useQuestions();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('manual'); // 'manual', 'image', 'pdf'
  
  const [formData, setFormData] = useState({
    text: '',
    examYear: new Date().getFullYear(),
    questionType: 'theory',
    subject: '',
    chapter: '',
    marks: 5,
    difficulty: 'medium',
    branch: 'CSE',
    year: 1,
    semester: 1,
    isPYQ: false,
    isImportant: false,
    examSession: 'End Sem',
    solution: '',
    tags: ''
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const branches = ['CSE', 'IT', 'ECE', 'EE', 'ME', 'CE'];
  const years = [1, 2, 3, 4];
  const semesters = [1, 2];
  const questionTypes = ['theory', 'mcq', 'numerical'];
  const difficulties = ['easy', 'medium', 'hard'];
  const examSessions = ['Mid Sem', 'End Sem', 'Re Exam'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      if (file) {
        data.append('file', file);
      }

      await createQuestion(data);
      toast.success('Question created successfully!');
      refreshQuestions(); // Refresh context data
      
      // Reset form
      setFormData({
        text: '',
        examYear: new Date().getFullYear(),
        questionType: 'theory',
        subject: '',
        chapter: '',
        marks: 5,
        difficulty: 'medium',
        branch: 'CSE',
        year: 1,
        semester: 1,
        isPYQ: false,
        isImportant: false,
        examSession: 'End Sem',
        solution: '',
        tags: ''
      });
      setFile(null);
      setPreviewUrl(null);
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  const handleExtractionSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    setLoading(true);
    // TODO: Implement AI Extraction Logic here
    // This will eventually call an endpoint like /api/questions/extract
    setTimeout(() => {
      toast.success(`File uploaded! AI extraction for ${activeTab} mode coming soon.`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Layers className="text-blue-600" size={20} />
          Add New Question
        </h2>
        <p className="text-sm text-gray-500 mt-1">Add a single question or upload papers for bulk extraction</p>
      
        {/* Tabs */}
        <div className="flex gap-2 mt-6 p-1 bg-gray-50 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'manual' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <PenTool size={16} />
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'image' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ImageIcon size={16} />
            Image Upload
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'pdf' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FileType size={16} />
            PDF Upload
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'manual' ? (
          <form onSubmit={handleManualSubmit} className="space-y-6">
            {/* ... Existing Manual Form Fields ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject & Chapter Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(sub => (
                      <option key={sub._id} value={sub._id}>{sub.name} ({sub.code})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
                  <select
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Chapter</option>
                    {chapters
                      .filter(ch => !formData.subject || ch.subject._id === formData.subject)
                      .map(ch => (
                        <option key={ch._id} value={ch._id}>{ch.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="questionType"
                      value={formData.questionType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {questionTypes.map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                    <input
                      type="number"
                      name="marks"
                      value={formData.marks}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exam Year</label>
                    <input
                      type="number"
                      name="examYear"
                      value={formData.examYear}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter the question here..."
              ></textarea>
            </div>

            {/* Solution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solution / Answer</label>
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the solution or answer key..."
              ></textarea>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                <select
                  name="examSession"
                  value={formData.examSession}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {examSessions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Tags & Flags */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="important, calculus, 2023..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPYQ"
                    checked={formData.isPYQ}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Is PYQ?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isImportant"
                    checked={formData.isImportant}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Mark Important</span>
                </label>
              </div>
            </div>

            {/* File Upload (Manual Mode - Optional Attachment) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (Optional Image/PDF)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="manual-file-upload"
                  accept="image/*,application/pdf"
                />
                <label htmlFor="manual-file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="text-gray-400" size={32} />
                  <span className="text-sm text-gray-500">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </span>
                </label>
              </div>
              {previewUrl && (
                <div className="mt-4">
                  <img src={previewUrl} alt="Preview" className="h-32 rounded-lg border border-gray-200" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={20} />
                  Save Question
                </>
              )}
            </button>
          </form>
        ) : (
          /* AI Extraction Forms (Image & PDF) */
          <form onSubmit={handleExtractionSubmit} className="space-y-6 py-8">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {activeTab === 'image' ? <ImageIcon className="text-blue-600" size={32} /> : <FileType className="text-blue-600" size={32} />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Upload {activeTab === 'image' ? 'Question Paper Image' : 'Question Paper PDF'}
              </h3>
              <p className="text-gray-500 mb-8">
                Our AI will analyze the {activeTab} and automatically extract questions, options, and metadata.
              </p>

              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-10 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept={activeTab === 'image' ? "image/*" : "application/pdf"}
                  required
                />
                <div className="flex flex-col items-center gap-3">
                  <Upload className="text-blue-500" size={40} />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {activeTab === 'image' ? 'PNG, JPG, JPEG up to 10MB' : 'PDF up to 20MB'}
                    </p>
                  </div>
                </div>
              </div>

              {previewUrl && activeTab === 'image' && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-2 text-left">Preview:</p>
                  <img src={previewUrl} alt="Preview" className="w-full rounded-xl border border-gray-200 shadow-sm" />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Extract Questions
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddQuestionForm;
