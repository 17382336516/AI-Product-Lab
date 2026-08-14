import { useEffect, useRef, useState, useCallback } from 'react'
import OfferPage from './OfferPage'
import GunshuPage from './GunshuPage'
import ShijianPage from './ShijianPage'
import ContactPage from './ContactPage'
import { useViewport } from './useViewport'
import img1 from '@/imports/image-2.png'                              // Offer到
import img2 from '@/imports/a2c3c08abc9e7b85088a7b8dd699c83c.jpg'    // 群策
import img3 from '@/imports/image-3.png'                             // Bingo
import img4 from '@/imports/image-4.png'                             // 史影绘卷
import logoImg from '@/imports/1a649729676d49b38321ae06f8ab5352.png' // dog logo photo

/* ════════════════════════════════════════
   PROJECT DATA
   Image order corrected:
   img4 (image-4.png)   → Offer到
   img3 (image-3.png)   → 群策
   img2 (fridge jpg)    → Bingo
   img1 (image-2.png)   → 史影绘卷
════════════════════════════════════════ */

const projects = [
  {
    id: 0,
    name: 'Offer到',
    title: 'AI Product Learning Platform',
    desc: '以求职为导向的产品小白学习平台，提供个性化学习路径与面试管理。',
    img: img4,
    imgPos: 'center 58%',
    bg: '#FBF8F2',
    accent: '#C4A258',
    tag: 'Product Design',
    year: '2024',
    href: '#offer',
  },
  {
    id: 1,
    name: '群策',
    title: 'AI Customer Intelligence Agent',
    desc: '面向企业增长场景的 Multi-Agent，\n从用户数据提炼人群洞察辅助营销策略决策。',
    img: img3,
    imgPos: '42% 58%',
    bg: '#F2F6F3',
    accent: '#6B9E88',
    tag: 'AI Strategy',
    year: '2024',
    href: '#qunice',
  },
  {
    id: 2,
    name: 'Bingo',
    title: 'AI Mini Fridge',
    desc: '一个会"记住冰箱"的交互式小程序，帮助用户管理食材并个性化推荐每日菜谱。',
    img: img2,
    imgPos: '26% 28%',
    bg: '#F3F0F8',
    accent: '#8B78C2',
    tag: 'Mini Program',
    year: '2023',
    href: '#bingo',
  },
  {
    id: 3,
    name: '时鉴',
    title: 'AI History Learning System',
    desc: '面向中学生的AI历史学习平台，通过知识可视化提升历史理解与记忆效率。',
    img: img1,
    imgPos: 'center 52%',
    bg: '#F7F3EE',
    accent: '#C4956A',
    tag: 'EdTech · AI',
    year: '2023',
    href: '#history',
  },
]

/* ════════════════════════════════════════
   CARD DECK CONSTANTS
════════════════════════════════════════ */

const CARD_W = 244
const CARD_H = 372
const CARD_GAP = 16
// Container exactly spans 4 expanded cards
const CONTAINER_W = CARD_W * 4 + CARD_GAP * 3  // 908
// Center of expanded layout → stack rests here
const STACK_LEFT = Math.round((CONTAINER_W - CARD_W) / 2)  // 346

// Stacked fan — cards visibly spread so all 4 peek out
const STACKED_R  = [-21, -9,  6,  18]
const STACKED_Y  = [22,   9,  4,  18]
const STACKED_X  = [-76, -25, 25, 68]

// Expanded row — gentle individual tilts
const EXPANDED_R  = [-1.5, -0.5,  1,    2]
const EXPANDED_Y  = [4,    -3,    0,    5]
// Delta X from STACK_LEFT to each card's expanded left edge
const EXPANDED_DX = [
  0 - STACK_LEFT,                        // -346
  (CARD_W + CARD_GAP) - STACK_LEFT,      // -115
  (CARD_W + CARD_GAP) * 2 - STACK_LEFT, // +116
  (CARD_W + CARD_GAP) * 3 - STACK_LEFT, // +347
]

/* ════════════════════════════════════════
   SVG PRIMITIVES
════════════════════════════════════════ */

function StarSVG({ size = 16, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ opacity, display: 'block' }}>
      <path
        d="M10 1.5 L11.5 7.8 L17.8 9.2 L11.5 10.6 L10 16.8 L8.5 10.6 L2.2 9.2 L8.5 7.8 Z"
        stroke="#C8A640" strokeWidth="1.1" strokeLinejoin="round"
        fill="#EFDB78" fillOpacity="0.52"
      />
    </svg>
  )
}

