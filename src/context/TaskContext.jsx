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

  const [activeFilter, setActiveFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))
  }, [deletedTasks])

  const addTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description || "",
      dueDate: data.dueDate || null,
      dueTime: data.dueTime || null,
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
    if (activeFilter === "all") return true
    if (activeFilter === "pending") return !task.completed
    if (activeFilter === "completed") return task.completed
    if (!task.dueDate) return false
    const today = new Date()
    const due = new Date(task.dueDate)
    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
    if (activeFilter === "overdue") return diff < 0 && !task.completed
    if (activeFilter === "today") return diff === 0
    if (activeFilter === "soon") return diff > 0 && diff <= 3
    return true
  })

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      deletedTasks,
      activeFilter,
      setActiveFilter,
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