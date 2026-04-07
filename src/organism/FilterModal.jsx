import IconButton from "../molecules/IconButton"
import Text from "../atoms/Text"
import Icon from "../atoms/Icon"

function FilterModal({ activeFilter, onFilterChange, onClose, className = "" }) {
  const filters = [
    { id: "all", label: "Todas", icon: "LayoutGrid" },
    { id: "pending", label: "Pendientes", icon: "Clock" },
    { id: "completed", label: "Completadas", icon: "CheckCircle" },
    { id: "overdue", label: "Vencidas", icon: "AlertTriangle" },
    { id: "today", label: "Hoy", icon: "CalendarCheck" },
    { id: "soon", label: "Próximas", icon: "CalendarClock" },
  ]

  return (
    <div className={`flex flex-col gap-3 px-4 ${className}`}>

      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={18} color="#7B2FBE" />
          <Text variant="h3" style={{ color: "#C7D4D9", fontWeight: 600 }}>
            Filtrar tareas
          </Text>
        </div>
        <IconButton
          iconName="X"
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ background: "#364C59" }}
          iconClassName="text-[#C7D4D9]"
        />
      </div>

      <div
        className="flex items-center justify-between py-2"
        style={{ borderBottom: "1px solid #364C59", borderTop: "1px solid #364C59" }}
      >
        <button
          onClick={() => onFilterChange("all")}
          className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: "#7B2FBE", fontSize: 12, fontWeight: 500 }}
        >
          <Icon name="CheckCheck" size={13} color="#7B2FBE" />
          Seleccionar todo
        </button>
        <button
          onClick={() => onFilterChange("all")}
          className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: "#77848C", fontSize: 12 }}
        >
          <Icon name="X" size={13} color="#77848C" />
          Limpiar
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {filters.map(filter => {
          const isActive = activeFilter === filter.id
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 text-left"
              style={{
                background: isActive ? "#364C59" : "transparent",
                borderLeft: isActive ? "3px solid #7B2FBE" : "3px solid transparent",
              }}
            >
              <Icon
                name={filter.icon}
                size={16}
                color={isActive ? "#7B2FBE" : "#77848C"}
              />
              <Text
                variant="small"
                className="flex-1 font-medium"
                style={{ color: isActive ? "#C7D4D9" : "#77848C" }}
              >
                {filter.label}
              </Text>
              {isActive && (
                <Icon name="Check" size={14} color="#7B2FBE" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterModal