import { useEffect, useRef, useState, type ReactNode } from "react"
import rotateDog from "./imports/小狗3.webp"

const DESIGN_WIDTH = 1600
const DESIGN_HEIGHT = 900
const MAX_SCALE = 1.2

function isMobile() {
  if (typeof window === "undefined") return false
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    || (window.matchMedia("(pointer: coarse)").matches && window.innerWidth <= 900)
}

function isPortrait() {
  return typeof window !== "undefined" && window.innerHeight > window.innerWidth
}

function PortraitPrompt({ onClose }: { onClose: () => void }) {
  // Detect whether the device/browser can auto-lock to landscape at all.
  // @ts-expect-error screen.orientation.lock may be missing from DOM typings.
  const canAutoRotate = typeof screen !== "undefined" && screen.orientation && typeof screen.orientation.lock === "function"
  const [manual, setManual] = useState(false)
  const [locking, setLocking] = useState(false)
  // If auto-rotate is unsupported from the start, hide the button and prompt manual rotation.
  const [unsupported] = useState(!canAutoRotate)

  const handleLandscape = async () => {
    setLocking(true)
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(() => undefined)
      }
      // @ts-expect-error screen.orientation.lock is missing from some DOM typings.
      await screen.orientation.lock("landscape")
    } catch {
      // Browser rejected the lock (e.g. iOS Safari) → fall back to manual prompt.
      setManual(true)
    } finally {
      setLocking(false)
    }
  }

  const showManualHint = manual || unsupported

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#FAF7F0", color: "#2C2820", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px", fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif' }}>
      <img src={rotateDog} alt="横屏提示" style={{ width: 150, height: "auto", marginBottom: 18 }} />
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 12px", letterSpacing: "0.02em" }}>建议横屏观看</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "#8A8276", margin: "0 0 8px", maxWidth: 300 }}>作品集保留了完整的多栏布局，横屏可以获得更好的浏览体验。</p>
      {showManualHint && <p style={{ fontSize: 14, lineHeight: 1.7, color: "#8A8276", margin: "0 0 8px", maxWidth: 300, fontWeight: 600 }}>当前浏览器不支持自动切换，请手动旋转设备至横屏。</p>}
      {!unsupported && !manual && (
        <button onClick={handleLandscape} disabled={locking} style={{ marginTop: 18, padding: "12px 32px", fontSize: 16, fontWeight: 600, color: "#FAF7F0", background: "#2C2820", border: "none", borderRadius: 999, cursor: "pointer", letterSpacing: "0.04em" }}>{locking ? "正在切换…" : "切换横屏"}</button>
      )}
      <button onClick={onClose} style={{ marginTop: 12, padding: "8px 18px", fontSize: 13, color: "#8A8276", background: "transparent", border: "none", cursor: "pointer" }}>继续竖屏浏览</button>
    </div>
  )
}

export default function CanvasScaler({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)
  const [portrait, setPortrait] = useState(() => isMobile() && isPortrait())
  const [dismissed, setDismissed] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const compute = () => {
      setPortrait(isMobile() && isPortrait())
      const viewport = window.visualViewport
      const viewportWidth = viewport?.width || window.innerWidth
      const viewportHeight = viewport?.height || window.innerHeight
      const scaleX = viewportWidth / DESIGN_WIDTH
      const scaleY = viewportHeight / DESIGN_HEIGHT
      setScale(Math.min(scaleX, scaleY, MAX_SCALE))
    }

    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(compute)
    }
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null
    if (ro && canvasRef.current) ro.observe(canvasRef.current)
    const t = window.setTimeout(compute, 0)
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
      ro?.disconnect()
    }
  }, [])

  return (
    <>
      <div className="viewport">
        <div className="canvas" ref={canvasRef} style={{ transform: `scale(${scale})` }}>{children}</div>
      </div>
      {portrait && !dismissed && <PortraitPrompt onClose={() => setDismissed(true)} />}
    </>
  )
}
