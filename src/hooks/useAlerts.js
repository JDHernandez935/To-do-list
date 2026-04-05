import { useState } from "react"

function useAlerts() {
  const [alerts, setAlerts] = useState([])

  const addAlert = (type, message, duration = 3000) => {
    const id = Date.now()
    setAlerts(prev => [...prev, { id, type, message, duration }])
  }

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return {
    alerts,
    success: (msg) => addAlert("success", msg),
    error: (msg) => addAlert("error", msg),
    warning: (msg) => addAlert("warning", msg),
    info: (msg) => addAlert("info", msg),
    removeAlert,
  }
}

export default useAlerts