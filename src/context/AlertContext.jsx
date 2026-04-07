import { createContext, useState } from "react"

export const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([])

  const addAlert = (type, message, duration = 3000) => {
    const id = Date.now()
    setAlerts(prev => [...prev, { id, type, message, duration }])
  }

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <AlertContext.Provider value={{
      alerts,
      success: (msg) => addAlert("success", msg),
      error: (msg) => addAlert("error", msg),
      warning: (msg) => addAlert("warning", msg),
      info: (msg) => addAlert("info", msg),
      removeAlert,
    }}>
      {children}
    </AlertContext.Provider>
  )
}