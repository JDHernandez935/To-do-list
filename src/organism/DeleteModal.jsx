import Button from "../atoms/Button"
import Text from "../atoms/Text"
import Icon from "../atoms/Icon"

function DeleteModal({ taskTitle, onConfirm, onCancel, className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-5 px-6 py-6 ${className}`}>

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "#4a1515" }}
      >
        <Icon name="AlertTriangle" size={32} color="#ff6b6b" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <Text variant="h3" style={{ color: "#C7D4D9", fontWeight: 600 }}>
          Eliminar tarea
        </Text>
        <Text variant="small" style={{ color: "#77848C" }}>
          Estás a punto de eliminar
        </Text>
        <Text variant="small" style={{ color: "#C7D4D9", fontWeight: 500 }}>
          "{taskTitle}"
        </Text>
        <Text variant="small" style={{ color: "#77848C" }}>
          Esta acción la enviará a la papelera
        </Text>
      </div>

      <div className="flex gap-3 w-full pt-2" style={{ borderTop: "1px solid #364C59" }}>
        <Button
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
          style={{ background: "#233240", color: "#77848C", border: "1px solid #364C59" }}
        >
          No, conservar
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all duration-150"
          style={{ background: "#ff6b6b", color: "#fff" }}
        >
          Sí, eliminar
        </Button>
      </div>

    </div>
  )
}

export default DeleteModal