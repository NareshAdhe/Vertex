import { useState } from 'react';
import { Bookmark, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuestions } from '../../context/QuestionContext';

const AddChapterForm = () => {
  const { subjects, refreshQuestions } = useQuestions();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: 1,
    subject: ''
  });

  const chapterNumbers = [1, 2, 3, 4, 5, 6];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
      await axios.post(`${BACKEND_URI}/api/questions/chapters`, formData, {
        withCredentials: true
      });
      toast.success('Chapter created successfully!');
      refreshQuestions(); // Refresh context to get new chapters if needed
      setFormData({
        name: '',
        number: 1,
        subject: ''
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create chapter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Bookmark className="text-blue-600" size={20} />
          Add New Chapter
        </h2>
        <p className="text-sm text-gray-500 mt-1">Add a chapter to an existing subject.</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chapter Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Introduction to Algorithms"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chapter Number</label>
              <select
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {chapterNumbers.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
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
                Save Chapter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChapterForm;
