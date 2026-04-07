import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AddTaskPage from "./pages/AddTaskPage"
import EditTaskPage from "./pages/EditTaskPage"
import DeleteTaskPage from "./pages/DeleteTaskPage"
import DetailTaskPage from "./pages/DetailTaskPage"
import TrashPage from "./pages/TrashPage"
import CalendarPage from "./pages/CalendarPage"

function App() {
  const location = useLocation()
  const background = location.state?.background

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/trash" element={<TrashPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/add" element={<AddTaskPage />} />
          <Route path="/task/:id" element={<DetailTaskPage />} />
          <Route path="/task/:id/edit" element={<EditTaskPage />} />
          <Route path="/task/:id/delete" element={<DeleteTaskPage />} />
        </Routes>
      )}
    </>
  )
}

export default App