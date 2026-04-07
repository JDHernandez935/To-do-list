import { useState, useEffect } from "react"

export function useAlertAnimation(duration, onClose) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(enterTimer)
  }, [])

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setLeaving(true)
      setTimeout(() => onClose(), 400)
    }, duration)
    return () => clearTimeout(leaveTimer)
  }, [])

  return { visible, leaving }
}