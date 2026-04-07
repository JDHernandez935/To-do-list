import Navbar from "../organism/Navbar"

function MainTemplate({ children, activeTab, onTabChange, fab = null }) {
  return (
    <div className="relative min-h-screen bg-[#00010D]">

      <div className="pb-24 px-4 pt-6">
        {children}
      </div>

      {fab && (
        <div className="fixed bottom-20 right-4 z-40">
          {fab}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#00010D] border-t border-[#364C59]">
        <Navbar activeTab={activeTab} onTabChange={onTabChange} />
      </div>

    </div>
  )
}

export default MainTemplate