import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AddTaskPage from "./pages/AddTaskPage"
import EditTaskPage from "./pages/EditTaskPage"
import DeleteTaskPage from "./pages/DeleteTaskPage"
import DetailTaskPage from "./pages/DetailTaskPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="add" element={<AddTaskPage />} />
        <Route path="task/:id" element={<DetailTaskPage />} />
        <Route path="task/:id/edit" element={<EditTaskPage />} />
        <Route path="task/:id/delete" element={<DeleteTaskPage />} />
      </Route>
    </Routes>
  )
}

export default App