import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────
   useCrossProjectNav

   Adds mouse-wheel and touch (swipe) navigation BETWEEN the three
   middle project pages (Offer → Gunshu → Shijian), while fully
   preserving each page's own internal scrolling, buttons and the
   bloom transition (callbacks come straight from App).

   It only fires a cross-project callback when the page is already
   at its internal scroll boundary, so it never fights the page's
   own internal wheel/touch handling. A short cooldown prevents
   one gesture from skipping multiple projects.

   - onPrev / onNext : the App callbacks (e.g. gunshuToOffer).
   - canPrev / canNext : boundary predicates the page owns.
   ───────────────────────────────────────────────────────────── */
export function useCrossProjectNav({
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  onPrev?: () => void
  onNext?: () => void
  canPrev: () => boolean
  canNext: () => boolean
}) {
  const lock = useRef(false)
  const touchX = useRef(0)
  const touchY = useRef(0)

  useEffect(() => {
    const unlock = () => { lock.current = false }

    const goPrev = () => {
      if (!onPrev || !canPrev() || lock.current) return
      lock.current = true
      onPrev()
      setTimeout(unlock, 700)
    }
    const goNext = () => {
      if (!onNext || !canNext() || lock.current) return
      lock.current = true
      onNext()
      setTimeout(unlock, 700)
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 12) return
      if (e.deltaY < 0) goPrev()
      else goNext()
    }

    const onTouchStart = (e: TouchEvent) => {
      touchX.current = e.touches[0].clientX
      touchY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchX.current
      const dy = e.changedTouches[0].clientY - touchY.current
      // Accept vertical OR horizontal swipes (mobile can go both ways).
      if (Math.abs(dy) < 50 && Math.abs(dx) < 50) return
      const up = dy < 0 || (Math.abs(dx) > Math.abs(dy) && dx < 0)
      const down = dy > 0 || (Math.abs(dx) > Math.abs(dy) && dx > 0)
      if (up) goNext()
      else if (down) goPrev()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [onPrev, onNext, canPrev, canNext])
}
