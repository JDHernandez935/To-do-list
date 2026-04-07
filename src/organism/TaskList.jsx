import TaskItem from "../molecules/TaskItem"
import Text from "../atoms/Text"
import Icon from "../atoms/Icon"

function TaskList({ tasks, onToggle, className = "" }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <Icon name="CheckCircle" size={48} style={{ color: "#364C59" }} />
        <Text variant="body" style={{ color: "#77848C" }}>
          Todo limpio por hoy
        </Text>
        <Text variant="small" style={{ color: "#364C59" }}>
          Agrega una tarea para empezar
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