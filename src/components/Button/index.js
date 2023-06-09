export default function Button ({ children, onClick, variant = 'primary', size = 'medium', ...props }) {

  const variantStyles = {
    primary: 'bg-violet-700 text-white hover:bg-violet-900 focus:ring focus:ring-violet-300',
    secondary: 'bg-orange-400 text-white hover:bg-orange-600 focus:ring focus:ring-orange-200',
  }[variant]

  const sizeStyles = {
    small: 'py-1 px-3',
    medium: 'py-3 px-5',
  }[size]

  return (
    <button
      onClick={onClick}
      className={`rounded ${variantStyles} ${sizeStyles} disabled:bg-gray-300 disabled:text-gray-50`}
      {...props}
    >
      {children}
    </button>
  )
}
