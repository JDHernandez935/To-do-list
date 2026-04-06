import { useNavigate, useParams } from "react-router-dom"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import ModalTemplate from "../templates/ModalTemplate"
import TaskForm from "../organism/TaskForm"
import AlertContainer from "../organism/AlertContainer"

function EditTaskPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tasks, editTask, deleteTask } = useTasks()
  const { alerts, success, removeAlert } = useAlerts()

  const task = tasks.find(t => t.id === Number(id))

  if (!task) {
    navigate("/")
    return null
  }

  const handleSubmit = (data) => {
    editTask(task.id, data)
    success("Tarea actualizada correctamente")
    navigate("/")
  }

  const handleDelete = () => {
    navigate(`/task/${id}/delete`)
  }

  return (
    <>
      <AlertContainer alerts={alerts} onClose={removeAlert} />
      <ModalTemplate onClose={() => navigate("/")}>
        <TaskForm
          mode="edit"
          task={task}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          onDelete={handleDelete}
        />
      </ModalTemplate>
    </>
  )
}

export default EditTaskPage