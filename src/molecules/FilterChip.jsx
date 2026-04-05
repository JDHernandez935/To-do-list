import Button from "../atoms/Button"
import Text from "../atoms/Text"

function FilterChip({ label, active, onClick, className = "", activeClassName = "", inactiveClassName = "" }) {
  return (
    <Button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full transition-all duration-200
        ${active ? activeClassName : inactiveClassName}
        ${className}
      `}
    >
      <Text variant="small" className="font-medium">
        {label}
      </Text>
    </Button>
  )
}

export default FilterChip