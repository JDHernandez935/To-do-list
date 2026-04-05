import { useState } from "react"

import Button from "./atoms/Button"
import Input from "./atoms/Input"
import Badge from "./atoms/Badge"
import Checkbox from "./atoms/Checkbox"

function App() {
  const [checked, setChecked] = useState(false)

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
    </div>
  )
}

export default App
