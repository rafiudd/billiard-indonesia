export default function Input({ className, ...props }) {
  return (
    <input
      className={`border px-4 py-3 text-base text-violet-700 border-violet-700 rounded placeholder:text-base placeholder:text-violet-700 focus:outline-none focus:ring focus:ring-violet-300 disabled:text-gray-400 disabled:placeholder:text-gray-400 disabled:bg-gray-200 disabled:border-gray-400 ${className}`}
      {...props}
    />
  )
}