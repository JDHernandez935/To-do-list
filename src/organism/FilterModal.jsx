import FilterChip from "../molecules/FilterChip"
import IconButton from "../molecules/IconButton"
import Text from "../atoms/Text"
import Button from "../atoms/Button"

function FilterModal({ activeFilter, onFilterChange, onClose, className = "" }) {
  const filters = [
    { id: "all", label: "Todas" },
    { id: "pending", label: "Pendientes" },
    { id: "completed", label: "Completadas" },
    { id: "overdue", label: "Vencidas" },
    { id: "today", label: "Hoy" },
    { id: "soon", label: "Próximas" },
  ]

  return (
    <div className={`flex flex-col gap-5 ${className}`}>

      <div className="flex items-center justify-between">
        <Text variant="h3" className="text-[#e0e0e0]">
          Filtrar tareas
        </Text>
        <IconButton
          iconName="X"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#4a4a6a] hover:bg-[#6a6a9a]"
          iconClassName="text-[#e0e0e0]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            active={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
            activeClassName="bg-[#7B2FBE] text-white"
            inactiveClassName="
              bg-[#2a2a4a] text-[#6a6a9a]
              border border-[#4a4a6a]
              hover:border-[#7B2FBE]
            "
          />
        ))}
      </div>

      <Button
        onClick={onClose}
        className="
          w-full py-2 rounded-lg font-medium
          bg-[#7B2FBE] text-white
          hover:bg-[#9B4FDE]
          active:scale-95 transition-all duration-150
        "
      >
        Aplicar filtro
      </Button>

    </div>
  )
}

export default FilterModal