function CloudSVG({ width = 52 }: { width?: number }) {
  return (
    <svg width={width} height={Math.round(width * 0.6)} viewBox="0 0 52 31" fill="none" style={{ display: 'block' }}>
      <path
        d="M6 27 Q0.5 27 0.5 21.5 Q0.5 17 6 16.5 Q6 9.5 13 8.5 Q17 3 25 4.5 Q31 2 36 8 Q43.5 7.5 47 13.5 Q52.5 14 52.5 20.5 Q52.5 27 46 27 Z"
        stroke="#C0B9B1" strokeWidth="1.1" fill="white" fillOpacity="0.62"
      />
    </svg>
  )
}

function MoonSVG({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" style={{ display: 'block' }}>
      <path
        d="M18 13.5 Q18 21 12 24 Q5 24 3 16.5 Q1 9 8 5.5 Q12 3.5 14.5 6 Q9 9 9 13.5 Q9 20 15.5 21 Q18 19 18 13.5Z"
        stroke="#C4A870" strokeWidth="1.1" fill="#F5E8B4" fillOpacity="0.55"
      />
    </svg>
  )
}

function WaterDrop({ size = 10, opacity = 0.32 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 10 14" fill="none" style={{ opacity, display: 'block' }}>
      <path d="M5 0.8 Q8.8 5.5 8.8 9 Q8.8 13 5 13 Q1.2 13 1.2 9 Q1.2 5.5 5 0.8Z"
            fill="#B8CBD5" stroke="#A0B5C2" strokeWidth="0.8" />
    </svg>
  )
}

function PawPrint({ size = 22, opacity = 0.12 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity, display: 'block' }}>
      <ellipse cx="16" cy="20" rx="6.5" ry="7.5" stroke="#8B7355" strokeWidth="1.2" fill="none" />
      <ellipse cx="7.5"  cy="11" rx="3" ry="3.8" stroke="#8B7355" strokeWidth="1" fill="none" transform="rotate(-10 7.5 11)" />
      <ellipse cx="13"   cy="7.5" rx="3" ry="3.8" stroke="#8B7355" strokeWidth="1" fill="none" transform="rotate(-5 13 7.5)" />
      <ellipse cx="19"   cy="7.5" rx="3" ry="3.8" stroke="#8B7355" strokeWidth="1" fill="none" transform="rotate(5 19 7.5)" />
      <ellipse cx="24.5" cy="11" rx="3" ry="3.8" stroke="#8B7355" strokeWidth="1" fill="none" transform="rotate(10 24.5 11)" />
    </svg>
  )
}

/* ════════════════════════════════════════
   DOG LOGO — simplified mascot, no glasses
════════════════════════════════════════ */

function DogLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      {/* Floppy ears */}
      <ellipse cx="9.5"  cy="13" rx="5"  ry="6.5" fill="white" stroke="#2C2820" strokeWidth="1.1" transform="rotate(-18 9.5 13)" />
      <ellipse cx="24.5" cy="13" rx="5"  ry="6.5" fill="white" stroke="#2C2820" strokeWidth="1.1" transform="rotate(18 24.5 13)" />
      {/* Head */}
      <circle cx="17" cy="19" r="12" fill="white" stroke="#2C2820" strokeWidth="1.2" />
      {/* Eyes */}
      <circle cx="13" cy="17.5" r="1.6" fill="#2C2820" />
      <circle cx="21" cy="17.5" r="1.6" fill="#2C2820" />
      {/* Eye shine */}
      <circle cx="12.4" cy="17" r="0.55" fill="white" />
      <circle cx="20.4" cy="17" r="0.55" fill="white" />
      {/* Nose */}
      <ellipse cx="17" cy="21.5" rx="2.2" ry="1.5" fill="#2C2820" />
      {/* Nose shine */}
      <circle cx="16.1" cy="21" r="0.55" fill="white" />
      {/* Blush */}
      <ellipse cx="10.5" cy="21" rx="2.2" ry="1.3" fill="#F4C0A8" fillOpacity="0.45" />
      <ellipse cx="23.5" cy="21" rx="2.2" ry="1.3" fill="#F4C0A8" fillOpacity="0.45" />
    </svg>
  )
}

