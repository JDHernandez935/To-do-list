function Input({ placeholder, value, onChange, type="text", className = "" }){
    return(
        <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
            w-full px-4 py-2 rounded-lg border
            bg-[#F2ECE9] text-[#0D0D0D]
            border-[#A6A6A6] placeholder-[#595959]
            focus:outline-none focus:border-[#0D0D0D]
            transition-all durarion-200
            ${className}
        `}
    />
    )
}

export default Input