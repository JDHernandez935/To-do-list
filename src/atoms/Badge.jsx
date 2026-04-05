function Badge({ label, variant = "default" }) {
    const variants = {
        default: "bg-[#F2ECE9] text-[#595959]",
        today: "bg-yellow-100 text-yellow-800",
        tomorrow: "bg-blue-100 text-blue-800",
        overdue: "bg-red-100 text-red-600",
        completed: "bg-green-100 text-green-700"
    }

    return(
        <span className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${variants[variant]}
        `}>
            {label}
        </span>
    )
}

export default Badge