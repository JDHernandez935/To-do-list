function Button({ children, onClick, variant = "primary", className = "" }) {
  const base = "px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer"
  
  const variants = {
    primary: "bg-[#0D0D0D] text-[#F2F2F2] hover:bg-[#262626]",
    secondary: "bg-[#F2ECE9] text-[#0D0D0D] hover:bg-[#A6A6A6]",
    danger: "bg-transparent text-red-500 hover:bg-red-50",
    ghost: "bg-transparent text-[#595959] hover:bg-[#F2ECE9]",
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button