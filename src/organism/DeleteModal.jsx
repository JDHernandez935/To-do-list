import IconButton from "../molecules/IconButton"
import Button from "../atoms/Button"
import Text from "../atoms/Text"
import Icon from "../atoms/Icon"

function DeleteModal({ taskTitle, onConfirm, onCancel, className = "" }) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>

      <div className="flex items-center justify-between">
        <Text variant="h3" className="text-[#C7D4D9]">
          Eliminar tarea
        </Text>
        <IconButton
          iconName="X"
          onClick={onCancel}
          className="w-8 h-8 rounded-full bg-[#364C59] hover:bg-[#77848C]"
          iconClassName="text-[#C7D4D9]"
        />
      </div>

      <div className="flex flex-col items-center gap-3 py-4">
        <Icon name="Trash2" size={48} className="text-red-400" />
        <Text variant="body" className="text-[#C7D4D9] text-center">
          ¿Estás seguro que deseas eliminar?
        </Text>
        <Text variant="small" className="text-[#7B2FBE] text-center font-medium">
          "{taskTitle}"
        </Text>
        <Text variant="muted" className="text-[#77848C] text-center">
          Esta acción no se puede deshacer
        </Text>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onCancel}
          className="
            flex-1 py-2 rounded-lg font-medium
            bg-[#364C59] text-[#C7D4D9]
            hover:bg-[#77848C]
            active:scale-95 transition-all duration-150
          "
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          className="
            flex-1 py-2 rounded-lg font-medium
            bg-red-500 text-white
            hover:bg-red-600
            active:scale-95 transition-all duration-150
          "
        >
          Eliminar
        </Button>
      </div>

    </div>
  )
}

export default DeleteModal