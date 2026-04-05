import { useEffect } from "react"
import Icon from "../atoms/Icon"
import Text from "../atoms/Text"

function Alert({ type = "success", message, onClose, duration = 3000 }) {
  const types = {
    success: {
      icon: "CheckCircle",
      iconClass: "text-green-400",
      borderClass: "border-green-500",
      bgClass: "bg-[#1a2e1a]",
    },
    error: {
      icon: "XCircle",
      iconClass: "text-red-400",
      borderClass: "border-red-500",
      bgClass: "bg-[#2e1a1a]",
    },
    warning: {
      icon: "AlertTriangle",
      iconClass: "text-yellow-400",
      borderClass: "border-yellow-500",
      bgClass: "bg-[#2e2a1a]",
    },
    info: {
      icon: "Info",
      iconClass: "text-blue-400",
      borderClass: "border-blue-500",
      bgClass: "bg-[#1a1a2e]",
    },
  }

  const current = types[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`
      flex items-center gap-3
      px-4 py-3 rounded-lg
      border ${current.borderClass}
      ${current.bgClass}
      shadow-lg w-72
      animate-slide-in
    `}>
      <Icon name={current.icon} size={20} className={current.iconClass} />
      <Text variant="small" className="text-[#e0e0e0] flex-1">
        {message}
      </Text>
      <button onClick={onClose} className="cursor-pointer">
        <Icon name="X" size={14} className="text-[#6a6a9a] hover:text-[#e0e0e0]" />
      </button>
    </div>
  )
}

export default Alert