import { useState } from "react"

import Button from "./atoms/Button"
import Input from "./atoms/Input"
import Badge from "./atoms/Badge"
import Checkbox from "./atoms/Checkbox"
import Text from "./atoms/Text"
import Toggle from "./atoms/Toggle"

function App() {
  const [checked, setChecked] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="p-8 flex flex-col gap-4">
      <Input placeholder="Una tarea" />
      <Button variant="primary">Botón primario</Button>
      <Button variant="secondary">Botón secundario</Button>
      <Button variant="danger">Botón peligro</Button>
      <Button variant="ghost">Botón ghost</Button>

      <div className="flex gap-2">
        <Badge label="Hoy" variant="today" />
        <Badge label="Mañana" variant="tomorrow" />
        <Badge label="Vencida" variant="overdue" />
        <Badge label="Completada" variant="completed" />
      </div>

      <div className="p-8 flex flex-col gap-4">
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>

      <Text variant="h1">Título principal</Text>
      <Text variant="h2">Subtítulo</Text>
      <Text variant="body">Texto normal del cuerpo</Text>
      <Text variant="small">Texto pequeño</Text>
      <Text variant="muted">Texto muy sutil</Text>

      <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
    </div>
  )
}

export default App
