import Checkbox from "../atoms/Checkbox"
import Text from "../atoms/Text"
import Badge from "../atoms/Badge"

function TaskItem({ task, onToggle, className = "" }) {
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
    <div className={`flex items-center gap-3 ${className}`}>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded-full border-2 border-[#7B2FBE]"
        checkedClassName="bg-[#7B2FBE] border-[#7B2FBE]"
      />
      <Text
        variant="body"
        className={`flex-1 ${task.completed ? "line-through opacity-50" : ""}`}
      >
        {task.title}
      </Text>
      <Badge label={getLabel(variant)} variant={variant} />
    </div>
  )
}

export default TaskItem