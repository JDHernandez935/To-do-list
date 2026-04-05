import { useState } from "react"

import Button from "./atoms/Button"
import Input from "./atoms/Input"
import Badge from "./atoms/Badge"
import Checkbox from "./atoms/Checkbox"
import Text from "./atoms/Text"
import Icon from "./atoms/Icon"
import Toggle from "./molecules/Toggle"

function App() {
  const [checked, setChecked] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="p-8 flex flex-col gap-6 bg-[#1a1a2e] min-h-screen">

      <Text variant="h2" className="text-[#e0e0e0]">Buttons</Text>
      <div className="flex gap-3 items-center">
        <Button className="
          px-5 py-2 rounded-lg font-medium
          bg-[#7B2FBE] text-white
          hover:bg-[#9B4FDE]
          active:scale-95 active:brightness-90
          transition-all duration-150
        ">
          Crear tarea
        </Button>

        <Button className="
          px-5 py-2 rounded-lg font-medium
          bg-[#1E90FF] text-white
          flex items-center gap-2
          hover:bg-[#3aa0ff]
          active:scale-95 active:brightness-90
          transition-all duration-150
        ">
          <Icon name="Plus" size={16} />
          Agregar
        </Button>

        <Button className="
          w-11 h-11 rounded-full
          bg-[#4a4a6a] text-[#e0e0e0]
          flex items-center justify-center
          hover:bg-[#6a6a9a]
          active:scale-95 active:brightness-90
          transition-all duration-150
        ">
          <Icon name="Search" size={18} />
        </Button>
      </div>

      <Text variant="h2" className="text-[#e0e0e0]">Input</Text>
      <Input
        placeholder="Buscar tarea..."
        className="
          px-4 py-2 rounded-lg
          bg-[#2a2a4a] text-[#e0e0e0]
          border border-[#4a4a6a]
          placeholder-[#6a6a9a]
          focus:border-[#1E90FF]
          transition-all duration-200
        "
      />

      <Text variant="h2" className="text-[#e0e0e0]">Badges</Text>
      <div className="flex gap-2 flex-wrap">
        <Badge label="Hoy" variant="today" />
        <Badge label="Próximo" variant="soon" />
        <Badge label="Mañana" variant="tomorrow" />
        <Badge label="Vencida" variant="overdue" />
        <Badge label="Completada" variant="completed" />
      </div>

      <Text variant="h2" className="text-[#e0e0e0]">Checkbox</Text>
      <div className="flex gap-4 items-center">
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-5 h-5 rounded-full border-2 border-[#7B2FBE]"
          checkedClassName="bg-[#7B2FBE] border-[#7B2FBE]"
        />
        <Text variant="body" className="text-[#e0e0e0]">
          {checked ? "Completada" : "Pendiente"}
        </Text>
      </div>

      <Text variant="h2" className="text-[#e0e0e0]">Toggle</Text>
      <Toggle
        enabled={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        enabledClassName="bg-[#7B2FBE]"
        disabledClassName="bg-[#4a4a6a]"
        enabledIcon="Sun"
        disabledIcon="Moon"
      />

      <Text variant="h2" className="text-[#e0e0e0]">Icons</Text>
      <div className="flex gap-4 items-center">
        <Icon name="Search" className="text-[#1E90FF]" />
        <Icon name="Trash2" className="text-[#ff6b6b]" />
        <Icon name="Calendar" className="text-[#7B2FBE]" />
        <Icon name="Moon" className="text-[#e0e0e0]" />
        <Icon name="Sun" className="text-[#ffd700]" />
        <Icon name="Menu" className="text-[#e0e0e0]" />
        <Icon name="Plus" className="text-[#1E90FF]" />
        <Icon name="Pencil" className="text-[#7B2FBE]" />
      </div>

    </div>
  )
}

export default App