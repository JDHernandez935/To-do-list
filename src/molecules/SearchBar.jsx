import Input from "../atoms/Input"
import Icon from "../atoms/Icon"

function SearchBar({ value, onChange, placeholder = "Buscar...", className = "", inputClassName = "", iconClassName = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon name="Search" size={16} className={`flex-shrink-0 ${iconClassName}`} />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-transparent outline-none w-full ${inputClassName}`}
      />
    </div>
  )
}

export default SearchBar