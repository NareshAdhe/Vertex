export const Button = ({ children, variant = 'primary', type = 'button', disabled = false, loading = false, className = '', ...props }) => {
  const baseStyles = 'w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer'
  
  const variants = {
    primary: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 shadow-sm hover:shadow-md',
    outline: 'border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500 shadow-sm hover:shadow-md',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400'
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  )
}
