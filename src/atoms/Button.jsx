function Button({ children, onClick, className = "", type = "button", style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={`
        cursor-pointer transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button