function ModalTemplate({ children, onClose, className = "" }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className={`
          w-full max-w-lg rounded-2xl
          bg-[#233240] border border-[#364C59]
          p-6
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalTemplate