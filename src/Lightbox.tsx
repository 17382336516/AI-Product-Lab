import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

/* A viewport-level lightbox rendered into <body> via a portal, so it is
   immune to the CanvasScaler's transform: scale() (which would otherwise
   shrink the image down with the design canvas on mobile). */
export default function Lightbox({
  src,
  alt = "",
  caption,
  onClose,
}: {
  src: string | null
  alt?: string
  caption?: ReactNode
  onClose: () => void
}) {
  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [src, onClose])

  if (!src) return null

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        background: "rgba(28,22,18,0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))",
        boxSizing: "border-box",
        cursor: "zoom-out",
        animation: "lightboxFade 200ms ease",
      }}
    >
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "94vw",
          maxHeight: "82vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: 14,
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          background: "#fff",
        }}
      />
      {caption && (
        <div
          style={{
            marginTop: 18,
            fontFamily: "inherit",
            fontSize: 15,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          {caption}
        </div>
      )}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: "max(16px, env(safe-area-inset-top))",
          right: 18,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.14)",
          color: "#fff",
          fontSize: 26,
          lineHeight: "44px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        ✕
      </div>
    </div>,
    document.body,
  )
}
