import TaskItem from "../molecules/TaskItem"
import Text from "../atoms/Text"
import Icon from "../atoms/Icon"

function TaskList({ tasks, onToggle, className = "", activeFilter = "all", search = "" }) {
  if (tasks.length === 0) {
    const isFiltered = activeFilter !== "all" || search.trim() !== ""

    const emptyState = isFiltered
      ? {
          icon: "SearchX",
          title: "Sin resultados",
          subtitle: "No hay tareas que coincidan con tu búsqueda o filtro",
        }
      : {
          icon: "CheckCircle",
          title: "Todo limpio por hoy",
          subtitle: "Agrega una tarea para empezar",
        }

    return (
      <div
        className="flex flex-col items-center justify-center gap-3"
        style={{ minHeight: "50vh" }}
      >
        <Icon name={emptyState.icon} size={48} color="var(--surface2)" />
        <Text variant="body" className="font-medium" style={{ color: "var(--text-muted)" }}>
          {emptyState.title}
        </Text>
        <Text variant="small" className="text-center px-8" style={{ color: "var(--border2)" }}>
          {emptyState.subtitle}
        </Text>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default TaskList