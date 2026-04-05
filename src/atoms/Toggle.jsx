function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`
        relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer
        ${enabled ? "bg-[#0D0D0D]" : "bg-[#A6A6A6]"}
      `}
    >
      <span
        className={`
          absolute top-1 w-4 h-4 rounded-full bg-[#F2F2F2]
          transition-all duration-300
          ${enabled ? "left-7" : "left-1"}
        `}
      />
    </button>
  )
}

export default Toggle