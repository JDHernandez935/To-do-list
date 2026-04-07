import { useNavigate } from "react-router-dom"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import ModalTemplate from "../templates/ModalTemplate"
import TaskForm from "../organism/TaskForm"

function AddTaskPage() {
  const navigate = useNavigate()
  const { addTask } = useTasks()
  const { success } = useAlerts()

  const handleSubmit = (data) => {
    addTask(data)
    success("Tarea creada correctamente")
    navigate("/")
  }

  return (
    <ModalTemplate onClose={() => navigate("/")}>
      <TaskForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </ModalTemplate>
  )
}

export default AddTaskPage