/* ════════════════════════════════════════
   CLOTHESLINE — rope + animated hanging items
════════════════════════════════════════ */

type HangItem = {
  pct: number          // % from left
  topPx: number        // px from top of container (approx rope y)
  stringH: number      // string length px
  animDur: number      // animation duration s
  animDelay: number    // delay s
  type: 'star' | 'moon' | 'cloud' | 'tag' | 'paper'
  size?: number
}

const clotheslineItems: HangItem[] = [
  { pct: 8,    topPx: 20, stringH: 15, animDur: 3.8, animDelay: 0,   type: 'star',  size: 15 },
  { pct: 20,   topPx: 23, stringH: 17, animDur: 5.2, animDelay: 0.6, type: 'moon',  size: 22 },
  { pct: 34,   topPx: 25, stringH: 14, animDur: 6.5, animDelay: 1.4, type: 'cloud', size: 44 },
  { pct: 50,   topPx: 23, stringH: 16, animDur: 4.4, animDelay: 0.2, type: 'tag' },
  { pct: 64,   topPx: 20, stringH: 15, animDur: 3.5, animDelay: 1.8, type: 'star',  size: 13 },
  { pct: 78,   topPx: 19, stringH: 18, animDur: 4.8, animDelay: 0.9, type: 'paper' },
  { pct: 90.5, topPx: 22, stringH: 14, animDur: 3.2, animDelay: 2.2, type: 'star',  size: 10 },
]

function ClotheslineItem({ item }: { item: HangItem }) {
  const isCloud = item.type === 'cloud'
  return (
    <div
      style={{
        position: 'absolute',
        left: `${item.pct}%`,
        top: item.topPx,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* String */}
      <div style={{ width: 1, height: item.stringH, background: '#C8C0B8', flexShrink: 0 }} />

      {/* Hanging element — swings around the top (transform-origin: top center) */}
      <div
        style={{
          transformOrigin: 'top center',
          animation: isCloud
            ? `lineCloudFloat ${item.animDur}s ease-in-out infinite ${item.animDelay}s`
            : `swingItem ${item.animDur}s ease-in-out infinite ${item.animDelay}s`,
        }}
      >
        {item.type === 'star'  && <StarSVG size={item.size ?? 15} opacity={0.75} />}
        {item.type === 'moon'  && <MoonSVG size={item.size ?? 22} />}
        {item.type === 'cloud' && <CloudSVG width={item.size ?? 44} />}
        {item.type === 'tag'   && (
          <div style={{
            width: 22, height: 16, background: '#EDE5D5', border: '0.8px solid #C8C0B8',
            borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#C0B8B0' }} />
          </div>
        )}
        {item.type === 'paper' && (
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ display: 'block' }}>
            <path d="M1 1 L15 1 L15 18 Q11 17 8 19 Q5 20 1 18 Z"
                  fill="#EDE5D5" stroke="#C8C0B8" strokeWidth="0.8" />
            <line x1="3.5" y1="6"  x2="12" y2="6"  stroke="#D0C8BC" strokeWidth="0.6" />
            <line x1="3.5" y1="9"  x2="11" y2="9"  stroke="#D0C8BC" strokeWidth="0.6" />
            <line x1="3.5" y1="12" x2="9"  y2="12" stroke="#D0C8BC" strokeWidth="0.6" />
          </svg>
        )}
      </div>
    </div>
  )
}

function Clothesline() {
  return (
    <div
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ height: 82, zIndex: 10, animation: 'clotheslineDrift 9s ease-in-out infinite' }}
    >
      {/* Rope — SVG stretched full width */}
      <svg
        width="100%" height="36"
        style={{ position: 'absolute', top: 0 }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 36"
      >
        <path
          d="M -10 20 Q 360 31 720 24 Q 1080 17 1450 27"
          stroke="#C8C0B8" strokeWidth="0.9"
        />
      </svg>

      {/* Hanging items */}
      {clotheslineItems.map((item, i) => (
        <ClotheslineItem key={i} item={item} />
      ))}
    </div>
  )
}

/* ════════════════════════════════════════
   BRAND HEADER — no nav links, just logo
════════════════════════════════════════ */

