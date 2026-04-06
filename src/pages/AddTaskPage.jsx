import { useNavigate } from "react-router-dom"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import ModalTemplate from "../templates/ModalTemplate"
import TaskForm from "../organism/TaskForm"
import AlertContainer from "../organism/AlertContainer"

function AddTaskPage() {
  const navigate = useNavigate()
  const { addTask } = useTasks()
  const { alerts, success, removeAlert } = useAlerts()

  const handleSubmit = (data) => {
    addTask(data)
    success("Tarea creada correctamente")
    navigate("/")
  }

  return (
    <>
      <AlertContainer alerts={alerts} onClose={removeAlert} />
      <ModalTemplate onClose={() => navigate("/")}>
        <TaskForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </ModalTemplate>
    </>
  )
}

export default AddTaskPage