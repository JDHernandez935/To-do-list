import Button from "../atoms/Button"
import Icon from "../atoms/Icon"

function Toggle({ enabled, onChange, enabledClassName = "", disabledClassName = "", enabledIcon = "Sun", disabledIcon = "Moon" }) {
  return (
    <Button
      onClick={onChange}
      className={`
        relative w-14 h-7 rounded-full
        transition-all duration-300
        flex items-center px-1
        ${enabled ? enabledClassName : disabledClassName}
      `}
    >
      <span
        className={`
          w-5 h-5 rounded-full flex items-center justify-center
          transition-all duration-300
          ${enabled ? "translate-x-7 bg-white text-[#7B2FBE]" : "translate-x-0 bg-[#e0e0e0] text-[#4a4a6a]"}
        `}
      >
        <Icon name={enabled ? enabledIcon : disabledIcon} size={12} />
      </span>
    </Button>
  )
}

export default Toggle