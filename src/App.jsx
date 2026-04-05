import { useState } from "react"

import Text from "./atoms/Text"
import Toggle from "./molecules/Toggle"
import SearchBar from "./molecules/SearchBar"
import IconButton from "./molecules/IconButton"
import TaskItem from "./molecules/TaskItem"
import FormField from "./molecules/FormField"
import FilterChip from "./molecules/FilterChip"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [search, setSearch] = useState("")

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")

  const [activeFilter, setActiveFilter] = useState("all")

  const [tasks, setTasks] = useState([
    { id: 1, title: "Entregar proyecto", dueDate: "2024-04-03", completed: false },
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
      <Text variant="h2" className="text-[#e0e0e0]">Toggle</Text>
      <Toggle
        enabled={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        enabledClassName="bg-[#7B2FBE]"
        disabledClassName="bg-[#4a4a6a]"
        enabledIcon="Sun"
        disabledIcon="Moon"
      />

      <Text variant="h2" className="text-[#e0e0e0]">Searchbar</Text>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar tarea..."
        className="
          px-4 py-2 rounded-lg
          bg-[#2a2a4a] border border-[#4a4a6a]
          text-[#e0e0e0]
        "
        iconClassName="text-[#6a6a9a] flex-shrink-0"
      />
      <Text variant="small" className="text-[#6a6a9a]">
        Buscando: {search}
      </Text>

      <Text variant="h2" className="text-[#e0e0e0]">IconButton</Text>
      <div className="flex gap-3 items-center">

        <IconButton
          iconName="Trash2"
          className="w-10 h-10 rounded-full bg-[#4a4a6a] hover:bg-red-500 active:scale-95 transition-all duration-150"
          iconClassName="text-[#e0e0e0]"
        />

        <IconButton
          iconName="Pencil"
          className="w-10 h-10 rounded-full bg-[#4a4a6a] hover:bg-[#7B2FBE] active:scale-95 transition-all duration-150"
          iconClassName="text-[#e0e0e0]"
        />

        <IconButton
          iconName="Plus"
          className="w-14 h-14 rounded-full bg-[#7B2FBE] hover:bg-[#9B4FDE] active:scale-95 transition-all duration-150"
          iconClassName="text-white"
          size={24}
        />
      </div>

      <div className="p-8 flex flex-col gap-3 bg-[#1a1a2e] min-h-screen">
        <Text variant="h2" className="text-[#e0e0e0] mb-4">Tareas</Text>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            className="
              px-4 py-3 rounded-lg
              bg-[#2a2a4a] border border-[#4a4a6a]
            "
          />
        ))}
      </div>

      <Text variant="h2" className="text-[#e0e0e0]">FormField</Text>
      <div className="flex flex-col gap-4 p-4 rounded-lg bg-[#2a2a4a]">
        <FormField
          label="Nombre de la tarea"
          placeholder="Ej: Estudiar React..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          inputClassName="
            bg-[#1a1a2e] border-[#4a4a6a]
            text-[#e0e0e0] placeholder-[#6a6a9a]
            focus:border-[#7B2FBE]
          "
        />
        <FormField
          label="Fecha límite"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          inputClassName="
            bg-[#1a1a2e] border-[#4a4a6a]
            text-[#e0e0e0]
            focus:border-[#7B2FBE]
          "
        />
      </div>

      <Text variant="h2" className="text-[#e0e0e0]">FilterChip</Text>
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "completed", "overdue"].map(filter => (
          <FilterChip
            key={filter}
            label={{ all: "Todas", pending: "Pendientes", completed: "Completadas", overdue: "Vencidas" }[filter]}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            activeClassName="bg-[#7B2FBE] text-white"
            inactiveClassName="bg-[#2a2a4a] text-[#6a6a9a] border border-[#4a4a6a] hover:border-[#7B2FBE]"
          />
        ))}
      </div>
    </div>
  )
}

export default App