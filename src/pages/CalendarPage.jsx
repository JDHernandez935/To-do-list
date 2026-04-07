import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  format, startOfMonth, endOfMonth, startOfWeek,
  endOfWeek, addDays, addMonths, subMonths,
  isSameMonth, isSameDay, isToday,
} from "date-fns"
import { es } from "date-fns/locale"
import { useTasks } from "../hooks/useTasks"
import MainTemplate from "../templates/MainTemplate"
import IconButton from "../molecules/IconButton"
import TaskItem from "../molecules/TaskItem"
import Icon from "../atoms/Icon"

function CalendarPage() {
  const navigate = useNavigate()
  const { tasks, toggleTask } = useTasks()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [timeFilter, setTimeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const [selectedDay, setSelectedDay] = useState(() => {
    const saved = sessionStorage.getItem("calendarSelectedDay")
    return saved ? new Date(saved) : new Date()
  })
  const [activeTab, setActiveTab] = useState("calendar")

  const handleSelectDay = (day) => {
    setSelectedDay(day)
    sessionStorage.setItem("calendarSelectedDay", day.toISOString())
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "home") navigate("/")
    if (tab === "trash") navigate("/trash")
  }

  const getTasksForDay = (day, tFilter = timeFilter, pFilter = priorityFilter) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      if (!isSameDay(new Date(task.dueDate), day)) return false
      if (tFilter !== "all" && task.dueTime) {
        const hour = parseInt(task.dueTime.split(":")[0])
        if (tFilter === "morning" && !(hour >= 6 && hour < 12)) return false
        if (tFilter === "afternoon" && !(hour >= 12 && hour < 18)) return false
        if (tFilter === "night" && !(hour >= 18 || hour < 6)) return false
      }
      if (pFilter !== "all" && task.priority !== pFilter) return false
      return true
    })
  }

  const hasTasksOnDay = (day) => tasks.some(task => {
    if (!task.dueDate) return false
    return isSameDay(new Date(task.dueDate), day)
  })

  const getCountForTime = (timeId) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      if (!isSameDay(new Date(task.dueDate), selectedDay)) return false
      if (!task.dueTime) return false
      const hour = parseInt(task.dueTime.split(":")[0])
      if (timeId === "morning") return hour >= 6 && hour < 12
      if (timeId === "afternoon") return hour >= 12 && hour < 18
      if (timeId === "night") return hour >= 18 || hour < 6
      return false
    }).length
  }

  const getCountForPriority = (priorityId) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      if (!isSameDay(new Date(task.dueDate), selectedDay)) return false
      return task.priority === priorityId
    }).length
  }

  const renderMiniCalendar = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const days = ["L", "M", "X", "J", "V", "S", "D"]

    const rows = []
    let dayCells = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const isSelected = isSameDay(cloneDay, selectedDay)
        const isCurrentMonth = isSameMonth(cloneDay, monthStart)
        const isTodayDate = isToday(cloneDay)
        const hasTasks = hasTasksOnDay(cloneDay)

        dayCells.push(
          <div
            key={day.toString()}
            onClick={() => handleSelectDay(cloneDay)}
            style={{
              width: 26, height: 26, borderRadius: 6, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              background: isSelected ? "#7B2FBE" : "transparent",
              opacity: isCurrentMonth ? 1 : 0.3,
              transition: "all 0.15s",
            }}
          >
            <span style={{
              fontSize: 11,
              color: isSelected ? "#fff" : isTodayDate ? "#7B2FBE" : "var(--text)",
              fontWeight: isSelected || isTodayDate ? 600 : 400,
            }}>
              {format(cloneDay, "d")}
            </span>
            {hasTasks && !isSelected && (
              <span style={{
                position: "absolute", bottom: 2,
                width: 3, height: 3, borderRadius: "50%",
                background: "#7B2FBE",
              }} />
            )}
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 1 }}>
          {dayCells}
        </div>
      )
      dayCells = []
    }

    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "var(--text)", fontSize: 12, fontWeight: 600, textTransform: "capitalize" }}>
            {format(currentMonth, "MMMM yyyy", { locale: es })}
          </span>
          <div style={{ display: "flex", gap: 2 }}>
            <IconButton
              iconName="ChevronLeft"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="w-5 h-5 rounded flex items-center justify-center hover:opacity-70 transition-opacity"
              iconClassName="text-[var(--text-muted)]"
              size={12}
            />
            <IconButton
              iconName="ChevronRight"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="w-5 h-5 rounded flex items-center justify-center hover:opacity-70 transition-opacity"
              iconClassName="text-[var(--text-muted)]"
              size={12}
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 4 }}>
          {days.map(d => (
            <span key={d} style={{ fontSize: 10, color: "var(--text-muted)", textAlign: "center" }}>{d}</span>
          ))}
        </div>
        {rows}
      </div>
    )
  }

  const timeOptions = [
    { id: "morning", label: "Mañana", icon: "Sunrise", color: "#facc15" },
    { id: "afternoon", label: "Tarde", icon: "Sun", color: "#60a5fa" },
    { id: "night", label: "Noche", icon: "Moon", color: "var(--text)" },
  ]

  const priorityOptions = [
    { id: "high", label: "Alta", color: "#ff6b6b", icon: "ChevronsUp" },
    { id: "medium", label: "Media", color: "#facc15", icon: "ChevronUp" },
    { id: "low", label: "Baja", color: "#4ade80", icon: "ChevronDown" },
  ]

  const selectedDayTasks = getTasksForDay(selectedDay)

  const sidebar = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 220, flexShrink: 0 }}>

      <div style={{ background: "var(--surface)", borderRadius: 12, padding: "12px 10px", border: "1px solid var(--border)" }}>
        {renderMiniCalendar()}
      </div>

      <div style={{ background: "var(--surface)", borderRadius: 12, padding: 12, border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Icon name="Clock" size={13} color="var(--text-muted)" />
          <span style={{ color: "var(--text)", fontSize: 13, fontWeight: 600 }}>Categorías</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {timeOptions.map(opt => {
            const count = getCountForTime(opt.id)
            const isActive = timeFilter === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setTimeFilter(isActive ? "all" : opt.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 8px", borderRadius: 8, cursor: "pointer",
                  background: isActive ? "var(--surface2)" : "transparent",
                  border: isActive ? `1px solid ${opt.color}` : "1px solid transparent",
                  transition: "all 0.15s", width: "100%",
                }}
              >
                <div style={{ width: 15, height: 15, borderRadius: 4, background: isActive ? opt.color : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {isActive && <Icon name="Check" size={9} color="#000" />}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
                  <Icon name={opt.icon} size={11} color={isActive ? opt.color : "var(--text-muted)"} />
                  <span style={{ color: isActive ? "var(--text)" : "var(--text-muted)", fontSize: 12 }}>{opt.label}</span>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ background: "var(--surface)", borderRadius: 12, padding: 12, border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Icon name="Flag" size={13} color="var(--text-muted)" />
          <span style={{ color: "var(--text)", fontSize: 13, fontWeight: 600 }}>Prioridad</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {priorityOptions.map(opt => {
            const count = getCountForPriority(opt.id)
            const isActive = priorityFilter === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setPriorityFilter(isActive ? "all" : opt.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 8px", borderRadius: 8, cursor: "pointer",
                  background: isActive ? "var(--surface2)" : "transparent",
                  border: "none", transition: "all 0.15s", width: "100%",
                }}
              >
                <Icon name={opt.icon} size={13} color={opt.color} />
                <span style={{ color: isActive ? "var(--text)" : "var(--text-muted)", fontSize: 12, flex: 1, textAlign: "left" }}>
                  {opt.label}
                </span>
                <Icon name="ChevronRight" size={11} color="var(--border)" />
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

    </div>
  )

  return (
    <MainTemplate activeTab={activeTab} onTabChange={handleTabChange} noPadding>
      <div style={{ display: "flex", gap: 12 }}>

        {sidebar}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
          <span style={{ color: "var(--text)", fontSize: 15, fontWeight: 600, textTransform: "capitalize" }}>
            {format(selectedDay, "EEEE d 'de' MMMM", { locale: es })}
          </span>

          {selectedDayTasks.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minHeight: "40vh" }}>
              <Icon name="CalendarX" size={36} color="var(--surface2)" />
              <span style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center" }}>
                No hay tareas para este día
              </span>
              {(timeFilter !== "all" || priorityFilter !== "all") && (
                <span style={{ color: "var(--border)", fontSize: 12, textAlign: "center" }}>
                  Prueba cambiando los filtros
                </span>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {selectedDayTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </MainTemplate>
  )
}

export default CalendarPage