function BrandHeader({ vp }: { vp: Viewport }) {
  return (
    <header
      className="relative flex items-center"
      style={{ padding: `72px ${vp.sidePad} 0`, zIndex: 20 }}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={logoImg}
          alt="AI Product Lab mascot"
          loading="eager"
          fetchPriority="high"
          style={{ width: 38, height: 38, objectFit: 'contain', display: 'block', flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#5A4030',
            letterSpacing: '0.02em',
          }}
        >
          AI Product Lab
        </span>
      </div>
    </header>
  )
}

/* ════════════════════════════════════════
   SINGLE PROJECT CARD
════════════════════════════════════════ */

function ProjectCard({
  project,
  isHovered,
}: {
  project: (typeof projects)[number]
  isHovered: boolean
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: project.bg,
        borderRadius: 18,
        border: '1px solid rgba(0,0,0,0.055)',
        boxShadow: isHovered
          ? '0 18px 44px rgba(44, 40, 32, 0.2)'
          : '0 6px 22px rgba(44, 40, 32, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.28s ease',
      }}
    >
      {/* Washi tape strip */}
      <div
        style={{
          height: 8,
          background: `${project.accent}40`,
          borderBottom: `1px solid ${project.accent}25`,
          flexShrink: 0,
        }}
      />

      {/* Dog illustration */}
      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <img
          src={project.img}
          alt={project.name}
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: project.imgPos,
            display: 'block',
          }}
        />
      </div>

      {/* Info panel */}
      <div
        style={{
          padding: '9px 13px 12px',
          background: 'rgba(255,255,255,0.72)',
          borderTop: '1px solid rgba(0,0,0,0.045)',
          flexShrink: 0,
        }}
      >
        {/* Project name — Fredoka rounded cute font */}
        <div
          style={{
            fontFamily: "'Fredoka', 'PingFang SC', 'Hiragino Sans GB', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: '#2C2820',
            lineHeight: 1.2,
            marginBottom: 3,
            letterSpacing: '0.01em',
          }}
        >
          {project.name}
        </div>

        {/* English subtitle */}
        <div
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: project.accent,
            letterSpacing: '0.03em',
            marginBottom: 6,
            whiteSpace: 'nowrap',
          }}
        >
          {project.title}
        </div>

        {/* Chinese description */}
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            fontWeight: 400,
            color: '#7A7068',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
            whiteSpace: 'pre-line',
          }}
        >
          {project.desc}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   PROJECT CARD DECK — stack → fan expand
════════════════════════════════════════ */

