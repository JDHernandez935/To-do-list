import TaskItem from "../molecules/TaskItem"
import Text from "../atoms/Text"
import Icon from "../atoms/Icon"

function TaskList({ tasks, onToggle, className = "" }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <Icon name="CheckCircle" size={48} className="text-[#4a4a6a]" />
        <Text variant="body" className="text-[#6a6a9a]">
          Todo limpio por hoy
        </Text>
        <Text variant="small" className="text-[#4a4a6a]">
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
          className="
            px-4 py-3 rounded-lg
            bg-[#2a2a4a] border border-[#4a4a6a]
            hover:border-[#7B2FBE] transition-all duration-200
          "
        />
      ))}
    </div>
  )
}

export default TaskList