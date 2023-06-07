export default function Button ({ children, onClick, variant = 'primary', size = 'medium', ...props }) {

  const variantStyles = {
    primary: 'bg-violet-700 text-white rounded hover:bg-violet-900 focus:ring-violet-300',
    secondary: 'bg-orange-400 text-white rounded hover:bg-orange-600 focus:ring-orange-200',
  }[variant]

  const sizeStyles = {
    small: 'py-1 px-3',
    medium: 'py-3 px-5',
  }[size]

  return (
    <button
      onClick={onClick}
      className={`focus:ring ${variantStyles} ${sizeStyles}`}
      {...props}
    >
      {children}
    </button>
  )
}
