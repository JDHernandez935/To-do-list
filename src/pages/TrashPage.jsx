import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import MainTemplate from "../templates/MainTemplate"
import ModalTemplate from "../templates/ModalTemplate"
import DeleteModal from "../organism/DeleteModal"
import Icon from "../atoms/Icon"

function TrashPage() {
  const navigate = useNavigate()
  const { deletedTasks, restoreTask, permanentDelete } = useTasks()
  const { success } = useAlerts()
  const [activeTab, setActiveTab] = useState("trash")
  const [confirmId, setConfirmId] = useState(null)
  const [confirmAll, setConfirmAll] = useState(false)
  const [selected, setSelected] = useState([])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "home") navigate("/")
    if (tab === "calendar") navigate("/calendar")
  }

  const handleRestore = (id) => {
    restoreTask(id)
    setSelected(prev => prev.filter(s => s !== id))
    success("Tarea restaurada correctamente")
  }

  const handleRestoreSelected = () => {
    selected.forEach(id => restoreTask(id))
    success(`${selected.length} tarea(s) restaurada(s)`)
    setSelected([])
  }

  const handleRestoreAll = () => {
    deletedTasks.forEach(t => restoreTask(t.id))
    success("Todas las tareas restauradas")
    setSelected([])
  }

  const handlePermanentDelete = (id) => {
    permanentDelete(id)
    setConfirmId(null)
    setSelected(prev => prev.filter(s => s !== id))
    success("Tarea eliminada permanentemente")
  }

  const handleEmptyTrash = () => {
    deletedTasks.forEach(t => permanentDelete(t.id))
    setConfirmAll(false)
    setSelected([])
    success("Papelera vaciada")
  }

  const handleDeleteSelected = () => {
    selected.forEach(id => permanentDelete(id))
    success(`${selected.length} tarea(s) eliminada(s) permanentemente`)
    setSelected([])
  }

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const getDaysLeft = (deletedAt) => {
    const deleted = new Date(deletedAt)
    const expires = new Date(deleted.getTime() + 10 * 24 * 60 * 60 * 1000)
    const today = new Date()
    return Math.ceil((expires - today) / (1000 * 60 * 60 * 24))
  }

  const getDaysAgo = (deletedAt) => {
    const deleted = new Date(deletedAt)
    const today = new Date()
    return Math.floor((today - deleted) / (1000 * 60 * 60 * 24))
  }

  const taskToDelete = deletedTasks.find(t => t.id === confirmId)
  const sortedTasks = [...deletedTasks].sort((a, b) => getDaysLeft(a.deletedAt) - getDaysLeft(b.deletedAt))

  return (
    <>
      <MainTemplate activeTab={activeTab} onTabChange={handleTabChange} noPadding>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="Trash2" size={20} color="var(--text-muted)" />
                <span style={{ color: "var(--text)", fontSize: 20, fontWeight: 600 }}>
                  Papelera
                </span>
                {deletedTasks.length > 0 && (
                  <span style={{ background: "var(--surface2)", color: "var(--text-muted)", fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 20 }}>
                    {deletedTasks.length}
                  </span>
                )}
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2, display: "block" }}>
                Las tareas se eliminan permanentemente después de 10 días
              </span>
            </div>

            {deletedTasks.length > 0 && (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleRestoreAll}
                  style={{ padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500, background: "var(--surface)", color: "#7B2FBE", border: "1px solid #7B2FBE" }}
                >
                  Restaurar todo
                </button>
                <button
                  onClick={() => setConfirmAll(true)}
                  style={{ padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500, background: "var(--danger-bg)", color: "var(--danger)", border: "1px solid var(--danger)" }}
                >
                  Vaciar papelera
                </button>
              </div>
            )}
          </div>

          {selected.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: "var(--surface)", border: "1px solid #7B2FBE" }}>
              <span style={{ color: "var(--text)", fontSize: 13 }}>
                {selected.length} seleccionada(s)
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleRestoreSelected}
                  style={{ padding: "4px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, background: "#7B2FBE", color: "#fff", border: "none" }}
                >
                  Restaurar
                </button>
                <button
                  onClick={handleDeleteSelected}
                  style={{ padding: "4px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, background: "var(--danger-bg)", color: "var(--danger)", border: "none" }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}

          {deletedTasks.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: "50vh" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Trash2" size={28} color="var(--surface2)" />
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: 15, fontWeight: 500 }}>La papelera está vacía</span>
              <span style={{ color: "var(--border)", fontSize: 13 }}>Las tareas eliminadas aparecerán aquí</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sortedTasks.map(task => {
                const daysLeft = getDaysLeft(task.deletedAt)
                const daysAgo = getDaysAgo(task.deletedAt)
                const isSelected = selected.includes(task.id)
                const isUrgent = daysLeft <= 2
                const progress = ((10 - daysLeft) / 10) * 100

                return (
                  <div
                    key={task.id}
                    style={{
                      borderRadius: 12, background: "var(--surface)",
                      border: isSelected ? "1px solid #7B2FBE" : "1px solid var(--border)",
                      transition: "all 0.15s", overflow: "hidden",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>

                      <button
                        onClick={() => toggleSelect(task.id)}
                        style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: "pointer",
                          background: isSelected ? "#7B2FBE" : "var(--surface2)",
                          border: isSelected ? "none" : "1px solid var(--border2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {isSelected && <Icon name="Check" size={10} color="#fff" />}
                      </button>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ color: "var(--text-muted)", fontSize: 14, textDecoration: "line-through", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {task.title}
                        </span>
                        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                          <span style={{ color: "var(--border2)", fontSize: 11 }}>
                            Eliminada hace {daysAgo}d
                          </span>
                          <span style={{ color: isUrgent ? "var(--danger)" : "var(--text-muted)", fontSize: 11, fontWeight: isUrgent ? 600 : 400 }}>
                            Expira en {daysLeft}d
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button
                          onClick={() => handleRestore(task.id)}
                          style={{ padding: "4px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500, background: "var(--surface2)", color: "#7B2FBE", border: "1px solid #7B2FBE", transition: "all 0.15s" }}
                        >
                          Restaurar
                        </button>
                        <button
                          onClick={() => setConfirmId(task.id)}
                          style={{ width: 28, height: 28, borderRadius: 8, cursor: "pointer", background: "var(--danger-bg)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                        >
                          <Icon name="Trash2" size={13} color="var(--danger)" />
                        </button>
                      </div>
                    </div>

                    <div style={{ height: 3, background: "var(--surface2)" }}>
                      <div style={{
                        height: "100%", borderRadius: 2, transition: "width 0.3s",
                        width: `${progress}%`,
                        background: isUrgent ? "var(--danger)" : daysLeft <= 5 ? "#facc15" : "#7B2FBE",
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </MainTemplate>

      {confirmId && taskToDelete && (
        <ModalTemplate onClose={() => setConfirmId(null)}>
          <DeleteModal
            taskTitle={taskToDelete.title}
            onConfirm={() => handlePermanentDelete(confirmId)}
            onCancel={() => setConfirmId(null)}
          />
        </ModalTemplate>
      )}

      {confirmAll && (
        <ModalTemplate onClose={() => setConfirmAll(false)}>
          <DeleteModal
            taskTitle={`${deletedTasks.length} tarea(s) de la papelera`}
            onConfirm={handleEmptyTrash}
            onCancel={() => setConfirmAll(false)}
          />
        </ModalTemplate>
      )}
    </>
  )
}

export default TrashPage