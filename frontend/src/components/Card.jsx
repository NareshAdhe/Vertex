export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-100 ${className}`}>
      {children}
    </div>
  )
}
