function Input({ placeholder, value, onChange, type = "text", className = "" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full transition-all duration-200
        focus:outline-none
        ${className}
      `}
    />
  )
}

export default Input