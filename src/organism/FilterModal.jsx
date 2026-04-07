import { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import IconButton from "../molecules/IconButton"
import Icon from "../atoms/Icon"
import Button from "../atoms/Button"

function FilterModal({ onClose, className = "" }) {
  const { filters, setFilters } = useTasks()
  const [local, setLocal] = useState({ ...filters })

  const update = (key, value) => {
    setLocal(prev => ({ ...prev, [key]: value }))
  }

  const apply = () => {
    setFilters(local)
    onClose()
  }

  const clear = () => {
    const reset = { status: "all", priority: "all", dateFrom: "", dateTo: "", timeOfDay: "all" }
    setLocal(reset)
    setFilters(reset)
    onClose()
  }

  const statusOptions = [
    { id: "all", label: "Todas", icon: "LayoutGrid", color: "var(--text-muted)" },
    { id: "pending", label: "Pendientes", icon: "Clock", color: "#facc15" },
    { id: "completed", label: "Completadas", icon: "CheckCircle", color: "#4ade80" },
    { id: "overdue", label: "Vencidas", icon: "AlertTriangle", color: "#ff6b6b" },
    { id: "today", label: "Hoy", icon: "CalendarCheck", color: "#7B2FBE" },
    { id: "soon", label: "Próximas", icon: "CalendarClock", color: "#60a5fa" },
  ]

  const priorityOptions = [
    { id: "all", label: "Todas", color: "var(--text-muted)", bg: "var(--surface2)" },
    { id: "high", label: "Alta", color: "#fff", bg: "#ff6b6b" },
    { id: "medium", label: "Media", color: "#fff", bg: "#BA7517" },
    { id: "low", label: "Baja", color: "#fff", bg: "#14532d" },
  ]

  const timeOptions = [
    { id: "all", label: "Cualquiera", icon: "Clock" },
    { id: "morning", label: "Mañana", icon: "Sunrise" },
    { id: "afternoon", label: "Tarde", icon: "Sun" },
    { id: "night", label: "Noche", icon: "Moon" },
  ]

  const inputStyle = {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    borderRadius: "8px",
    padding: "6px 10px",
    fontSize: "13px",
    outline: "none",
    width: "100%",
  }

  return (
    <div className={`flex flex-col ${className}`} style={{ maxHeight: "80vh" }}>

      <div style={{ padding: "16px 16px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="SlidersHorizontal" size={18} color="#7B2FBE" />
            <span style={{ color: "var(--text)", fontWeight: 600, fontSize: 16 }}>Filtrar tareas</span>
          </div>
          <IconButton
            iconName="X"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ background: "var(--surface2)" }}
            iconClassName="text-[var(--text)]"
          />
        </div>
        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
          Ajusta los criterios de búsqueda
        </span>
      </div>

      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Icon name="Tag" size={12} color="var(--text-muted)" />
            Estado
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {statusOptions.map(opt => {
              const isActive = local.status === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => update("status", opt.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 12px", borderRadius: 10, cursor: "pointer",
                    background: isActive ? "var(--surface2)" : "var(--surface)",
                    border: isActive ? `1px solid ${opt.color}` : "1px solid var(--border)",
                    transition: "all 0.15s",
                  }}
                >
                  <Icon name={opt.icon} size={14} color={isActive ? opt.color : "var(--text-muted)"} />
                  <span style={{ color: isActive ? "var(--text)" : "var(--text-muted)", fontSize: 13, fontWeight: isActive ? 500 : 400 }}>
                    {opt.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Icon name="Calendar" size={12} color="var(--text-muted)" />
            Fecha
          </span>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {["today", "soon"].map(shortcut => {
              const labels = { today: "Hoy", soon: "Esta semana" }
              const isActive = local.status === shortcut
              return (
                <button
                  key={shortcut}
                  onClick={() => update("status", shortcut)}
                  style={{
                    padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12,
                    background: isActive ? "#7B2FBE" : "var(--surface)",
                    color: isActive ? "#fff" : "var(--text-muted)",
                    border: isActive ? "1px solid #7B2FBE" : "1px solid var(--border)",
                  }}
                >
                  {labels[shortcut]}
                </button>
              )
            })}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <span style={{ color: "var(--text-muted)", fontSize: 11, display: "block", marginBottom: 4 }}>Desde</span>
              <input
                type="date"
                value={local.dateFrom}
                onChange={e => update("dateFrom", e.target.value)}
                onClick={e => e.target.showPicker()}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#7B2FBE"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "var(--text-muted)", fontSize: 11, display: "block", marginBottom: 4 }}>Hasta</span>
              <input
                type="date"
                value={local.dateTo}
                onChange={e => update("dateTo", e.target.value)}
                onClick={e => e.target.showPicker()}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#7B2FBE"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Icon name="Clock" size={12} color="var(--text-muted)" />
            Hora del día
          </span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {timeOptions.map(opt => {
              const isActive = local.timeOfDay === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => update("timeOfDay", opt.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12,
                    background: isActive ? "var(--surface2)" : "var(--surface)",
                    color: isActive ? "var(--text)" : "var(--text-muted)",
                    border: isActive ? "1px solid #7B2FBE" : "1px solid var(--border)",
                  }}
                >
                  <Icon name={opt.icon} size={13} color={isActive ? "#7B2FBE" : "var(--text-muted)"} />
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, paddingBottom: 12 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Icon name="Flag" size={12} color="var(--text-muted)" />
            Prioridad
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {priorityOptions.map(opt => {
              const isActive = local.priority === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => update("priority", opt.id)}
                  style={{
                    flex: 1, padding: "6px 0", borderRadius: 20, cursor: "pointer",
                    fontSize: 12, fontWeight: 500,
                    background: isActive ? opt.bg : "var(--surface)",
                    color: isActive ? opt.color : "var(--text-muted)",
                    border: isActive ? `1px solid ${opt.bg}` : "1px solid var(--border)",
                  }}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

      </div>

      <div style={{ padding: "12px 16px", flexShrink: 0, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
        <Button
          onClick={clear}
          className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
          style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
        >
          Limpiar
        </Button>
        <Button
          onClick={apply}
          className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
          style={{ background: "#7B2FBE", color: "#fff" }}
        >
          Aplicar filtros
        </Button>
      </div>

    </div>
  )
}

export default FilterModal