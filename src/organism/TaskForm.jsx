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
    readonly: { icon: "Eye", title: task?.title || "Detalle", color: "#364C59" },
  }

  const config = modeConfig[mode]

  const inputBase = {
    background: "#00010D",
    border: "1px solid #364C59",
    color: "#C7D4D9",
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>

      <div style={{ display: "flex", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid #364C59" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: config.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 12 }}>
          <Icon name={config.icon} size={15} color="#fff" />
        </div>
        <span style={{ color: "#C7D4D9", fontWeight: 600, fontSize: 18, flex: 1 }}>
          {config.title}
        </span>
        <IconButton
          iconName="X"
          size={14}
          onClick={onCancel}
          className="w-8 h-8 rounded-full flex-shrink-0"
          iconClassName="text-[#C7D4D9]"
          style={{ background: "#364C59" }}
        />
      </div>

      <span style={{ color: "#77848C", fontSize: 13 }}>
        Organiza tu día de forma eficiente
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#77848C", fontSize: 12 }}>
            Nombre <span style={{ color: "#ff6b6b" }}>*</span>
          </span>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="Type" size={14} color="#77848C" />
            </div>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="¿Qué necesitas hacer?"
              style={inputWithIcon}
              onFocus={e => e.target.style.borderColor = "#7B2FBE"}
              onBlur={e => e.target.style.borderColor = "#364C59"}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#77848C", fontSize: 12 }}>Descripción</span>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: 12, pointerEvents: "none" }}>
              <Icon name="AlignLeft" size={14} color="#77848C" />
            </div>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Detalles opcionales..."
              rows={3}
              style={{ ...inputWithIcon, resize: "none", paddingTop: 10 }}
              onFocus={e => e.target.style.borderColor = "#7B2FBE"}
              onBlur={e => e.target.style.borderColor = "#364C59"}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#77848C", fontSize: 12 }}>Programación</span>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
              <span style={{ color: "#77848C", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="Calendar" size={11} color="#77848C" />
                Fecha
              </span>
              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange("dueDate")}
                onClick={e => e.target.showPicker()}
                style={inputBase}
                onFocus={e => e.target.style.borderColor = "#7B2FBE"}
                onBlur={e => e.target.style.borderColor = "#364C59"}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
              <span style={{ color: "#77848C", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="Clock" size={11} color="#77848C" />
                Hora
              </span>
              <input
                type="time"
                value={form.dueTime}
                onChange={handleChange("dueTime")}
                onClick={e => e.target.showPicker()}
                style={inputBase}
                onFocus={e => e.target.style.borderColor = "#7B2FBE"}
                onBlur={e => e.target.style.borderColor = "#364C59"}
              />
            </div>
          </div>
        </div>

      </div>

      {isEdit && (
        <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid #364C59" }}>
          <Button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
            style={{ background: "#364C59", color: "#C7D4D9" }}
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
        <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid #364C59" }}>
          <Button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
            style={{ background: "#364C59", color: "#C7D4D9" }}
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