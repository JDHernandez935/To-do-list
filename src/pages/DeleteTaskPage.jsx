import { useNavigate, useParams } from "react-router-dom"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import ModalTemplate from "../templates/ModalTemplate"
import DeleteModal from "../organism/DeleteModal"

function DeleteTaskPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tasks, deleteTask } = useTasks()
  const { success } = useAlerts()

  const task = tasks.find(t => t.id === Number(id))

  if (!task) {
    navigate(-1)
    return null
  }

  const handleConfirm = () => {
    deleteTask(task.id)
    success("Tarea eliminada")
    navigate("/")
  }

  return (
    <ModalTemplate onClose={() => navigate(-1)}>
      <DeleteModal
        taskTitle={task.title}
        onConfirm={handleConfirm}
        onCancel={() => navigate(-1)}
      />
    </ModalTemplate>
  )
}

export default DeleteTaskPage