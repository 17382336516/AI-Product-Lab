import { useEffect, useRef } from "react"

/* ─────────────────────────────────────────────────────────────
   useTouchNavigation

   移动端横屏翻页兜底：在仅依赖鼠标滚轮的页面上，额外提供
   「触摸滑动」+「点击左右半屏」两种翻页方式，解决手机无滚轮
   时无法翻页的问题。

   - onPrev / onNext : 翻页回调（与滚轮共用同一函数）。
   - 滑动：上滑/左滑 → next，下滑/右滑 → prev。
   - 点击：点屏幕左半屏 → prev，点右半屏 → next。
   - 700ms 锁防止一次手势连翻多页。
   - 仅在触摸设备生效（非触摸设备直接跳过，避免与 PC 鼠标冲突）。
   ───────────────────────────────────────────────────────────── */
export function useTouchNavigation({
  onPrev,
  onNext,
}: {
  onPrev?: () => void
  onNext?: () => void
}) {
  const lock = useRef(false)
  const touchX = useRef(0)
  const touchY = useRef(0)

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (!isTouch) return

    const unlock = () => {
      lock.current = false
    }

    const goPrev = () => {
      if (!onPrev || lock.current) return
      lock.current = true
      onPrev()
      setTimeout(unlock, 700)
    }
    const goNext = () => {
      if (!onNext || lock.current) return
      lock.current = true
      onNext()
      setTimeout(unlock, 700)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchX.current = e.touches[0].clientX
      touchY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchX.current
      const dy = e.changedTouches[0].clientY - touchY.current
      if (Math.abs(dy) < 50 && Math.abs(dx) < 50) return
      const up = dy < 0 || (Math.abs(dx) > Math.abs(dy) && dx < 0)
      const down = dy > 0 || (Math.abs(dx) > Math.abs(dy) && dx > 0)
      if (up) goNext()
      else if (down) goPrev()
    }
    const onClick = (e: MouseEvent) => {
      // 触摸设备的 synthesized click：用坐标判断左右半屏
      const w = window.innerWidth
      if (e.clientX < w / 2) goPrev()
      else goNext()
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("click", onClick)
    }
  }, [onPrev, onNext])
}
