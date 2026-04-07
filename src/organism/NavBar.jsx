import IconButton from "../molecules/IconButton"
import Text from "../atoms/Text"

function Navbar({ activeTab, onTabChange, className = "" }) {
  const tabs = [
    { id: "home", icon: "CheckSquare", label: "Tareas" },
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
            ${activeTab === tab.id
              ? "text-[#7B2FBE]"
              : "hover:opacity-80"
            }
          `}
          style={{ color: activeTab === tab.id ? "#7B2FBE" : "var(--text-muted)" }}
        >
          <IconButton
            iconName={tab.icon}
            size={20}
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