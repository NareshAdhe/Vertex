import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Mail, Calendar, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
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

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-4 shadow-lg">
            <User size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Dashboard</h1>
          <p className="text-gray-600 text-lg">You're successfully logged in!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="animate-slide-up hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                <p className="text-lg font-semibold text-gray-900">{user?.email || 'N/A'}</p>
              </div>
            </div>
          </Card>

          <Card className="animate-slide-up hover:shadow-2xl transition-shadow duration-300" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Account Status</h3>
                <p className="text-lg font-semibold text-green-600">Verified</p>
              </div>
            </div>
          </Card>

          <Card className="animate-slide-up hover:shadow-2xl transition-shadow duration-300" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">User ID</h3>
                <p className="text-lg font-semibold text-gray-900 truncate">{user?.userId || 'N/A'}</p>
              </div>
            </div>
          </Card>

          <Card className="animate-slide-up hover:shadow-2xl transition-shadow duration-300" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Actions</h2>
            <p className="text-gray-600 mb-6">Manage your account settings and security</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                variant="outline" 
                onClick={() => toast.success('Feature coming soon!')}
                className="max-w-xs"
              >
                <User size={20} />
                Edit Profile
              </Button>
              <Button 
                variant="danger" 
                onClick={handleLogout}
                className="max-w-xs"
              >
                <LogOut size={20} />
                Logout
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500 animate-fade-in">
          <p>🎉 Congratulations! Your authentication system is working perfectly.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
