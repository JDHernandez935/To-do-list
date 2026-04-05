function Text({ children, variant = "body", className = "" }) {
  const variants = {
    h1: "text-2xl font-bold",
    h2: "text-xl font-semibold",
    h3: "text-lg font-medium",
    body: "text-base font-normal",
    small: "text-sm font-normal",
    muted: "text-xs font-normal",
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