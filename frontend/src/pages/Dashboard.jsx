import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, 
  FileText, 
  PenTool, 
  Clock,  
  Target, 
  Zap,
  Library,
  TrendingUp,
  Award,
  BookOpen,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Calendar,
  Star,
  Activity
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Logo } from '../components/Logo'
import Header from '../components/Header'
import { authService } from '../utils/authService'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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

  const features = [
    {
      title: "Previous Year Questions",
      description: "Access 500+ PYQs organized by semester",
      icon: <Library size={24} />,
      gradient: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      action: () => navigate("/pyq")
    },
    {
      title: "Important Questions",
      description: "AI-curated high-probability questions",
      icon: <Target size={24} />,
      gradient: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      action: () => navigate("/important")
    },
    {
      title: "Smart Notes",
      description: "AI-summarized notes from PDFs",
      icon: <FileText size={24} />,
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      action: () => toast.success("Opening Notes Section...")
    },
    {
      title: "Expected Paper",
      description: "AI-generated probable exam papers",
      icon: <Zap size={24} />,
      gradient: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      action: () => toast.success("Generating Paper...")
    },
    {
      title: "Practice Mode",
      description: "Chapter-wise theory & numericals",
      icon: <PenTool size={24} />,
      gradient: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      action: () => toast.success("Starting Practice Session...")
    },
    {
      title: "Revision Mode",
      description: "Rapid revision for last-day prep",
      icon: <Clock size={24} />,
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      action: () => toast.success("Entering Revision Mode...")
    }
  ]

  const stats = [
    { label: "Study Hours", value: "0", icon: <Clock size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Questions Solved", value: "0", icon: <Target size={20} />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Current Streak", value: "0 days", icon: <Award size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Overall Progress", value: "0%", icon: <TrendingUp size={20} />, color: "text-orange-600", bg: "bg-orange-50" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <Header 
        user={user} 
        subtitle="Dashboard" 
        searchPlaceholder="Search questions, notes, topics..."
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-white rounded-2xl p-8 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Star className="text-yellow-500" size={24} fill="currentColor" />
            <span className="text-sm font-semibold text-gray-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">Premium Student</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 🎓
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Ready to ace your Semester {user?.semester} exams? Let's make today count!
          </p>
          <div className="flex gap-3">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md">
              Continue Learning
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors">
              View Schedule
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all border border-gray-100">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Study Tools</h3>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View All <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className={feature.iconColor}>{feature.icon}</div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-semibold text-sm">
                  Start Now <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Study Streak */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Study Streak</p>
                <p className="text-4xl font-bold text-gray-900">0 Days</p>
              </div>
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                <Activity size={24} className="text-cyan-500" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">Start studying to build your streak! 🔥</p>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-600" size={20} />
              <h4 className="font-bold text-gray-900">Upcoming Exams</h4>
            </div>
            <div className="text-center py-6 text-gray-400">
              <Calendar className="mx-auto mb-2 opacity-50" size={32} />
              <p className="text-sm">No exams scheduled</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-purple-600" size={20} />
              <h4 className="font-bold text-gray-900">Recent Activity</h4>
            </div>
            <div className="text-center py-6 text-gray-400">
              <BookOpen className="mx-auto mb-2 opacity-50" size={32} />
              <p className="text-sm">No recent activity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
