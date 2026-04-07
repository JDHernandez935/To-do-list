import { useState } from "react"
import FormField from "../molecules/FormField"
import IconButton from "../molecules/IconButton"
import Button from "../atoms/Button"
import Text from "../atoms/Text"

function TaskForm({ mode = "create", task = null, onSubmit, onCancel, onDelete, className = "" }) {
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

  return (
    <div className={`flex flex-col gap-5 ${className}`}>

      <div className="flex items-center justify-between">
        <Text variant="h3" className="text-[#C7D4D9]">
          {mode === "create" ? "Nueva tarea" : mode === "edit" ? "Editar tarea" : form.title}
        </Text>
        <IconButton
          iconName="X"
          onClick={onCancel}
          className="w-8 h-8 rounded-full bg-[#364C59] hover:bg-[#77848C]"
          iconClassName="text-[#C7D4D9]"
        />
      </div>

      <FormField
        label="Nombre"
        placeholder="¿Qué necesitas hacer?"
        value={form.title}
        onChange={handleChange("title")}
        required
        inputClassName={`
          bg-[#00010D] border-[#364C59]
          text-[#C7D4D9] placeholder-[#77848C]
          focus:border-[#7B2FBE]
          ${isReadOnly ? "pointer-events-none opacity-70" : ""}
        `}
      />

      <FormField
        label="Descripción"
        placeholder="Detalles opcionales..."
        value={form.description}
        onChange={handleChange("description")}
        inputClassName={`
          bg-[#00010D] border-[#364C59]
          text-[#C7D4D9] placeholder-[#77848C]
          focus:border-[#7B2FBE]
          ${isReadOnly ? "pointer-events-none opacity-70" : ""}
        `}
      />

      <div className="flex gap-3">
        <FormField
          label="Fecha límite"
          type="date"
          value={form.dueDate}
          onChange={handleChange("dueDate")}
          className="flex-1"
          inputClassName={`
            bg-[#00010D] border-[#364C59]
            text-[#C7D4D9]
            focus:border-[#7B2FBE]
            ${isReadOnly ? "pointer-events-none opacity-70" : ""}
          `}
        />
        <FormField
          label="Hora"
          type="time"
          value={form.dueTime}
          onChange={handleChange("dueTime")}
          className="flex-1"
          inputClassName={`
            bg-[#00010D] border-[#364C59]
            text-[#C7D4D9]
            focus:border-[#7B2FBE]
            ${isReadOnly ? "pointer-events-none opacity-70" : ""}
          `}
        />
      </div>

      {!isReadOnly && (
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSubmit}
            className="
              flex-1 py-2 rounded-lg font-medium
              bg-[#7B2FBE] text-white
              hover:bg-[#9B4FDE]
              active:scale-95 transition-all duration-150
            "
          >
            {isEdit ? "Guardar cambios" : "Crear tarea"}
          </Button>

          {isEdit && onDelete && (
            <IconButton
              iconName="Trash2"
              onClick={onDelete}
              className="
                w-10 h-10 rounded-lg
                bg-[#364C59] hover:bg-red-500
                active:scale-95 transition-all duration-150
              "
              iconClassName="text-[#C7D4D9]"
            />
          )}
        </div>
      )}

    </div>
  )
}

export default TaskForm