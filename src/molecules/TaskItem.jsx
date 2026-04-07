import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Checkbox from "../atoms/Checkbox"
import Text from "../atoms/Text"
import Badge from "../atoms/Badge"
import Icon from "../atoms/Icon"

function TaskItem({ task, onToggle, className = "" }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const getVariant = (dueDate, completed) => {
    if (completed) return "completed"
    if (!dueDate) return "default"
    const today = new Date()
    const due = new Date(dueDate)
    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
    if (diff < 0) return "overdue"
    if (diff === 0) return "today"
    if (diff === 1) return "tomorrow"
    if (diff <= 3) return "soon"
    return "default"
  }

  const getLabel = (variant) => {
    const labels = {
      completed: "Completada",
      overdue: "Vencida",
      today: "Hoy",
      tomorrow: "Mañana",
      soon: "Próximo",
      default: "Sin fecha",
    }
    return labels[variant]
  }

  const getTimeIcon = (dueTime) => {
  if (!dueTime) return { icon: "Clock", color: "#77848C" }
    const hour = parseInt(dueTime.split(":")[0])
    if (hour >= 6 && hour < 12) return { icon: "Sunrise", color: "#BF681B" }
    if (hour >= 12 && hour < 18) return { icon: "Sun", color: "#7B2FBE" }
    return { icon: "Moon", color: "#C7D4D9" }
  }

  const variant = getVariant(task.dueDate, task.completed)
  const timeInfo = getTimeIcon(task.dueTime)

  const formatDate = (date) => {
    if (!date) return null
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit", month: "short", year: "numeric"
    })
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-200 ${className}`}
      style={{ background: "#233240" }}
    >
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "#233240" }}
        >
          <Icon name={timeInfo.icon} size={22} style={{ color: timeInfo.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <Text
            variant="body"
            className={`font-medium truncate ${task.completed ? "line-through opacity-50" : ""}`}
            style={{ color: "#C7D4D9" }}
          >
            {task.title}
          </Text>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={12} style={{ color: "#77848C" }} />
                <span style={{ color: "#77848C", fontSize: 12 }}>{formatDate(task.dueDate)}</span>
              </div>
            )}
            {task.dueTime && (
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={12} style={{ color: "#77848C" }} />
                <span style={{ color: "#77848C", fontSize: 12 }}>{task.dueTime}</span>
              </div>
            )}
            <Badge label={getLabel(variant)} variant={variant} />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Checkbox
            checked={task.completed}
            onChange={(e) => {
              e.stopPropagation()
              onToggle(task.id)
            }}
            className="w-5 h-5 rounded-full border-2 border-[#7B2FBE]"
            checkedClassName="bg-[#7B2FBE] border-[#7B2FBE]"
          />
          <Icon
            name={expanded ? "ChevronUp" : "ChevronDown"}
            size={16}
            style={{ color: "#77848C" }}
          />
        </div>
      </div>

      {expanded && (
        <div
          className="flex gap-2 px-4 pb-4"
          style={{ borderTop: "1px solid #364C59", paddingTop: "12px" }}
        >
          <button
            onClick={() => navigate(`/task/${task.id}`, { state: { background: location } })}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl cursor-pointer transition-all duration-150 hover:opacity-80 active:scale-95"
            style={{ background: "#364C59" }}
          >
            <Icon name="Eye" size={15} style={{ color: "#C7D4D9" }} />
            <span style={{ color: "#C7D4D9", fontSize: 13 }}>Ver</span>
          </button>

          <button
            onClick={() => navigate(`/task/${task.id}/edit`, { state: { background: location } })}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl cursor-pointer transition-all duration-150 hover:opacity-80 active:scale-95"
            style={{ background: "#7B2FBE" }}
          >
            <Icon name="Pencil" size={15} style={{ color: "#fff" }} />
            <span style={{ color: "#fff", fontSize: 13 }}>Editar</span>
          </button>

          <button
            onClick={() => navigate(`/task/${task.id}/delete`, { state: { background: location } })}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl cursor-pointer transition-all duration-150 hover:opacity-80 active:scale-95"
            style={{ background: "#4a1515" }}
          >
            <Icon name="Trash2" size={15} style={{ color: "#ff6b6b" }} />
            <span style={{ color: "#ff6b6b", fontSize: 13 }}>Eliminar</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskItem