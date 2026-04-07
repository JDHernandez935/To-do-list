import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import MainTemplate from "../templates/MainTemplate"
import TaskList from "../organism/TaskList"
import IconButton from "../molecules/IconButton"
import SearchBar from "../molecules/SearchBar"
import FilterChip from "../molecules/FilterChip"
import AlertContainer from "../organism/AlertContainer"
import Text from "../atoms/Text"
import { Outlet } from "react-router-dom"

function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("home")
  const [showFilters, setShowFilters] = useState(false)
  const { alerts, success, removeAlert } = useAlerts()

  const {
    filteredTasks,
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    toggleTask,
  } = useTasks()

  const handleToggle = (id) => {
    toggleTask(id)
    success("Tarea actualizada")
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "trash") navigate("/trash")
    if (tab === "calendar") navigate("/calendar")
    if (tab === "home") navigate("/")
  }

  const fab = (
    <IconButton
      iconName="Plus"
      size={24}
      onClick={() => navigate("/add", { state: { background: location } })}
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

  const searchBar = (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar tarea..."
          className="flex-1 px-3 py-2 rounded-lg bg-[#233240] border border-[#364C59]"
          inputClassName="text-[#C7D4D9] placeholder-[#77848C]"
          iconClassName="text-[#77848C]"
        />
        <IconButton
          iconName="SlidersHorizontal"
          onClick={() => setShowFilters(!showFilters)}
          className="
            w-10 h-10 rounded-lg bg-[#233240] border border-[#364C59]
            hover:border-[#7B2FBE] transition-all duration-200
            flex items-center justify-center
          "
          iconClassName={showFilters ? "text-[#7B2FBE]" : "text-[#77848C]"}
        />
      </div>
      {showFilters && (
        <div className="flex gap-2 flex-wrap">
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
              inactiveClassName="bg-[#233240] text-[#77848C] border border-[#364C59] hover:border-[#7B2FBE]"
            />
          ))}
        </div>
      )}
    </div>
  )

  const counter = (
    <Text variant="small" className="font-medium text-[#C7D4D9]">
      {filteredTasks.filter(t => !t.completed).length} tareas pendientes
    </Text>
  )

  return (
    <>
      <AlertContainer alerts={alerts} onClose={removeAlert} />
      <MainTemplate
        activeTab={activeTab}
        onTabChange={handleTabChange}
        fab={fab}
        search={searchBar}
        counter={counter}
      >
        <div style={{ maxWidth: "980px", margin: "0 auto", width: "100%" }}>
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onTaskClick={(id) => navigate(`/task/${id}`)}
            activeFilter={activeFilter}
            search={search}
          />
        </div>

      </MainTemplate>
      <Outlet />
      </>
  )
}

export default HomePage