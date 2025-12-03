import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, 
  FileText, 
  PenTool, 
  Clock, 
  BarChart2, 
  Target, 
  Zap,
  Library
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Logo } from '../components/Logo'
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
      description: "Access organized PYQs by semester and subject",
      icon: <Library className="text-blue-600" size={32} />,
      color: "bg-blue-50",
      action: () => toast.success("Opening PYQ Library...")
    },
    {
      title: "Important Questions",
      description: "Handpicked high-probability questions",
      icon: <Target className="text-red-600" size={32} />,
      color: "bg-red-50",
      action: () => toast.success("Loading Question Bank...")
    },
    {
      title: "Smart Notes",
      description: "AI-summarized notes from uploaded PDFs",
      icon: <FileText className="text-green-600" size={32} />,
      color: "bg-green-50",
      action: () => toast.success("Opening Notes Section...")
    },
    {
      title: "Expected Paper",
      description: "Generate a probable exam paper based on trends",
      icon: <Zap className="text-yellow-600" size={32} />,
      color: "bg-yellow-50",
      action: () => toast.success("Generating Paper...")
    },
    {
      title: "Practice Mode",
      description: "Chapter-wise practice for theory & numericals",
      icon: <PenTool className="text-purple-600" size={32} />,
      color: "bg-purple-50",
      action: () => toast.success("Starting Practice Session...")
    },
    {
      title: "Revision Mode",
      description: "One-day before exam rapid revision set",
      icon: <Clock className="text-orange-600" size={32} />,
      color: "bg-orange-50",
      action: () => toast.success("Entering Revision Mode...")
    },
    {
      title: "Syllabus Tracker",
      description: "Track your progress chapter by chapter",
      icon: <BarChart2 className="text-indigo-600" size={32} />,
      color: "bg-indigo-50",
      action: () => toast.success("Opening Tracker...")
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-1">
              <Logo size={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Vertex</h1>
              <p className="text-xs text-slate-500 font-medium">Exam Prep Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.branch} • Year {user?.year}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="!p-2">
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
          <p className="text-slate-600 mt-1">Ready to ace your Semester {user?.semester} exams?</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-100 group"
              onClick={feature.action}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats / Recent Activity Placeholder */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-slate-800 to-blue-600 text-white border-none">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2">Study Streak</h3>
                <p className="text-3xl font-bold">0 Days</p>
                <p className="text-blue-100 text-sm mt-1">Start studying to build your streak!</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <Zap size={24} />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
            <div className="text-center py-8 text-slate-400 text-sm">
              <Clock className="mx-auto mb-2 opacity-50" size={32} />
              No recent activity found
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
