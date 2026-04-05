function Checkbox({ checked, onChange, className = "", checkedClassName = "" }) {
  return (
    <button
      onClick={onChange}
      className={`
        flex-shrink-0 flex items-center justify-center
        transition-all duration-200 cursor-pointer
        ${checked ? checkedClassName : ""}
        ${className}
      `}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5L4 7L8 3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

export default Checkbox