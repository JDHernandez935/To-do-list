function Checkbox({ checked, onChange }) {
    return(
        <button
            onClick={onChange}
            className={`
                w-5 h-5 rounded-full border-2 flex-shrink-0
                flex items-center justify-center
                transition-all duration-200 cursor-pointer
                ${checked
                    ? "bg-[#0D0D0D] border-[#0D0D0D]"
                    : "bg-transparent border-[#A6A6A6] hover:border-[#595959]"
                }
            `}
        >
            {checked && (
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                >
                    <path
                        d="M2 5L4 7L8 3"
                        stroke="#F2F2F2"
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