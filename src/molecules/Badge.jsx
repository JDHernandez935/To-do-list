import Icon from "../atoms/Icon"

function Badge({ label, variant = "default" }) {
  const variants = {
    default: {
      bg: "#364C59",
      text: "#C7D4D9",
      icon: "Clock",
    },
    today: {
      bg: "#854d0e",
      text: "#fef08a",
      icon: "AlertCircle",
    },
    soon: {
      bg: "#7c2d12",
      text: "#fdba74",
      icon: "Timer",
    },
    tomorrow: {
      bg: "#1e3a5f",
      text: "#93c5fd",
      icon: "Calendar",
    },
    overdue: {
      bg: "#4a1515",
      text: "#ff6b6b",
      icon: "AlertTriangle",
    },
    completed: {
      bg: "#14532d",
      text: "#86efac",
      icon: "CheckCircle",
    },
  }

  const current = variants[variant]

  return (
    <span
      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
      style={{ background: current.bg, color: current.text }}
    >
      <Icon name={current.icon} size={11} color={current.text} />
      {label}
    </span>
  )
}

export default Badge