import { createContext, useState, useEffect } from "react"

export const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const [deletedTasks, setDeletedTasks] = useState(() => {
    const saved = localStorage.getItem("deletedTasks")
    return saved ? JSON.parse(saved) : []
  })

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    dateFrom: "",
    dateTo: "",
    timeOfDay: "all",
  })

  const [search, setSearch] = useState("")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))
  }, [deletedTasks])

  useEffect(() => {
    const now = new Date()
    const filtered = deletedTasks.filter(task => {
      const deleted = new Date(task.deletedAt)
      const diff = Math.ceil((now - deleted) / (1000 * 60 * 60 * 24))
      return diff <= 10
    })
    if (filtered.length !== deletedTasks.length) {
      setDeletedTasks(filtered)
    }
  }, [])

  const addTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description || "",
      dueDate: data.dueDate || null,
      dueTime: data.dueTime || null,
      priority: data.priority || "none",
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
    return newTask
  }

  const editTask = (id, data) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...data } : task
    ))
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      setDeletedTasks(prev => [
        { ...task, deletedAt: new Date().toISOString() },
        ...prev
      ])
      setTasks(prev => prev.filter(t => t.id !== id))
    }
  }

  const restoreTask = (id) => {
    const task = deletedTasks.find(t => t.id === id)
    if (task) {
      const { deletedAt: _deletedAt, ...restored } = task
      setTasks(prev => [restored, ...prev])
      setDeletedTasks(prev => prev.filter(t => t.id !== id))
    }
  }

  const permanentDelete = (id) => {
    setDeletedTasks(prev => prev.filter(t => t.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (filters.status === "pending" && task.completed) return false
    if (filters.status === "completed" && !task.completed) return false

    if (filters.priority !== "all" && task.priority !== filters.priority) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (filters.status === "overdue") {
      if (!task.dueDate) return false
      const due = new Date(task.dueDate)
      due.setHours(0, 0, 0, 0)
      if (due >= today || task.completed) return false
    }

    if (filters.status === "today") {
      if (!task.dueDate) return false
      const due = new Date(task.dueDate)
      due.setHours(0, 0, 0, 0)
      if (due.getTime() !== today.getTime()) return false
    }

    if (filters.status === "soon") {
      if (!task.dueDate) return false
      const due = new Date(task.dueDate)
      due.setHours(0, 0, 0, 0)
      const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
      if (diff <= 0 || diff > 3) return false
    }

    if (filters.dateFrom && task.dueDate) {
      if (new Date(task.dueDate) < new Date(filters.dateFrom)) return false
    }

    if (filters.dateTo && task.dueDate) {
      if (new Date(task.dueDate) > new Date(filters.dateTo)) return false
    }

    if (filters.timeOfDay !== "all" && task.dueTime) {
      const hour = parseInt(task.dueTime.split(":")[0])
      if (filters.timeOfDay === "morning" && !(hour >= 6 && hour < 12)) return false
      if (filters.timeOfDay === "afternoon" && !(hour >= 12 && hour < 18)) return false
      if (filters.timeOfDay === "night" && !(hour >= 18 || hour < 6)) return false
    }

    return true
  })

  const activeFilter = filters.status

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      deletedTasks,
      filters,
      setFilters,
      activeFilter,
      setActiveFilter: (status) => setFilters(prev => ({ ...prev, status })),
      search,
      setSearch,
      addTask,
      editTask,
      toggleTask,
      deleteTask,
      restoreTask,
      permanentDelete,
    }}>
      {children}
    </TaskContext.Provider>
  )
}