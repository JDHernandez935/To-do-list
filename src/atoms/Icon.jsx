import * as LucideIcons from "lucide-react"

function Icon({ name, size = 20, color = "currentColor", className = "" }) {
  const LucideIcon = LucideIcons[name]

  if (!LucideIcon) {
    console.warn(`Icono "${name}" no existe en Lucide`)
    return null
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      className={className}
    />
  )
}

export default Icon