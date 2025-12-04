import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Shield, ArrowLeft, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { authService } from '../utils/authService'
import { useAuth } from '../context/AuthContext'

const VerifyOTP = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [resendLoading, setResendLoading] = useState(false)
  
  const email = location.state?.email
  const userId = location.state?.userId

  useEffect(() => {
    if (!email) {
      navigate('/login')
    }
  }, [email, navigate])

  const handleResend = async () => {
    setResendLoading(true)
    try {
      const response = await authService.resendOTP(userId)
      toast.success(response.message || 'OTP resent successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setResendLoading(false)
    }
  }

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return
    
    const newOtp = pastedData.split('')
    while (newOtp.length < 6) newOtp.push('')
    setOtp(newOtp)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }

    setLoading(true)
    try {
      const response = await authService.verifyOTP(userId, otpValue)
      toast.success(response.message || 'OTP verified successfully!')
      login(response.user || { email, userId })
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.')
      toast.error(error.response?.data?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Back Button */}
      <Link 
        to="/login" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </Link>

      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500 text-white mb-6 shadow-lg">
            <Shield size={36} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to<br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                Enter Verification Code
              </label>
              <div className="flex gap-3 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-14 h-16 text-center text-2xl font-bold border-2 ${
                      error ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-sm hover:shadow-md`}
                  />
                ))}
              </div>
              {error && (
                <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center gap-1.5 font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" loading={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm">
            <span className="text-gray-600">Didn't receive the code?</span>{' '}
            <button 
              onClick={handleResend}
              disabled={resendLoading}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          Your security is our priority
        </p>
      </div>
    </div>
  )
}

export default VerifyOTP
