import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Target, 
  Clock, 
  Zap, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { Button } from '../components/Button'
import { Logo } from '../components/Logo'

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Previous Year Questions",
      description: "Access comprehensive PYQ banks organized by semester and subject"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Important Questions",
      description: "Curated high-probability questions for effective exam preparation"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Notes",
      description: "AI-powered concise notes for quick revision"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Exam Schedules",
      description: "Stay updated with comprehensive exam calendars"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Join thousands of students achieving academic excellence"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Vertex
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg font-semibold cursor-pointer">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 animate-slide-up">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Your Ultimate Study Companion</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up leading-tight">
              Ace Your Exams with Vertex
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 animate-slide-up leading-relaxed">
              Access curated study materials, previous year questions, and smart notes. 
              Everything you need to excel in your academics, all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/register" className="w-full sm:w-auto">
                <Button className="group bg-cyan-500 hover:bg-cyan-600 border-0">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to boost your academic performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Students Choose Vertex
              </h2>
              <div className="space-y-4">
                {[
                  "Comprehensive question banks from previous years",
                  "AI-curated important questions with high accuracy",
                  "Smart notes for quick and effective revision",
                  "Regular updates with latest exam patterns",
                  "Mobile-friendly access anytime, anywhere",
                  "Secure and private learning environment"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg"></div>
                    <div className="h-24 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg"></div>
                    <div className="h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-lg"></div>
                    <div className="h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl -z-10 blur-2xl opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl -z-10 blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full mb-6 border border-cyan-500/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Start Learning Today</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your<br />
            Learning Journey?
          </h2>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who are already acing their exams with Vertex
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/register">
              <button className="group bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer">
                Get Started for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-gray-700 hover:border-gray-600 cursor-pointer">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Logo size={32} />
                <span className="text-2xl font-bold text-gray-900">
                  Vertex
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
                Empowering students to achieve academic excellence through comprehensive study tools and resources.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2024 Vertex. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Made with ❤️ for students
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
