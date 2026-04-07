import Icon from "../atoms/Icon"
import Text from "../atoms/Text"
import { useAlertAnimation } from "../hooks/useAlertAnimation"

function Alert({ type = "success", message, onClose, duration = 3000 }) {
  const types = {
    success: {
      icon: "CheckCircle",
      iconColor: "#4ade80",
      borderColor: "#364C59",
      bg: "#233240",
      textColor: "#C7D4D9",
      accentColor: "#4ade80",
    },
    error: {
      icon: "AlertCircle",
      iconColor: "#ff6b6b",
      borderColor: "#364C59",
      bg: "#233240",
      textColor: "#C7D4D9",
      accentColor: "#ff6b6b",
    },
    warning: {
      icon: "AlertTriangle",
      iconColor: "#facc15",
      borderColor: "#364C59",
      bg: "#233240",
      textColor: "#C7D4D9",
      accentColor: "#facc15",
    },
    info: {
      icon: "Info",
      iconColor: "#7B2FBE",
      borderColor: "#364C59",
      bg: "#233240",
      textColor: "#C7D4D9",
      accentColor: "#7B2FBE",
    },
  }

  const current = types[type]
  const { leaving } = useAlertAnimation(duration, onClose)

  return (
    <div
      className={`flex items-center gap-4 px-4 py-4 rounded-2xl ${leaving ? "alert-leave" : "alert-enter"}`}
      style={{
        background: current.bg,
        border: `1px solid ${current.borderColor}`,
        borderLeft: `4px solid ${current.accentColor}`,
        width: "340px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: `${current.accentColor}20`,
          border: `1.5px solid ${current.accentColor}`,
        }}
      >
        <Icon name={current.icon} size={18} color={current.accentColor} />
      </div>

      <Text
        variant="small"
        className="flex-1 font-medium"
        style={{ color: current.textColor }}
      >
        {message}
      </Text>

      <button
        onClick={onClose}
        className="cursor-pointer flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <Icon name="X" size={14} color={current.textColor} />
      </button>
    </div>
  )
}

export default Alert