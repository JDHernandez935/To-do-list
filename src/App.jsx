import Button from "./atoms/Button"

function App() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <Button variant="primary">Botón primario</Button>
      <Button variant="secondary">Botón secundario</Button>
      <Button variant="danger">Botón peligro</Button>
      <Button variant="ghost">Botón ghost</Button>
    </div>
  )
}

export default App
