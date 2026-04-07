import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { es } from "date-fns/locale"
import { useTasks } from "../hooks/useTasks"
import MainTemplate from "../templates/MainTemplate"
import Text from "../atoms/Text"
import IconButton from "../molecules/IconButton"
import TaskItem from "../molecules/TaskItem"

function CalendarPage() {
  const navigate = useNavigate()
  const { tasks, toggleTask } = useTasks()
  const [currentMonth, setCurrentMonth] = useState(new Date())

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

  const getTasksForDay = (day) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      return isSameDay(new Date(task.dueDate), day)
    })
  }

  const hasTasksOnDay = (day) => getTasksForDay(day).length > 0

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <IconButton
        iconName="ChevronLeft"
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="
          w-8 h-8 rounded-full bg-[#233240]
          hover:bg-[#364C59] flex items-center justify-center
          active:scale-95 transition-all duration-150
        "
        iconClassName="text-[#C7D4D9]"
      />
      <Text variant="h3" className="text-[#C7D4D9] capitalize">
        {format(currentMonth, "MMMM yyyy", { locale: es })}
      </Text>
      <IconButton
        iconName="ChevronRight"
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="
          w-8 h-8 rounded-full bg-[#233240]
          hover:bg-[#364C59] flex items-center justify-center
          active:scale-95 transition-all duration-150
        "
        iconClassName="text-[#C7D4D9]"
      />
    </div>
  )

  const renderDays = () => {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map(day => (
          <Text
            key={day}
            variant="muted"
            className="text-center text-[#77848C] py-1"
          >
            {day}
          </Text>
        ))}
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const hasTasks = hasTasksOnDay(cloneDay)
        const isSelected = isSameDay(cloneDay, selectedDay)
        const isCurrentMonth = isSameMonth(cloneDay, monthStart)
        const isTodayDate = isToday(cloneDay)

        days.push(
          <div
            key={day}
            onClick={() => setSelectedDay(cloneDay)}
            className={`
              relative flex flex-col items-center justify-center
              h-10 rounded-lg cursor-pointer transition-all duration-150
              ${isSelected ? "bg-[#7B2FBE]" : "hover:bg-[#233240]"}
              ${!isCurrentMonth ? "opacity-30" : ""}
            `}
          >
            <Text
              variant="small"
              className={`
                ${isSelected ? "text-white font-medium" : ""}
                ${isTodayDate && !isSelected ? "text-[#7B2FBE] font-medium" : "text-[#C7D4D9]"}
              `}
            >
              {format(cloneDay, "d")}
            </Text>
            {hasTasks && (
              <span className={`
                absolute bottom-1 w-1 h-1 rounded-full
                ${isSelected ? "bg-white" : "bg-[#7B2FBE]"}
              `} />
            )}
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>
      )
      days = []
    }
    return <div>{rows}</div>
  }

  const selectedDayTasks = getTasksForDay(selectedDay)

  return (
    <MainTemplate activeTab={activeTab} onTabChange={handleTabChange}>
      <Text variant="h2" className="text-[#C7D4D9] mb-4">
        Calendario
      </Text>

      <div className="bg-[#233240] border border-[#364C59] rounded-xl p-4 mb-4">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      <div>
        <Text variant="small" className="text-[#77848C] mb-3">
          {format(selectedDay, "EEEE d 'de' MMMM", { locale: es })}
        </Text>

        {selectedDayTasks.length === 0 ? (
          <Text variant="muted" className="text-[#364C59] text-center py-8">
            No hay tareas para este día
          </Text>
        ) : (
          <div className="flex flex-col gap-3">
            {selectedDayTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                className="
                  px-4 py-3 rounded-lg
                  bg-[#233240] border border-[#364C59]
                  hover:border-[#7B2FBE] transition-all duration-200
                "
              />
            ))}
          </div>
        )}
      </div>
    </MainTemplate>
  )
}

export default CalendarPage