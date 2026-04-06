import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Checkbox from "../atoms/Checkbox"
import Text from "../atoms/Text"
import Badge from "../atoms/Badge"
import IconButton from "./IconButton"

function TaskItem({ task, onToggle, className = "" }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

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

  const variant = getVariant(task.dueDate, task.completed)

  return (
    <div
      className={`flex flex-col gap-0 transition-all duration-200 ${className}`}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Checkbox
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation()
            onToggle(task.id)
          }}
          className="w-5 h-5 rounded-full border-2 border-[#7B2FBE]"
          checkedClassName="bg-[#7B2FBE] border-[#7B2FBE]"
        />
        <Text
          variant="body"
          className={`flex-1 ${task.completed ? "line-through opacity-50" : "text-[#e0e0e0]"}`}
        >
          {task.title}
        </Text>
        <Badge label={getLabel(variant)} variant={variant} />
      </div>

      {expanded && (
        <div className="flex gap-2 pt-3 pl-8 border-t border-[#4a4a6a] mt-3">
          <IconButton
            iconName="Eye"
            size={16}
            onClick={() => navigate(`/task/${task.id}`)}
            className="
              flex items-center gap-1 px-3 py-1 rounded-lg
              bg-[#4a4a6a] hover:bg-[#6a6a9a]
              active:scale-95 transition-all duration-150
              text-[#e0e0e0] text-xs
            "
          />
          <IconButton
            iconName="Pencil"
            size={16}
            onClick={() => navigate(`/task/${task.id}/edit`)}
            className="
              flex items-center gap-1 px-3 py-1 rounded-lg
              bg-[#7B2FBE] hover:bg-[#9B4FDE]
              active:scale-95 transition-all duration-150
              text-white text-xs
            "
          />
          <IconButton
            iconName="Trash2"
            size={16}
            onClick={() => navigate(`/task/${task.id}/delete`)}
            className="
              flex items-center gap-1 px-3 py-1 rounded-lg
              bg-red-500 hover:bg-red-600
              active:scale-95 transition-all duration-150
              text-white text-xs
            "
          />
        </div>
      )}
    </div>
  )
}

export default TaskItem