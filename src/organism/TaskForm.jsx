import { useState } from "react"
import Icon from "../atoms/Icon"
import Button from "../atoms/Button"
import IconButton from "../molecules/IconButton"

function TaskForm({ mode = "create", task = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    dueTime: task?.dueTime || "",
    priority: task?.priority || "none",
  })

  const isReadOnly = mode === "readonly"
  const isEdit = mode === "edit"

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.title.trim()) return
    onSubmit(form)
  }

  const modeConfig = {
    create: { icon: "Plus", title: "Nueva tarea", color: "#7B2FBE" },
    edit: { icon: "Pencil", title: "Editar tarea", color: "#7B2FBE" },
    readonly: { icon: "Eye", title: task?.title || "Detalle", color: "var(--surface2)" },
  }

  const config = modeConfig[mode]

  const inputBase = {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    borderRadius: "8px",
    padding: "8px 12px",
    width: "100%",
    outline: "none",
    fontSize: "14px",
    transition: "border-color 0.2s",
    opacity: isReadOnly ? 0.6 : 1,
    pointerEvents: isReadOnly ? "none" : "auto",
  }

  const inputWithIcon = { ...inputBase, paddingLeft: "36px" }

  const priorities = [
    { id: "none", label: "Ninguna", bg: "var(--surface2)", color: "var(--text-muted)" },
    { id: "low", label: "Baja", bg: "#14532d", color: "#4ade80" },
    { id: "medium", label: "Media", bg: "#854d0e", color: "#facc15" },
    { id: "high", label: "Alta", bg: "#4a1515", color: "#ff6b6b" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>

      <div style={{ display: "flex", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: config.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 12 }}>
          <Icon name={config.icon} size={15} color="#fff" />
        </div>
        <span style={{ color: "var(--text)", fontWeight: 600, fontSize: 18, flex: 1 }}>
          {config.title}
        </span>
        <IconButton
          iconName="X"
          size={14}
          onClick={onCancel}
          className="w-8 h-8 rounded-full flex-shrink-0"
          iconClassName="text-[var(--text)]"
          style={{ background: "var(--surface2)" }}
        />
      </div>

      <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
        Organiza tu día de forma eficiente
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
            Nombre <span style={{ color: "#ff6b6b" }}>*</span>
          </span>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="Type" size={14} color="var(--text-muted)" />
            </div>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="¿Qué necesitas hacer?"
              style={inputWithIcon}
              onFocus={e => e.target.style.borderColor = "#7B2FBE"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Descripción</span>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: 12, pointerEvents: "none" }}>
              <Icon name="AlignLeft" size={14} color="var(--text-muted)" />
            </div>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Detalles opcionales..."
              rows={3}
              style={{ ...inputWithIcon, resize: "none", paddingTop: 10 }}
              onFocus={e => e.target.style.borderColor = "#7B2FBE"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="Flag" size={12} color="var(--text-muted)" />
            Prioridad
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {priorities.map(p => (
              <button
                key={p.id}
                onClick={() => setForm(prev => ({ ...prev, priority: p.id }))}
                style={{
                  flex: 1, padding: "6px 0", borderRadius: 8, cursor: "pointer",
                  fontSize: 12, fontWeight: 500, border: "none",
                  background: form.priority === p.id ? p.bg : "var(--surface2)",
                  color: form.priority === p.id ? p.color : "var(--text-muted)",
                  outline: form.priority === p.id ? `1px solid ${p.color}` : "none",
                  opacity: isReadOnly ? 0.6 : 1,
                  pointerEvents: isReadOnly ? "none" : "auto",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Programación</span>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
              <span style={{ color: "var(--text-muted)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="Calendar" size={11} color="var(--text-muted)" />
                Fecha
              </span>
              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange("dueDate")}
                onClick={e => e.target.showPicker()}
                style={inputBase}
                onFocus={e => e.target.style.borderColor = "#7B2FBE"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
              <span style={{ color: "var(--text-muted)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="Clock" size={11} color="var(--text-muted)" />
                Hora
              </span>
              <input
                type="time"
                value={form.dueTime}
                onChange={handleChange("dueTime")}
                onClick={e => e.target.showPicker()}
                style={inputBase}
                onFocus={e => e.target.style.borderColor = "#7B2FBE"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>
          </div>
        </div>

      </div>

      {isEdit && (
        <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
          <Button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
            style={{ background: "var(--surface2)", color: "var(--text)" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
            style={{ background: "#7B2FBE", color: "#fff" }}
          >
            <Icon name="Save" size={15} color="#fff" />
            Guardar cambios
          </Button>
        </div>
      )}

      {mode === "create" && (
        <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
          <Button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
            style={{ background: "var(--surface2)", color: "var(--text)" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
            style={{ background: "#7B2FBE", color: "#fff" }}
          >
            <Icon name="Plus" size={15} color="#fff" />
            Crear tarea
          </Button>
        </div>
      )}

    </div>
  )
}

export default TaskForm