export default function Select({ options, placeholder, ...props }) {
  return (
    <select defaultValue="" className="border px-4 py-3 text-base text-violet-700 border-violet-700 rounded placeholder:text-base placeholder:text-violet-700 focus:outline-none focus:ring focus:ring-violet-300" {...props}>
      {!!placeholder && (
        <option value="" disabled>{placeholder}</option>
      )}
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt?.name || opt.value}
        </option>
      ))}
    </select>
  )
}