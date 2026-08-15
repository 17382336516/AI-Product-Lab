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

  const base: React.CSSProperties = {
    position: "absolute",
    bottom: 18,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(30,28,24,0.55)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    cursor: "pointer",
    zIndex: 60,
    userSelect: "none",
  }

  return (
    <>
      {showPrev && onPrev && (
        <div
          style={{ ...base, left: 18 }}
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
        >
          ‹
        </div>
      )}
      {showNext && onNext && (
        <div
          style={{ ...base, right: 18 }}
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
        >
          ›
        </div>
      )}
    </>
  )
}
