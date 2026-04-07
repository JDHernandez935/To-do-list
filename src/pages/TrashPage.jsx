import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import useAlerts from "../hooks/useAlerts"
import MainTemplate from "../templates/MainTemplate"
import AlertContainer from "../organism/AlertContainer"
import ModalTemplate from "../templates/ModalTemplate"
import DeleteModal from "../organism/DeleteModal"
import Text from "../atoms/Text"
import IconButton from "../molecules/IconButton"
import Icon from "../atoms/Icon"
import Button from "../atoms/Button"

function TrashPage() {
  const navigate = useNavigate()
  const { deletedTasks, restoreTask, permanentDelete } = useTasks()
  const { alerts, success, removeAlert } = useAlerts()
  const [activeTab, setActiveTab] = useState("trash")
  const [confirmId, setConfirmId] = useState(null)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "home") navigate("/")
    if (tab === "calendar") navigate("/calendar")
  }

  const handleRestore = (id) => {
    restoreTask(id)
    success("Tarea restaurada correctamente")
  }

  const handlePermanentDelete = (id) => {
    permanentDelete(id)
    setConfirmId(null)
    success("Tarea eliminada permanentemente")
  }

  const getDaysLeft = (deletedAt) => {
    const deleted = new Date(deletedAt)
    const expires = new Date(deleted.getTime() + 10 * 24 * 60 * 60 * 1000)
    const today = new Date()
    const diff = Math.ceil((expires - today) / (1000 * 60 * 60 * 24))
    return diff
  }

  const taskToDelete = deletedTasks.find(t => t.id === confirmId)

  return (
    <>
      <AlertContainer alerts={alerts} onClose={removeAlert} />
      <MainTemplate activeTab={activeTab} onTabChange={handleTabChange}>

        <Text variant="h2" className="text-[#C7D4D9] mb-1">
          Papelera
        </Text>
        <Text variant="small" className="text-[#77848C] mb-4">
          Las tareas se eliminan permanentemente después de 10 días
        </Text>

        {deletedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <Icon name="Trash2" size={48} className="text-[#364C59]" />
            <Text variant="body" className="text-[#77848C]">
              La papelera está vacía
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {deletedTasks.map(task => {
              const daysLeft = getDaysLeft(task.deletedAt)
              return (
                <div
                  key={task.id}
                  className="
                    flex flex-col gap-3 px-4 py-3 rounded-lg
                    bg-[#233240] border border-[#364C59]
                  "
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Trash2" size={16} className="text-[#77848C]" />
                    <Text
                      variant="body"
                      className="flex-1 text-[#C7D4D9] line-through opacity-60"
                    >
                      {task.title}
                    </Text>
                    <Text variant="muted" className={`
                      ${daysLeft <= 2 ? "text-red-400" : "text-[#77848C]"}
                    `}>
                      {daysLeft}d
                    </Text>
                  </div>

                  <div className="flex gap-2 pl-7">
                    <Button
                      onClick={() => handleRestore(task.id)}
                      className="
                        flex-1 py-1 rounded-lg text-sm font-medium
                        bg-[#7B2FBE] text-white
                        hover:bg-[#9B4FDE]
                        active:scale-95 transition-all duration-150
                      "
                    >
                      Restaurar
                    </Button>
                    <IconButton
                      iconName="Trash2"
                      size={16}
                      onClick={() => setConfirmId(task.id)}
                      className="
                        w-8 h-8 rounded-lg
                        bg-[#364C59] hover:bg-red-500
                        active:scale-95 transition-all duration-150
                        flex items-center justify-center
                      "
                      iconClassName="text-[#C7D4D9]"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </MainTemplate>

      {confirmId && taskToDelete && (
        <ModalTemplate onClose={() => setConfirmId(null)}>
          <DeleteModal
            taskTitle={taskToDelete.title}
            onConfirm={() => handlePermanentDelete(confirmId)}
            onCancel={() => setConfirmId(null)}
          />
        </ModalTemplate>
      )}
    </>
  )
}

export default TrashPage