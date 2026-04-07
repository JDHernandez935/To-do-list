import Alert from "./Alert"

function AlertContainer({ alerts, onClose }) {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-[100]">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => onClose(alert.id)}
          duration={alert.duration || 3000}
        />
      ))}
    </div>
  )
}

export default AlertContainer