function ProjectCardStack({ mounted, deckScale, onNavigateOffer, onNavigateGunshu, onNavigateShijian }: { mounted: boolean; deckScale: number; onNavigateOffer: () => void; onNavigateGunshu: () => void; onNavigateShijian: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Devices without a hover-capable pointer (touchscreens / landscape phones)
  // must navigate on a single tap — there is no hover to expand the deck first.
  const isTouchDevice =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none)').matches

  // Scale the whole deck geometry proportionally to the viewport.
  // All transforms below derive from these values, so animations and the
  // stack→fan relationship stay identical — we only recompute the geometry,
  // never apply transform: scale on a wrapper.
  const cardW = Math.round(CARD_W * deckScale)
  const cardH = Math.round(CARD_H * deckScale)
  const cardGap = Math.round(CARD_GAP * deckScale)
  const containerW = Math.round(CONTAINER_W * deckScale)
  const stackLeft = Math.round(STACK_LEFT * deckScale)
  const stackedR  = STACKED_R.map((v) => v)
  const stackedY  = STACKED_Y.map((v) => Math.round(v * deckScale))
  const stackedX  = STACKED_X.map((v) => Math.round(v * deckScale))
  const expandedR = EXPANDED_R.map((v) => v)
  const expandedY = EXPANDED_Y.map((v) => Math.round(v * deckScale))
  const expandedDX = [
    0 - stackLeft,
    (cardW + cardGap) - stackLeft,
    (cardW + cardGap) * 2 - stackLeft,
    (cardW + cardGap) * 3 - stackLeft,
  ]

  return (
    <div
      style={{
        position: 'relative',
        width: containerW,
        margin: '0 auto',
        height: Math.round(cardH + 44 * deckScale),
        cursor: expanded ? 'default' : 'pointer',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.7s ease 0.45s',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setHoveredCard(null) }}
    >
      {projects.map((project, i) => {
        const isCardHovered = hoveredCard === i && expanded
        const lift = isCardHovered ? Math.round(-10 * deckScale) : 0

        const transform = expanded
          ? `translateX(${expandedDX[i]}px) translateY(${expandedY[i] + lift}px) rotate(${expandedR[i]}deg)`
          : `translateX(${stackedX[i]}px) rotate(${stackedR[i]}deg) translateY(${stackedY[i]}px)`

        return (
          <a
            key={project.id}
            href={project.href}
            style={{
              position: 'absolute',
              left: stackLeft,
              top: Math.round(22 * deckScale),
              width: cardW,
              height: cardH,
              display: 'block',
              textDecoration: 'none',
              transform,
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: expanded
                ? isCardHovered ? 20 : i + 1
                : projects.length - i,
              pointerEvents: 'auto',
            }}
            onClick={(e) => {
              e.preventDefault()
              // Touch device: navigate immediately on a single tap.
              if (isTouchDevice) {
                if (project.id === 0) onNavigateOffer()
                else if (project.id === 1) onNavigateGunshu()
                else if (project.id === 3) onNavigateShijian()
                return
              }
              // Hover-capable device: keep the original behaviour — only jump
              // after the deck has been expanded by hover.
              if (!expanded) return
              if (project.id === 0) onNavigateOffer()
              else if (project.id === 1) onNavigateGunshu()
              else if (project.id === 3) onNavigateShijian()
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <ProjectCard project={project} isHovered={isCardHovered} />
          </a>
        )
      })}

      {/* Hint beneath the stack */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Caveat, cursive',
          fontSize: 13,
          color: '#B8AFA4',
          letterSpacing: '0.04em',
          opacity: expanded ? 0 : 0.9,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        hover to explore ✦
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════ */

function HeroSection({ mounted, vp, onNavigateOffer, onNavigateGunshu, onNavigateShijian }: { mounted: boolean; vp: Viewport; onNavigateOffer: () => void; onNavigateGunshu: () => void; onNavigateShijian: () => void }) {
  const anim = (ms: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.65s ease ${ms}ms, transform 0.65s ease ${ms}ms`,
  })

  return (
    <section
      className="relative flex items-center"
      style={{
        minHeight: '80vh',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: `32px ${vp.sidePad} 40px ${vp.sidePad}`,
        zIndex: 20,
        gap: 0,
        overflow: 'visible',
        flexDirection: vp.isNarrow ? 'column' : 'row',
        textAlign: vp.isNarrow ? 'center' : 'left',
      }}
    >
      {/* ── Left: Text ── */}
      <div style={{ flex: vp.isNarrow ? '0 0 auto' : '0 0 390px', maxWidth: vp.isNarrow ? '100%' : 390, width: '100%', paddingLeft: vp.isNarrow ? 0 : 32, marginBottom: vp.isNarrow ? 36 : 0 }}>

        {/* Greeting */}
        <div
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 'clamp(26px, 2.8vw, 36px)',
            fontWeight: 500,
            color: '#C49A6C',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            marginBottom: 6,
            ...anim(80),
          }}
        >
          Hello, I'm
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 600,
            color: '#8B5E3C',
            lineHeight: 1.15,
            letterSpacing: '0.005em',
            marginBottom: 22,
            ...anim(130),
          }}
        >
          Chen Xingya, Cecelia.
        </div>

        {/* Main statement */}
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(15px, 1.55vw, 18px)',
            fontWeight: 700,
            color: '#5C3D2E',
            lineHeight: 1.65,
            marginBottom: 32,
            letterSpacing: '-0.005em',
            ...anim(240),
          }}
        >
          An AI Product Manager who enjoys<br />
          exploring the intersection of AI,<br />
          users and meaningful products.
        </div>

        {/* Thin divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 18,
            ...anim(360),
          }}
        >
          <div style={{ width: 20, height: 1, background: '#D8C8B0' }} />
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#D8C8B0' }} />
        </div>

        {/* Body note — Kalam neat handwriting */}
        <p
          style={{
            fontFamily: "'Kalam', cursive",
            fontSize: 16,
            fontWeight: 400,
            color: '#9A8472',
            lineHeight: 1.9,
            margin: '0 0 8px',
            ...anim(460),
          }}
        >
          This is my little corner on the internet,<br />
          where I explore AI products,<br />
          user experiences and creative ideas.
        </p>

        <p
          style={{
            fontFamily: "'Kalam', cursive",
            fontSize: 16,
            fontWeight: 400,
            color: '#9A8472',
            lineHeight: 1.9,
            margin: 0,
            ...anim(560),
          }}
        >
          Through research, experiments and prototypes,<br />
          I turn problems into products.
        </p>
      </div>

      {/* ── Right: Card Deck + floating deco ── */}
      <div
        style={{
          flex: vp.isNarrow ? '0 0 auto' : '1 1 auto',
          width: vp.isNarrow ? '100%' : 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: vp.isNarrow ? 'center' : 'flex-start',
          paddingLeft: 0,
          paddingRight: vp.isNarrow ? 0 : 40,
          minHeight: Math.round(480 * vp.deckScale),
          overflow: 'visible',
        }}
      >
        {/* Cloud */}
        <div style={{ position: 'absolute', top: '-4%', right: '8%', zIndex: 30, animation: 'cloudDrift 7s ease-in-out infinite', opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.9s', pointerEvents: 'none' }}>
          <CloudSVG width={72} />
        </div>

        {/* Moon */}
        <div style={{ position: 'absolute', top: '-3%', left: '5%', zIndex: 30, animation: 'float 8s ease-in-out infinite 1.2s', opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 1s', pointerEvents: 'none' }}>
          <MoonSVG size={28} />
        </div>

        {/* Stars */}
        {[
          { top: '11%', right: '14%',  size: 17, delay: 0.4, anim: 'twinkle 3.2s ease-in-out infinite 0.4s' },
          { top: '68%', left:  '3%',   size: 12, delay: 1.1, anim: 'twinkle 4s ease-in-out infinite' },
          { top: '36%', right: '3%',   size: 9,  delay: 1.3, anim: 'twinkle 3.6s ease-in-out infinite 2s' },
          { bottom: '14%', right: '17%', size: 8, delay: 1.5, anim: 'twinkle 5s ease-in-out infinite 1s' },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: (s as {top?: string}).top,
              bottom: (s as {bottom?: string}).bottom,
              right: (s as {right?: string}).right,
              left: (s as {left?: string}).left,
              animation: s.anim,
              opacity: mounted ? 0.72 : 0,
              transition: `opacity 0.8s ease ${s.delay}s`,
              pointerEvents: 'none',
            }}
          >
            <StarSVG size={s.size} />
          </div>
        ))}

        {/* Water drops */}
        <div style={{ position: 'absolute', top: '54%', left: '1%', animation: 'float 9s ease-in-out infinite 3s', opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 1.5s', pointerEvents: 'none' }}>
          <WaterDrop size={9} opacity={0.3} />
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', animation: 'float 10s ease-in-out infinite 2s', opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 1.6s', pointerEvents: 'none' }}>
          <WaterDrop size={6} opacity={0.25} />
        </div>

        {/* Card deck */}
        <ProjectCardStack mounted={mounted} deckScale={vp.deckScale} onNavigateOffer={onNavigateOffer} onNavigateGunshu={onNavigateGunshu} onNavigateShijian={onNavigateShijian} />
      </div>
    </section>
  )
}

/* ════════════════════════════════════════
   BACKGROUND DETAILS
════════════════════════════════════════ */

function BackgroundDetails() {
  return (
    <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>
      {/* Paw prints — bottom left trail */}
      {[
        { left: 48,  bottom: 82, angle: 8 },
        { left: 78,  bottom: 54, angle: 14 },
        { left: 110, bottom: 30, angle: 20 },
      ].map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: p.left, bottom: p.bottom, transform: `rotate(${p.angle}deg)` }}>
          <PawPrint size={21} opacity={0.1} />
        </div>
      ))}

      {/* Paper scrap — bottom right */}
      <div style={{ position: 'absolute', right: 68, bottom: 48, transform: 'rotate(7deg)', opacity: 0.14 }}>
        <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
          <path d="M4 4 L44 4 L44 54 Q36 51 28 55 Q20 59 4 55 Z" fill="#F0E8D8" stroke="#D0C8B8" strokeWidth="1" />
          <line x1="10" y1="16" x2="36" y2="16" stroke="#C8C0B0" strokeWidth="0.75" />
          <line x1="10" y1="23" x2="34" y2="23" stroke="#C8C0B0" strokeWidth="0.75" />
          <line x1="10" y1="30" x2="29" y2="30" stroke="#C8C0B0" strokeWidth="0.75" />
          <line x1="10" y1="37" x2="24" y2="37" stroke="#C8C0B0" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Scattered dots */}
      {[
        { left: '6%',  top: '42%' }, { left: '13%', top: '70%' },
        { right: '4%', top: '32%' }, { right: '9%',  bottom: '37%' },
        { left: '50%', top: '90%' }, { left: '26%',  bottom: '7%' },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: 3, height: 3, borderRadius: '50%', background: '#C4BCB4', opacity: 0.36 }} />
      ))}

      {/* Squiggle left flair */}
      <div style={{ position: 'absolute', left: 28, top: '38%', opacity: 0.09 }}>
        <svg width="18" height="38" viewBox="0 0 18 38" fill="none">
          <path d="M9 2 Q15 10 9 18 Q3 26 9 34 Q15 40 9 36" stroke="#8B7355" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   GRAIN OVERLAY  (class defined in index.css)
════════════════════════════════════════ */

function GrainOverlay() {
  return <div className="grain-overlay" />
}

/* ════════════════════════════════════════
   CURSOR STAR TRAIL
════════════════════════════════════════ */

type TrailStar = { id: number; x: number; y: number }

function CursorTrail() {
  const [stars, setStars] = useState<TrailStar[]>([])
  const counter = useRef(0)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (Math.random() > 0.87) {
        // The whole app is wrapped in CanvasScaler's transform: scale(), which
        // makes position:fixed resolve against the scaled canvas (not the
        // window). Convert the window mouse coords back into canvas-internal
        // design coords so the star lands exactly under the cursor.
        const canvas = document.querySelector<HTMLElement>('.canvas')
        let x = e.clientX
        let y = e.clientY
        if (canvas) {
          const rect = canvas.getBoundingClientRect()
          const s = canvas.offsetWidth ? rect.width / canvas.offsetWidth : 1
          x = (e.clientX - rect.left) / s
          y = (e.clientY - rect.top) / s
        }
        const id = counter.current++
        setStars((prev) => [...prev.slice(-7), { id, x, y }])
        setTimeout(() => setStars((prev) => prev.filter((s) => s.id !== id)), 700)
      }
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="pointer-events-none fixed"
          style={{ left: s.x - 7, top: s.y - 7, zIndex: 9998, animation: 'starFade 0.7s ease forwards' }}
        >
          <StarSVG size={14} />
        </div>
      ))}
    </>
  )
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */

export default function App() {
  const [mounted, setMounted] = useState(false)
  const vp = useViewport()
  const [offerOpen,   setOfferOpen]   = useState(false)
  const [gunshuOpen,  setGunshuOpen]  = useState(false)
  const [shijianOpen, setShijianOpen] = useState(false)
  const [shijianInitTab, setShijianInitTab] = useState<'why' | 'how'>('why')
  const [contactOpen, setContactOpen] = useState(false)
  const [bloomPhase, setBloomPhase] = useState<'idle' | 'blooming' | 'unblooming'>('idle')

  // Initial-state props for project pages (set before opening so they're ready on first mount)
  const [offerInitPhase, setOfferInitPhase] = useState<'s1' | 's2'>('s1')
  const [offerInitStep,  setOfferInitStep]  = useState(0)
  const [gunshuInitPage, setGunshuInitPage] = useState(0)
  const [gunshuInitIdx,  setGunshuInitIdx]  = useState(0)

  useEffect(() => setMounted(true), [])

  /* ── helpers ── */
  function bloom(cb: () => void) {
    setBloomPhase('blooming')
    setTimeout(() => { cb(); setBloomPhase('idle') }, 480)
  }
  function unbloom(cb: () => void) {
    setBloomPhase('unblooming')
    setTimeout(() => { cb(); setBloomPhase('idle') }, 480)
  }

  /* ── open from home ── */
  const openOffer = useCallback(() => {
    setOfferInitPhase('s1'); setOfferInitStep(0)
    bloom(() => setOfferOpen(true))
  }, [])
  const openGunshu = useCallback(() => {
    setGunshuInitPage(0); setGunshuInitIdx(0)
    bloom(() => setGunshuOpen(true))
  }, [])
  const openShijian = useCallback(() => { setShijianInitTab('why'); bloom(() => setShijianOpen(true)) }, [])
  const openContact = useCallback(() => bloom(() => setContactOpen(true)), [])

  /* ── home scroll-down → open Offer ── */
  useEffect(() => {
    let lock = false
    const handler = (e: WheelEvent) => {
      if (lock) return
      if (offerOpen || gunshuOpen || shijianOpen || contactOpen) return
      if (e.deltaY > 10) {
        lock = true
        openOffer()
        setTimeout(() => { lock = false }, 800)
      }
    }
    window.addEventListener('wheel', handler, { passive: true })
    return () => window.removeEventListener('wheel', handler)
  }, [offerOpen, gunshuOpen, shijianOpen, contactOpen, openOffer])

  /* ── close back to home ── */
  const closeOffer   = useCallback(() => unbloom(() => setOfferOpen(false)),   [])
  const closeGunshu  = useCallback(() => unbloom(() => setGunshuOpen(false)),  [])
  const closeShijian = useCallback(() => unbloom(() => setShijianOpen(false)), [])
  const closeContact = useCallback(() => unbloom(() => setContactOpen(false)), [])

  /* ── cross-project forward navigation ── */
  const offerToGunshu = useCallback(() => {
    bloom(() => { setOfferOpen(false); setGunshuInitPage(0); setGunshuInitIdx(0); setGunshuOpen(true) })
  }, [])
  const gunshuToShijian = useCallback(() => {
    setShijianInitTab('why')
    bloom(() => { setGunshuOpen(false); setShijianOpen(true) })
  }, [])

  /* ── cross-project backward navigation ── */
  const gunshuToOffer = useCallback(() => {
    bloom(() => { setGunshuOpen(false); setOfferInitPhase('s2'); setOfferInitStep(3); setOfferOpen(true) })
  }, [])
  const shijianToGunshu = useCallback(() => {
    bloom(() => { setShijianOpen(false); setGunshuInitPage(1); setGunshuInitIdx(2); setGunshuOpen(true) })
  }, [])
  void shijianToGunshu
  const shijianToContact = useCallback(() => {
    bloom(() => { setShijianOpen(false); setContactOpen(true) })
  }, [])
  const shijianToGunshu2 = useCallback(() => {
    bloom(() => { setShijianOpen(false); setGunshuInitPage(1); setGunshuInitIdx(2); setGunshuOpen(true) })
  }, [])
  const contactToShijian = useCallback(() => {
    setShijianInitTab('how')
    bloom(() => { setContactOpen(false); setShijianOpen(true) })
  }, [])

  return (
    <>
      {/* Home page */}
      <div className="relative min-h-screen" style={{
        background: '#FAF8F3',
        visibility: (offerOpen || gunshuOpen || shijianOpen || contactOpen) ? 'hidden' : 'visible',
        pointerEvents: (offerOpen || gunshuOpen || shijianOpen || contactOpen) ? 'none' : 'auto',
      }}>
        <GrainOverlay />
        <CursorTrail />
        <BackgroundDetails />
        <Clothesline />
        <BrandHeader vp={vp} />
        <HeroSection mounted={mounted} vp={vp} onNavigateOffer={openOffer} onNavigateGunshu={openGunshu} onNavigateShijian={openShijian} />
      </div>

      {/* Page-bloom transition overlay */}
      {bloomPhase !== 'idle' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: '#FAF8F3',
          animation: `${bloomPhase === 'blooming' ? 'pageBloom' : 'pageUnbloom'} 0.48s cubic-bezier(0.4,0,0.2,1) forwards`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Offer page */}
      {offerOpen && (
        <OfferPage
          onBack={closeOffer}
          initialPhase={offerInitPhase}
          initialStep={offerInitStep}
          onNavigateNext={offerToGunshu}
        />
      )}

      {/* Gunshu page */}
      {gunshuOpen && (
        <GunshuPage
          onBack={closeGunshu}
          initialPage={gunshuInitPage}
          initialActiveIdx={gunshuInitIdx}
          onNavigatePrev={gunshuToOffer}
          onNavigateNext={gunshuToShijian}
        />
      )}

      {/* Shijian page */}
      {shijianOpen && (
        <ShijianPage
          key={shijianInitTab}
          initialTab={shijianInitTab}
          onBack={closeShijian}
          onNavigateNext={shijianToContact}
          onNavigatePrev={shijianToGunshu2}
        />
      )}

      {/* Contact / ending page */}
      {contactOpen && (
        <ContactPage
          onBack={closeContact}
          onScrollPrev={contactToShijian}
        />
      )}
    </>
  )
}
