import { useState } from "react"

import Text from "./atoms/Text"
import Toggle from "./molecules/Toggle"
import SearchBar from "./molecules/SearchBar"
import IconButton from "./molecules/IconButton"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 flex flex-col gap-6 bg-[#1a1a2e] min-h-screen">
      <Text variant="h2" className="text-[#e0e0e0]">Toggle</Text>
      <Toggle
        enabled={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        enabledClassName="bg-[#7B2FBE]"
        disabledClassName="bg-[#4a4a6a]"
        enabledIcon="Sun"
        disabledIcon="Moon"
      />

      <Text variant="h2" className="text-[#e0e0e0]">Searchbar</Text>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar tarea..."
        className="
          px-4 py-2 rounded-lg
          bg-[#2a2a4a] border border-[#4a4a6a]
          text-[#e0e0e0]
        "
        iconClassName="text-[#6a6a9a] flex-shrink-0"
      />
      <Text variant="small" className="text-[#6a6a9a]">
        Buscando: {search}
      </Text>

      <Text variant="h2" className="text-[#e0e0e0]">IconButton</Text>
      <div className="flex gap-3 items-center">

        <IconButton
          iconName="Trash2"
          className="w-10 h-10 rounded-full bg-[#4a4a6a] hover:bg-red-500 active:scale-95 transition-all duration-150"
          iconClassName="text-[#e0e0e0]"
        />

        <IconButton
          iconName="Pencil"
          className="w-10 h-10 rounded-full bg-[#4a4a6a] hover:bg-[#7B2FBE] active:scale-95 transition-all duration-150"
          iconClassName="text-[#e0e0e0]"
        />

        <IconButton
          iconName="Plus"
          className="w-14 h-14 rounded-full bg-[#7B2FBE] hover:bg-[#9B4FDE] active:scale-95 transition-all duration-150"
          iconClassName="text-white"
          size={24}
        />

      </div>
    </div>
  )
}

export default App