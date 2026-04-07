import { useNavigate, useParams } from "react-router-dom"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import ModalTemplate from "../templates/ModalTemplate"
import TaskForm from "../organism/TaskForm"

function EditTaskPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tasks, editTask } = useTasks()
  const { success } = useAlerts()

  const task = tasks.find(t => t.id === Number(id))

  if (!task) {
    navigate(-1)
    return null
  }

  const handleSubmit = (data) => {
    editTask(task.id, data)
    success("Tarea actualizada correctamente")
    navigate(-1)
  }

  return (
    <ModalTemplate onClose={() => navigate(-1)}>
      <TaskForm
        mode="edit"
        task={task}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        onDelete={() => navigate(`/task/${id}/delete`)}
      />
    </ModalTemplate>
  )
}

export default EditTaskPage