import { useState } from "react"
import MainTemplate from "./templates/MainTemplate"
import TaskList from "./organism/TaskList"
import IconButton from "./molecules/IconButton"
import SearchBar from "./molecules/SearchBar"
import FilterChip from "./molecules/FilterChip"
import Text from "./atoms/Text"
import AlertContainer from "./organism/AlertContainer"
import ModalTemplate from "./templates/ModalTemplate"
import TaskForm from "./organism/TaskForm"
import useAlerts from "./hooks/useAlerts"
import { useTasks } from "./hooks/useTasks"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [showFilters, setShowFilters] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { alerts, success, removeAlert } = useAlerts()

  const {
    filteredTasks,
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    addTask,
    toggleTask,
  } = useTasks()

  const handleSubmit = (data) => {
    addTask(data)
    setShowModal(false)
    success("Tarea creada correctamente")
  }

  const fab = (
    <IconButton
      iconName="Plus"
      size={24}
      onClick={() => setShowModal(true)}
      className="
        w-14 h-14 rounded-full
        bg-[#7B2FBE] text-white
        hover:bg-[#9B4FDE]
        active:scale-95 transition-all duration-150
        shadow-lg
      "
      iconClassName="text-white"
    />
  )

  return (
    <>
      <AlertContainer alerts={alerts} onClose={removeAlert} />
      <MainTemplate
        activeTab={activeTab}
        onTabChange={setActiveTab}
        fab={fab}
      >
        <div className="flex gap-2 mb-3">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tarea..."
            className="
              flex-1 px-3 py-2 rounded-lg
              bg-[#2a2a4a] border border-[#4a4a6a]
            "
            inputClassName="text-[#e0e0e0] placeholder-[#6a6a9a]"
            iconClassName="text-[#6a6a9a]"
          />
          <IconButton
            iconName="SlidersHorizontal"
            onClick={() => setShowFilters(!showFilters)}
            className="
              w-10 h-10 rounded-lg
              bg-[#2a2a4a] border border-[#4a4a6a]
              hover:border-[#7B2FBE] transition-all duration-200
              flex items-center justify-center
            "
            iconClassName={showFilters ? "text-[#7B2FBE]" : "text-[#6a6a9a]"}
          />
        </div>

        {showFilters && (
          <div className="flex gap-2 flex-wrap mb-3">
            {["all", "pending", "completed", "overdue", "today", "soon"].map(filter => (
              <FilterChip
                key={filter}
                label={{
                  all: "Todas",
                  pending: "Pendientes",
                  completed: "Completadas",
                  overdue: "Vencidas",
                  today: "Hoy",
                  soon: "Próximas"
                }[filter]}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                activeClassName="bg-[#7B2FBE] text-white"
                inactiveClassName="bg-[#2a2a4a] text-[#6a6a9a] border border-[#4a4a6a] hover:border-[#7B2FBE]"
              />
            ))}
          </div>
        )}

        <Text variant="h2" className="text-[#e0e0e0] mb-4">
          {filteredTasks.filter(t => !t.completed).length} tareas pendientes
        </Text>

        <TaskList tasks={filteredTasks} onToggle={toggleTask} />

      </MainTemplate>

      {showModal && (
        <ModalTemplate onClose={() => setShowModal(false)}>
          <TaskForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={() => setShowModal(false)}
          />
        </ModalTemplate>
      )}
    </>
  )
}

export default App