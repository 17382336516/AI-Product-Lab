/**
 * Viewport helper.
 *
 * NOTE: The portfolio now uses a Virtual Canvas (see CanvasScaler.tsx) that
 * renders every page at a fixed 1440×900 design canvas and scales it to fit
 * the screen. Therefore pages should always lay out against the *design*
 * canvas, never the real window size. This hook intentionally returns the
 * fixed 1600×900 values so all inner pages share one virtual design canvas
 * (deckScale = 1, desktop padding, no narrow reflow) and the CanvasScaler
 * handles adaptation. No page file needs to change.
 */

export type Breakpoint = 'xl' | 'desktop' | 'laptop' | 'landscape' | 'small'

export interface Viewport {
  width: number
  height: number
  bp: Breakpoint
  /** Horizontal page padding — original design value */
  sidePad: string
  /** Card-deck geometry scale (always 1 on the design canvas) */
  deckScale: number
  /** True only if the design canvas itself is narrow (never, here) */
  isNarrow: boolean
}

export function useViewport(): Viewport {
  return {
    width: 1600,
    height: 900,
    bp: 'xl',
    sidePad: '80px',
    deckScale: 1,
    isNarrow: false,
  }
}
