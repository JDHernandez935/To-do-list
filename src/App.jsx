import { useState } from "react"

import Text from "./atoms/Text"
import TaskList from "./organism/TaskList"
import Navbar from "./organism/NavBar"
import TaskForm from "./organism/TaskForm"
import FilterModal from "./organism/FilterModal"
import DeleteModal from "./organism/DeleteModal"
import AlertContainer from "./organism/AlertContainer"
import Button from "./atoms/Button"
import useAlerts from "./hooks/useAlerts"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [activeFilter, setActiveFilter] = useState("all")
  const { alerts, success, error, warning, info, removeAlert } = useAlerts()

  const [tasks, setTasks] = useState([
    { id: 1, title: "Entregar proyecto", dueDate: "2024-04-09", completed: false },
    { id: 2, title: "Estudiar React", dueDate: "2024-04-04", completed: false },
    { id: 3, title: "Hacer ejercicio", dueDate: "2024-04-10", completed: false },
    { id: 4, title: "Llamar al médico", dueDate: null, completed: false },
    { id: 5, title: "Comprar víveres", dueDate: "2024-04-01", completed: true },
  ])

  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="p-8 flex flex-col gap-6 bg-[#1a1a2e] min-h-screen">
      <Text variant="h2" className="text-[#e0e0e0]">
        {tasks.filter(t => !t.completed).length} tareas pendientes
      </Text>
      
      <TaskList tasks={tasks} onToggle={handleToggle} />

      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e] border-t border-[#4a4a6a]">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="p-4 rounded-lg bg-[#2a2a4a] border border-[#4a4a6a]">
        <TaskForm
          mode="create"
          onSubmit={(data) => console.log("Crear:", data)}
          onCancel={() => console.log("Cancelar")}
        />
      </div>

      <div className="p-4 rounded-lg bg-[#2a2a4a] border border-[#4a4a6a]">
        <FilterModal
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onClose={() => console.log("Cerrar filtros")}
        />
      </div>

      <div className="p-4 rounded-lg bg-[#2a2a4a] border border-[#4a4a6a]">
        <DeleteModal
          taskTitle="Entregar proyecto final"
          onConfirm={() => console.log("Eliminado")}
          onCancel={() => console.log("Cancelado")}
        />
      </div>

      <AlertContainer alerts={alerts} onClose={removeAlert} />
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => success("Tarea creada correctamente")}
          className="px-4 py-2 rounded-lg bg-green-600 text-white active:scale-95 transition-all"
        >
          Éxito
        </Button>
        <Button
          onClick={() => error("Ha ocurrido un error")}
          className="px-4 py-2 rounded-lg bg-red-500 text-white active:scale-95 transition-all"
        >
          Error
        </Button>
        <Button
          onClick={() => warning("Esta acción no se puede deshacer")}
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white active:scale-95 transition-all"
        >
          Advertencia
        </Button>
        <Button
          onClick={() => info("Tarea actualizada")}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white active:scale-95 transition-all"
        >
          Info
        </Button>
      </div>
    </div>
  )
}

export default App