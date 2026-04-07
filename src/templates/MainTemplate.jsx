import Navbar from "../organism/Navbar"
import Toggle from "../molecules/Toggle"
import Icon from "../atoms/Icon"

function MainTemplate({ children, activeTab, onTabChange, fab = null, search = null, counter = null }) {
  return (
    <div className="min-h-screen flex justify-center" style={{ background: "#00010D" }}>
      <div className="relative w-full flex flex-col" style={{ background: "#00010D" }}>

        <div className="sticky top-0 z-40" style={{ background: "#00010D" }}>
          <div className="flex items-center justify-between px-4 py-4">
            <Toggle
              enabled={true}
              onChange={() => {}}
              enabledClassName="bg-[#364C59]"
              disabledClassName="bg-[#364C59]"
              enabledIcon="Moon"
              disabledIcon="Sun"
            />
            <div className="flex items-center gap-2">
              <Icon name="CheckSquare" size={26} className="text-[#7B2FBE]" />
              <span style={{ color: "#C7D4D9", fontWeight: 600, fontSize: 20 }}>
                todo-inteligente
              </span>
            </div>
          </div>

          <div style={{ height: "24px" }} />

          {search && (
            <div className="px-4 pb-4" style={{ maxWidth: "980px", margin: "0 auto", width: "100%" }}>
              {search}
            </div>
          )}

          {counter && (
            <div className="px-4 pb-4" style={{ maxWidth: "980px", margin: "0 auto", width: "100%", marginTop: "16px" }}>
              {counter}
            </div>
          )}

          <div style={{ height: "8px" }} />
        </div>

        <div className="flex-1 overflow-y-auto px-3" style={{ paddingBottom: "100px" }}>
          {children}
        </div>

        {fab && (
          <div className="fixed bottom-20 right-4 z-40">
            {fab}
          </div>
        )}

        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t flex justify-center"
          style={{ background: "#00010D", borderColor: "#364C59" }}
        >
          <div className="w-full">
            <Navbar activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default MainTemplate