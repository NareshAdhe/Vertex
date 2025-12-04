import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, KeyRound, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { authService } from '../utils/authService'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validateEmail = () => {
    if (!email) {
      setError('Email is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail()) return

    setLoading(true)
    try {
      const response = await authService.forgotPassword(email)
      toast.success(response.message || 'Reset link sent to your email!')
      setSuccess(true)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
        <Link 
          to="/login" 
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Login</span>
        </Link>

        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-4 shadow-xl">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Check Your Email
            </h1>
            <p className="text-gray-600 flex flex-col items-center gap-1">
              <span className="flex items-center gap-2">
                <Sparkles size={16} className="text-green-600" />
                We've sent a password reset link to
              </span>
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </div>

          <Card>
            <div className="text-center space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  Click the link in the email to reset your password. The link will expire in <span className="font-semibold">1 hour</span>.
                </p>
              </div>
              <Link to="/login">
                <Button variant="outline">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </Card>

          <p className="text-center text-xs text-gray-500 mt-6">
            Didn't receive the email? Check your spam folder
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <Link 
        to="/login" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        <span>Back to Login</span>
      </Link>

      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500 text-white mb-6 shadow-lg">
            <KeyRound size={36} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={handleChange}
              error={error}
              autoComplete="email"
            />

            <Button type="submit" loading={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 font-medium hover:underline">
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          Remember your password? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
