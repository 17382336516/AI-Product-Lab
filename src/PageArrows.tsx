import { useEffect, useState } from "react"

/* ─────────────────────────────────────────────────────────────
   PageArrows

   移动端横屏的显式翻页箭头（左右）。仅在触摸设备显示，
   PC 端隐藏（PC 用滚轮/方向键）。点击左右箭头调用 onPrev/onNext。
   ───────────────────────────────────────────────────────────── */
export default function PageArrows({
  onPrev,
  onNext,
  showPrev = true,
  showNext = true,
}: {
  onPrev?: () => void
  onNext?: () => void
  showPrev?: boolean
  showNext?: boolean
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)")
    const update = () => setVisible(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  if (!visible) return null

  // Lightweight, low-key arrows that blend with the warm paper tone of the
  // portfolio (no heavy filled discs — just a hair-line ring + thin chevron).
  const base: React.CSSProperties = {
    position: "absolute",
    bottom: 20,
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "rgba(250,247,240,0.45)",
    border: "1px solid rgba(44,40,32,0.28)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(44,40,32,0.7)",
    cursor: "pointer",
    zIndex: 60,
    userSelect: "none",
    opacity: 0.55,
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    transition: "opacity 0.25s ease, color 0.25s ease, border-color 0.25s ease",
  }

  const chevron = (dir: "left" | "right") => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ display: "block" }}
    >
      <path
        d={dir === "left" ? "M10 3 L5 8 L10 13" : "M6 3 L11 8 L6 13"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const hoverStyle: React.CSSProperties = {
    opacity: 0.95,
    color: "rgba(44,40,32,0.95)",
    border: "1px solid rgba(44,40,32,0.45)",
  }

  return (
    <>
      {showPrev && onPrev && (
        <div
          style={{ ...base, left: 16 }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, base)}
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
        >
          {chevron("left")}
        </div>
      )}
      {showNext && onNext && (
        <div
          style={{ ...base, right: 18 }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, base)}
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
        >
          {chevron("right")}
        </div>
      )}
    </>
  )
}
