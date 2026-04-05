import IconButton from "../molecules/IconButton"
import Text from "../atoms/Text"

function Navbar({ activeTab, onTabChange, className = "" }) {
  const tabs = [
    { id: "home", icon: "CheckSquare", label: "Tareas" },
    { id: "search", icon: "Search", label: "Buscar" },
    { id: "calendar", icon: "Calendar", label: "Calendario" },
    { id: "trash", icon: "Trash2", label: "Papelera" },
  ]

  return (
    <nav className={`flex items-center justify-around py-3 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex flex-col items-center gap-1
            transition-all duration-200 cursor-pointer
            ${tab.id === "add"
              ? `w-12 h-12 rounded-full
                 bg-[#7B2FBE] text-white
                 hover:bg-[#9B4FDE]
                 active:scale-95`
              : activeTab === tab.id
                ? "text-[#7B2FBE]"
                : "text-[#6a6a9a] hover:text-[#e0e0e0]"
            }
          `}
        >
          <IconButton
            iconName={tab.icon}
            size={tab.id === "add" ? 24 : 20}
            className="pointer-events-none"
          />
          {tab.label && (
            <Text variant="muted" className="text-[10px] text-current">
              {tab.label}
            </Text>
          )}
        </button>
      ))}
    </nav>
  )
}

export default Navbar