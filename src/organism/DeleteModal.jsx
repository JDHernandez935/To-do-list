import Button from "../atoms/Button"
import Text from "../atoms/Text"
import Icon from "../atoms/Icon"

function DeleteModal({ taskTitle, onConfirm, onCancel, className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-5 px-6 py-6 ${className}`}>

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "var(--danger-bg)" }}
      >
        <Icon name="AlertTriangle" size={32} color="var(--danger)" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <Text variant="h3" style={{ color: "var(--text)", fontWeight: 600 }}>
          Eliminar tarea
        </Text>
        <Text variant="small" style={{ color: "var(--text-muted)" }}>
          Estás a punto de eliminar
        </Text>
        <Text variant="small" style={{ color: "var(--text)", fontWeight: 500 }}>
          "{taskTitle}"
        </Text>
        <Text variant="small" style={{ color: "var(--text-muted)" }}>
          Esta acción la enviará a la papelera
        </Text>
      </div>

      <div className="flex gap-3 w-full pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <Button
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
          style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
        >
          No, conservar
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
          style={{ background: "var(--danger-bg)", color: "var(--danger)" }}
        >
          Sí, eliminar
        </Button>
      </div>

    </div>
  )
}

export default DeleteModal