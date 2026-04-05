function Text({ children, variant = "body", className = "" }) {
  const variants = {
    h1: "text-2xl font-bold text-[#0D0D0D]",
    h2: "text-xl font-semibold text-[#0D0D0D]",
    h3: "text-lg font-medium text-[#0D0D0D]",
    body: "text-base font-normal text-[#0D0D0D]",
    small: "text-sm font-normal text-[#595959]",
    muted: "text-xs font-normal text-[#A6A6A6]",
  }

  const tags = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
    small: "p",
    muted: "span",
  }

  const Tag = tags[variant]

  return (
    <Tag className={`${variants[variant]} ${className}`}>
      {children}
    </Tag>
  )
}

export default Text