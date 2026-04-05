import { useState } from "react"

import Text from "./atoms/Text"
import TaskList from "./organism/TaskList"
import Navbar from "./organism/NavBar"

function App() {
  const [activeTab, setActiveTab] = useState("home")
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
    </div>
  )
}

export default App