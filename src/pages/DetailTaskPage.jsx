import { useNavigate, useParams } from "react-router-dom"
import { useTasks } from "../hooks/useTasks"
import ModalTemplate from "../templates/ModalTemplate"
import TaskForm from "../organism/TaskForm"

function DetailTaskPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tasks } = useTasks()

  const task = tasks.find(t => t.id === Number(id))

  if (!task) {
    navigate("/")
    return null
  }

  return (
    <ModalTemplate onClose={() => navigate("/")}>
      <TaskForm
        mode="readonly"
        task={task}
        onCancel={() => navigate("/")}
      />
    </ModalTemplate>
  )
}

export default DetailTaskPage