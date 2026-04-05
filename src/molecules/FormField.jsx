import Text from "../atoms/Text"
import Input from "../atoms/Input"

function FormField({ label, placeholder, value, onChange, type = "text", className = "", inputClassName = "", required = false }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Text variant="small" className="font-medium">
        {label} {required && <span className="text-red-400">*</span>}
      </Text>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-lg border ${inputClassName}`}
      />
    </div>
  )
}

export default FormField