import { useState, useEffect, useCallback, useRef } from 'react'
import { useCrossProjectNav } from './useCrossProjectNav'
import { useTouchNavigation } from './useTouchNavigation'
import PageArrows from './PageArrows'
import NextProductHint from './NextProductHint'

/* ── Dog ── */
import dogImg from '@/imports/860832308b1dc5fc7ce52f10234ec4ac.jpg'
import dogNew from '@/imports/offer-dog.png'

/* ── Pain point cards ── */
import painCard01 from '@/imports/b0aa46cf3a3071cb8ff4d4c512aa298d.png'
import painCard02 from '@/imports/dc5d61fff7109a96e182de10a4f66caa.png'
import painCard03 from '@/imports/f9a343cfba4733016e9001eb3152a01f.png'

/* ── Core value cards ── */
import valueCard01 from '@/imports/05ead22e16d78d426473312adf9ca21a.png'
import valueCard02 from '@/imports/9ef231c7b058825d103c6da8e0fcb7ab.png'
import valueCard03 from '@/imports/3db7beb797122ef183967c6f224aa4a3.png'

/* ── How It Works screenshots (Screen 2) ── */
import shotPlan     from '@/imports/82174230ec530a7af2bf3fd57a91c05e.png'
import shotDaily    from '@/imports/1c35e010d176256cfd8dc64a1d606238.png'
import shotNotes    from '@/imports/427facf1c4b9e7297ba10a94cf3b5a38.png'
import shotInterview from '@/imports/fa961a89eede1459474770d7206b39a7.jpg'
import shotMember   from '@/imports/__-1.png'

/* ── Pain point illustrations ── */
import painIllus01 from '@/imports/image-17.png'
import painIllus02 from '@/imports/image-18.png'
import painIllus03 from '@/imports/image-19.png'

/* ── AI Tool logos ── */
import logoChatGPT  from '@/imports/89a07599eb6d12af58924a6dba2e633e.jpg'
import logoGemini   from '@/imports/78580279ba32e11ca0a034d7bab38987.jpg'
import logoClaude   from '@/imports/7a90d4f7b079699ff7fc6561e48e695e.jpg'
import logoFigma    from '@/imports/e43dd6daaf4fc806b0f3dc96a392f9a4.jpg'
import logoCursor   from '@/imports/a7e852734729662357e60302f9faefa0.jpg'
import logoDeepSeek from '@/imports/f223b34d2c980aef261200375bc95efe.jpg'
import logoGitHub   from '@/imports/5bac68201f5213fa742593419aec1168.jpg'
import logoXHS      from '@/imports/7cb1f81d6be6c72cc4a63b07001db652.jpg'
import logoNotion   from '@/imports/875ed8eea82d95d625064bafd13a2167.jpg'
import logoBilibili from '@/imports/a12a8abb3e612a0efead37bb7cc94993.jpg'
import logoKimi     from '@/imports/774b3475dbc128b04bcdb55eacf5e53d.jpg'

/* ════════════════════════════════════════
   TOOL DATA
   left/top = percentage of content area (calc(100vh - 62px))
════════════════════════════════════════ */

type Tool = {
  name: string; img: string
  left: number; top: number
  floatDur: number; floatDelay: number
}

const TOOLS: Tool[] = [
  { name: 'ChatGPT',  img: logoChatGPT,  left: 12, top: 13, floatDur: 6.2, floatDelay: 0    },
  { name: 'Claude',   img: logoClaude,   left: 28, top: 10, floatDur: 7.1, floatDelay: 1.1  },
  { name: 'Figma',    img: logoFigma,    left: 66, top: 11, floatDur: 6.8, floatDelay: 2.0  },
  { name: 'Gemini',   img: logoGemini,   left: 82, top: 14, floatDur: 7.4, floatDelay: 0.7  },
  { name: 'GitHub',   img: logoGitHub,   left: 7,  top: 38, floatDur: 5.8, floatDelay: 1.5  },
  { name: 'Bilibili', img: logoBilibili, left: 5,  top: 56, floatDur: 6.5, floatDelay: 2.8  },
  { name: '小红书',   img: logoXHS,      left: 8,  top: 74, floatDur: 7.2, floatDelay: 0.4  },
  { name: 'DeepSeek', img: logoDeepSeek, left: 88, top: 36, floatDur: 6.0, floatDelay: 1.9  },
  { name: 'Notion',   img: logoNotion,   left: 86, top: 54, floatDur: 7.8, floatDelay: 0.8  },
  { name: 'Cursor',   img: logoCursor,   left: 88, top: 72, floatDur: 6.4, floatDelay: 2.3  },
  { name: 'Kimi',     img: logoKimi,     left: 50, top: 87, floatDur: 7.0, floatDelay: 1.4  },
]

/* Curved connection paths [toolIdx_a, toolIdx_b, controlX, controlY] */
const CURVES: [number, number, number, number][] = [
  [0,  1,  20.0, 9.5  ],  // ChatGPT — Claude
  [2,  3,  74.0, 10.0 ],  // Figma — Gemini
  [0,  4,  6.5,  25.5 ],  // ChatGPT — GitHub
  [4,  5,  4.0,  47.0 ],  // GitHub — Bilibili
  [5,  6,  3.5,  65.0 ],  // Bilibili — 小红书
  [3,  7,  87.0, 25.0 ],  // Gemini — DeepSeek
  [7,  8,  90.0, 45.0 ],  // DeepSeek — Notion
  [8,  9,  90.0, 63.0 ],  // Notion — Cursor
  [6, 10,  29.0, 83.5 ],  // 小红书 — Kimi
  [9, 10,  69.0, 82.5 ],  // Cursor — Kimi
  [1,  4,  14.0, 24.0 ],  // Claude — GitHub
  [2,  7,  79.0, 22.0 ],  // Figma — DeepSeek
]

/* Star marker positions (control points of some curves) */
const STARS = [
  { x: 20.0, y: 9.5,  dur: 2.6, delay: 0    },
  { x: 74.0, y: 10.0, dur: 3.0, delay: 0.9  },
  { x: 4.0,  y: 47.0, dur: 2.8, delay: 1.7  },
  { x: 87.0, y: 25.0, dur: 3.2, delay: 0.4  },
  { x: 90.0, y: 63.0, dur: 2.5, delay: 2.1  },
  { x: 29.0, y: 83.5, dur: 3.1, delay: 1.3  },
  { x: 69.0, y: 82.5, dur: 2.7, delay: 0.7  },
]

/* ════════════════════════════════════════
   NETWORK BACKGROUND (thin curved lines + stars)
════════════════════════════════════════ */

function NetworkBackground() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {CURVES.map(([ai, bi, cx, cy], i) => {
        const a = TOOLS[ai], b = TOOLS[bi]
        return (
          <path
            key={i}
            d={`M ${a.left} ${a.top} Q ${cx} ${cy} ${b.left} ${b.top}`}
            stroke="#C8C0B8"
            strokeWidth="0.2"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          />
        )
      })}

      {STARS.map((s, i) => (
        <g key={i} style={{
          animation: `starNetworkTwinkle ${s.dur}s ease-in-out infinite ${s.delay}s`,
          transformOrigin: `${s.x}% ${s.y}%`,
        }}>
          <polygon
            points={`${s.x},${s.y - 0.75} ${s.x + 0.2},${s.y - 0.2} ${s.x + 0.75},${s.y} ${s.x + 0.2},${s.y + 0.2} ${s.x},${s.y + 0.75} ${s.x - 0.2},${s.y + 0.2} ${s.x - 0.75},${s.y} ${s.x - 0.2},${s.y - 0.2}`}
            fill="#C8C0B8"
            opacity="0.25"
          />
        </g>
      ))}
    </svg>
  )
}

/* ════════════════════════════════════════
   AI ICON CARD
════════════════════════════════════════ */

function AiIconCard({ tool, fading, idx }: { tool: Tool; fading: boolean; idx: number }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${tool.left}%`, top: `${tool.top}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 5, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
      animation: `iconDrift ${tool.floatDur}s ease-in-out infinite ${tool.floatDelay}s`,
      opacity: fading ? 0 : 1,
      transition: fading ? `opacity 0.28s ease ${idx * 0.018}s` : 'opacity 0.3s ease',
    }}>
      <div style={{
        width: 62, height: 62,
        background: '#FFFFFF',
        borderRadius: 15,
        border: '1px solid #E4DED8',
        boxShadow: '0 2px 10px rgba(44,40,32,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src={tool.img}
          alt={tool.name}
          loading="lazy"
          style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 9 }}
        />
      </div>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 9.5, fontWeight: 500, color: '#9A8A7A',
        letterSpacing: '0.01em', whiteSpace: 'nowrap',
      }}>{tool.name}</span>
    </div>
  )
}

/* ════════════════════════════════════════
   FLOATING QUESTION MARKS
════════════════════════════════════════ */

function FloatingQMarks() {
  const marks = [
    { left: -32, top: -48, size: 20, delay: 0,    dur: 4.0, rotate: '-14deg', opacity: 0.65 },
    { left:   2, top: -66, size: 26, delay: 0.8,  dur: 4.5, rotate: '6deg',   opacity: 0.80 },
    { left:  34, top: -44, size: 17, delay: 1.6,  dur: 3.8, rotate: '20deg',  opacity: 0.58 },
  ]
  return (
    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
      {marks.map((m, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: m.left, top: m.top,
          fontFamily: "'Kalam', cursive",
          fontSize: m.size, fontWeight: 700,
          color: '#C4A258', opacity: m.opacity,
          transform: `rotate(${m.rotate})`,
          animation: `qMarkFloat ${m.dur}s ease-in-out infinite ${m.delay}s`,
        }}>?</div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════
   PAIN POINT BUBBLE
════════════════════════════════════════ */

function PainBubble({
  side, dismissed, onDismiss,
}: { side: 'left' | 'right'; dismissed: boolean; onDismiss: () => void }) {
  const [hovered, setHovered] = useState(false)
  const isLeft = side === 'left'

  const borderColor = isLeft ? '#E8BFA5' : '#B8D4E8'
  const chipBg      = isLeft ? '#F5DED0' : '#DDEAF7'
  const chipText    = isLeft ? '#5A4638' : '#52677A'
  const bodyColor   = isLeft ? '#6B625A' : '#5A6B78'
  const floatAnim   = `bubbleFloat ${isLeft ? 5.0 : 5.5}s ease-in-out infinite ${isLeft ? 0 : 0.6}s`

  const title = isLeft ? '信息碎片化' : '学习与求职脱节'
  const body  = isLeft
    ? 'B站、小红书、课程太多，\n不知道从哪里开始。'
    : '学习内容对不上岗位需求，\n不知该补充什么能力。'

  const innerTransform = dismissed
    ? `scale(0.88) translateY(-12px) ${isLeft ? 'rotate(-6deg)' : 'rotate(6deg)'}`
    : hovered
      ? `translateY(-4px) ${isLeft ? 'rotate(-2deg)' : 'rotate(2deg)'}`
      : isLeft ? 'rotate(-2deg)' : 'rotate(2deg)'

  const shadow = hovered && !dismissed
    ? isLeft ? '0 10px 26px rgba(210,155,110,0.18)' : '0 10px 26px rgba(90,150,210,0.16)'
    : '0 3px 14px rgba(44,40,32,0.07)'

  return (
    /* Outer: handles vertical centering beside dog */
    <div style={{
      position: 'absolute',
      [isLeft ? 'left' : 'right']: '8%',
      top: '53%',
      transform: 'translateY(-50%)',
      zIndex: 14,
      pointerEvents: dismissed ? 'none' : 'auto',
    }}>
      {/* Inner: handles tilt, float animation, hover, dismiss */}
      <div
        onClick={onDismiss}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: innerTransform,
          opacity: dismissed ? 0 : 1,
          filter: dismissed ? 'blur(3px)' : 'none',
          transition: dismissed
            ? 'all 0.35s cubic-bezier(0.4,0,1,1)'
            : 'transform 0.2s ease, box-shadow 0.2s ease',
          animation: dismissed || hovered ? 'none' : floatAnim,
          cursor: 'pointer',
          willChange: 'transform, opacity',
        }}
      >
        {/* Tail pointing sideways toward dog */}
        <div style={{
          position: 'absolute',
          top: '28%',
          [isLeft ? 'right' : 'left']: -8,
          width: 14, height: 14,
          background: '#FFFFFF',
          borderTop: isLeft ? `1.5px solid ${borderColor}` : 'none',
          borderRight: isLeft ? `1.5px solid ${borderColor}` : 'none',
          borderBottom: isLeft ? 'none' : `1.5px solid ${borderColor}`,
          borderLeft: isLeft ? 'none' : `1.5px solid ${borderColor}`,
          transform: 'rotate(45deg)',
          zIndex: 0,
        }} />

        {/* Bubble body */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: 200,
          background: '#FFFFFF',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 20,
          padding: '11px 14px 13px',
          boxShadow: shadow,
          transition: 'box-shadow 0.2s ease',
        }}>
          {/* Decorative dots */}
          <div style={{ position: 'absolute', top: 11, [isLeft ? 'right' : 'left']: 12, display: 'flex', gap: 3.5, opacity: 0.38 }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: borderColor }} />
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: borderColor }} />
          </div>

          {/* Title chip */}
          <div style={{ marginBottom: 8 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: chipBg, borderRadius: 12, padding: '3px 10px',
            }}>
              <span style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: 14, fontWeight: 600,
                color: chipText, letterSpacing: '0.01em',
              }}>{title}</span>
            </div>
          </div>

          {/* Body — two lines */}
          <div style={{
            fontFamily: "'Kalam', cursive",
            fontSize: 13, color: bodyColor,
            lineHeight: 1.75, whiteSpace: 'pre-line',
          }}>{body}</div>

          {/* Footer */}
          <div style={{
            marginTop: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 10.5, color: borderColor, opacity: 0.6 }}>✦ ·</span>
            <span style={{
              fontFamily: "'Fredoka', sans-serif", fontSize: 10,
              color: borderColor, opacity: 0.65, letterSpacing: '0.01em',
            }}>点击查看 →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   SOLUTION CARD
════════════════════════════════════════ */

function SolutionCard({ side, visible }: { side: 'left' | 'right'; visible: boolean }) {
  const isLeft = side === 'left'
  const borderColor = isLeft ? '#8DC4A8' : '#7AAEC8'
  const chipBg      = isLeft ? '#D8F0E6' : '#D0E8F8'
  const chipText    = isLeft ? '#2E6B50' : '#1E5A88'
  const tilt        = isLeft ? 'rotate(-2deg)' : 'rotate(2deg)'

  return (
    <div style={{
      position: 'absolute',
      [isLeft ? 'left' : 'right']: '8%',
      top: '53%',
      width: 200, zIndex: 14,
      opacity: visible ? 1 : 0,
      transform: visible
        ? `translateY(-50%) ${tilt}`
        : `translateY(-40%) ${tilt} scale(0.93)`,
      transition: 'opacity 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
      pointerEvents: 'none',
    }}>
      <div style={{
        background: '#FFFFFF',
        border: `1.5px solid ${borderColor}`,
        borderRadius: 20,
        padding: '12px 15px 14px',
        boxShadow: '0 6px 22px rgba(44,40,32,0.09)',
      }}>
        <div style={{ marginBottom: 9 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: chipBg, borderRadius: 12, padding: '3px 10px',
          }}>
            <span style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 10, fontWeight: 600, color: chipText, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>Solution</span>
          </div>
        </div>
        <div style={{
          fontFamily: "'Kalam', cursive", fontSize: 15, fontWeight: 700,
          color: '#2C2820', lineHeight: 1.3, marginBottom: 7,
        }}>
          {isLeft ? 'AI Resource Intelligence' : 'Job-oriented AI Planner'}
        </div>
        <div style={{
          fontFamily: "'Kalam', cursive", fontSize: 13.5, color: '#4A3E30',
          lineHeight: 1.8, whiteSpace: 'pre-line',
        }}>
          {isLeft ? '多源信息整合，\n按岗位目标筛选学习内容。' : '岗位需求分析 + 技能匹配\n+ 个性化学习规划。'}
        </div>
        <div style={{ display: 'flex', gap: 5, marginTop: 9 }}>
          {(isLeft ? ['RAG', 'LLM'] : ['Agent', '技能树']).map(t => (
            <span key={t} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, fontWeight: 600,
              color: chipText, background: chipBg,
              borderRadius: 6, padding: '2px 8px', border: `1px solid ${borderColor}`,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   WHY SCREEN — Pain Points + Core Value
════════════════════════════════════════ */

const FO = "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif"
const FREDOKA = "'Fredoka', 'Nunito', 'PingFang SC', sans-serif"

const PAIN_DATA = [
  {
    illus: painIllus01,
    num: '01',
    title: '对目标岗位缺少清晰认知',
    desc: '想成为 AI 产品经理，但不知道需要具备哪些能力。',
    bullets: ['岗位要求碎片化', '不知道自己缺少什么能力', '不知道应该优先提升什么'],
  },
  {
    illus: painIllus02,
    num: '02',
    title: '学习资源丰富，但缺少有效路径',
    desc: 'B站、小红书等平台课程很多，但无法判断优先级。',
    bullets: ['内容重复，质量参差', '无法形成学习顺序', '学习资料过杂但不系统'],
  },
  {
    illus: painIllus03,
    num: '03',
    title: '学习与求职准备割裂',
    desc: '学完知识后无法沉淀作品，也无法快速准备面试。',
    bullets: ['缺少项目实战', '面试经验难收集', '无法连接真实求职场景'],
  },
]

function WhyScreen({ fading }: { fading: boolean }) {
  const [hoverPain, setHoverPain] = useState<number | null>(null)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const valueCards = [valueCard01, valueCard02, valueCard03]

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#FCFAF6',
      opacity: fading ? 0 : 1, transition: 'opacity 0.3s ease',
      pointerEvents: fading ? 'none' : 'auto', overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative', height: '100%', padding: '28px 56px 20px',
        display: 'flex', gap: 40, boxSizing: 'border-box',
      }}>

        {/* LEFT 40% — Title + Pain Points + Dog */}
        <div style={{ width: '40%', flexShrink: 0, display: 'flex', flexDirection: 'column', position: 'relative', paddingTop: 46, boxSizing: 'border-box' }}>

          {/* Title */}
          <h1 style={{
            fontFamily: FO, fontSize: 36, fontWeight: 700,
            color: '#292929', margin: '0 0 8px', lineHeight: 1.15, letterSpacing: '0',
            transform: 'translateY(-12px)',
          }}>
            Why Choose Offer到?
          </h1>

          {/* Subtitle */}
          <p style={{ display: 'none', fontFamily: FO, fontSize: 14, color: '#806C5C', margin: '0 0 20px', lineHeight: 1.7 }}>
            帮助产品新人从岗位认知、能力提升到面试准备，完成 AI 驱动的求职成长闭环。
          </p>

          {/* Section label */}
          <div style={{ fontFamily: FO, fontSize: 14, fontWeight: 800, color: '#F07838', letterSpacing: '1.2px', marginBottom: 4, transform: 'translateY(10px)' }}>
            USER PAIN POINTS
          </div>
          <div style={{ fontFamily: FO, fontSize: 20, fontWeight: 800, color: '#24150F', marginBottom: 24, transform: 'translateY(10px)' }}>
            产品经理求职中的三个核心挑战
          </div>

          {/* Pain cards — left image + right text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
            {PAIN_DATA.map((card, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoverPain(i)}
                onMouseLeave={() => setHoverPain(null)}
                style={{
                  display: 'flex', alignItems: 'stretch',
                  height: 158, maxWidth: 520, width: '100%',
                  borderRadius: 20, background: '#FFFFFF', flexShrink: 0,
                  boxShadow: hoverPain === i
                    ? '0 14px 40px rgba(80,50,20,0.10)'
                    : '0 8px 30px rgba(80,50,20,0.05)',
                  overflow: 'hidden',
                  transform: hoverPain === i ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                  cursor: 'default',
                }}
              >
                {/* Left illustration */}
                <div style={{
                  width: 122, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent', borderRight: 'none',
                }}>
                  <img
                    src={card.illus} alt=""
                    loading="lazy"
                    style={{ width: 132, height: 132, objectFit: 'contain', opacity: 0.9, mixBlendMode: 'multiply' }}
                  />
                </div>

                {/* Right text */}
                <div style={{
                  flex: 1, padding: '11px 15px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5,
                }}>
                  {/* Badge + title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', background: '#FF7A35', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: FO, fontSize: 11, fontWeight: 700, color: '#fff',
                    }}>{card.num}</div>
                    <span style={{ fontFamily: FO, fontSize: 17, fontWeight: 700, color: '#24150F', lineHeight: 1.3 }}>
                      {card.title}
                    </span>
                  </div>

                  {/* Description */}
                  <div style={{ fontFamily: FO, fontSize: 15, color: '#806C5C', lineHeight: 1.5 }}>
                    {card.desc}
                  </div>

                  {/* Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {card.bullets.map(b => (
                      <div key={b} style={{ display: 'flex', gap: 5, alignItems: 'baseline' }}>
                        <span style={{ color: '#D09070', fontSize: 10, flexShrink: 0, lineHeight: '15px' }}>•</span>
                        <span style={{ fontFamily: FO, fontSize: 14, color: '#9A8472' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dog — bottom left */}
          <img
            src={dogNew} alt=""
            loading="lazy"
            style={{
              position: 'absolute', right: 8, bottom: 0,
              width: 150, pointerEvents: 'none', zIndex: 20,
              animation: 'iconDrift 5s ease-in-out infinite',
              mixBlendMode: 'multiply',
            }}
          />
        </div>

        {/* RIGHT 60% — CORE VALUE + Value cards */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 93, marginLeft: -34, minWidth: 0 }}>

          <p style={{ position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)', width: 560, margin: 0, fontFamily: FO, fontSize: 13, fontWeight: 400, color: '#9C9489', lineHeight: 1.8, textAlign: 'center' }}>
            一个帮助产品新人从岗位认知、能力提升到面试准备的 AI Product Learning Platform，<br />
            通过个性化的学习路径规划，完成 AI 驱动的求职成长闭环。
          </p>

          <TryOfferButton />

          {/* Label */}
          <div style={{ fontFamily: FO, fontSize: 14, fontWeight: 800, color: '#52906A', letterSpacing: '0.08em', marginBottom: 6, transform: 'translateY(10px)' }}>
            CORE VALUE
          </div>
          <div style={{ fontFamily: FO, fontSize: 20, fontWeight: 800, color: '#24150F', marginBottom: 24, transform: 'translateY(10px)' }}>
            Offer到如何解决这些问题？
          </div>

          {/* Value cards — 3 columns, no extra border (images have built-in borders) */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', transform: 'scale(1.02)', transformOrigin: 'top left', marginLeft: -18, marginTop: 18 }}>
            {valueCards.map((src, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoverValue(i)}
                onMouseLeave={() => setHoverValue(null)}
                style={{
                  flex: 1,
                  borderRadius: 20, background: '#FFFFFF',
                  boxShadow: hoverValue === i
                    ? '0 24px 60px rgba(0,0,0,0.10)'
                    : '0 10px 35px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                  transform: hoverValue === i
                    ? 'translateY(-6px) scale(1.01)'
                    : 'translateY(0) scale(1)',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                  cursor: 'default',
                }}
              >
                <img src={src} alt={`Core value ${i + 1}`} loading="lazy" style={{ width: '100%', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   FLOWCHART PANEL  (Screen 2)
════════════════════════════════════════ */

const FLOW_DATA = [
  { nodes: ['目标岗位', '搜索路线', '提取技能', '匹配资源', '生成计划'] },
  { nodes: ['总体计划', '拆分天数', '视频切分', 'PDF分配',  '每日任务'] },
  { nodes: ['完成任务', '字幕提取', 'RAG检索',  'LLM生成',  '结构笔记'] },
  { nodes: ['基础功能', '求职监管', '面试管理', '面经总结', 'Pro闭环'] },
]

function FlowchartPanel({ stepIdx, accent }: { stepIdx: number; accent: string }) {
  const nodes = FLOW_DATA[stepIdx].nodes
  return (
    <div style={{
      width: 190, flexShrink: 0,
      background: '#FEFCF8', border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: 22, padding: '26px 14px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      boxShadow: '0 6px 22px rgba(44,40,32,0.08)',
    }}>
      <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 15, fontWeight: 600, color: '#B8AFA4', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20, textAlign: 'center' }}>Flow</div>
      {nodes.map((node, i) => (
        <div key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{
              width: 11, height: 11, borderRadius: '50%', flexShrink: 0,
              background: (i === 0 || i === nodes.length - 1) ? accent : '#D8C8B0',
              border: `2px solid ${(i === 0 || i === nodes.length - 1) ? accent : '#C8BEB4'}`,
            }} />
            <span style={{ fontFamily: "'Kalam', cursive", fontSize: 16, color: '#5A4A38', fontWeight: (i === 0 || i === nodes.length - 1) ? 700 : 400 }}>{node}</span>
          </div>
          {i < nodes.length - 1 && (
            <div style={{ marginLeft: 5, width: 1, height: 30, background: 'linear-gradient(to bottom, #D8C8B0, #C8BEB4)', marginTop: 4, marginBottom: 4 }} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════
   SCREENSHOT CARD  (Screen 2)
════════════════════════════════════════ */

function ScreenshotCard({ stepIdx, accent }: { stepIdx: number; accent: string }) {
  const palettes = [
    { bg: '#EDF4F0', grid: '#C8DDD5' },
    { bg: '#F5F0E8', grid: '#DDD2BE' },
    { bg: '#EEE9F5', grid: '#D4C8E8' },
    { bg: '#F3EDE8', grid: '#DDD0C4' },
  ]
  const p = palettes[stepIdx]
  const labels = [
    ['学习规划', '技能地图', '资源库'],
    ['今日任务', '完成进度', '学习时长'],
    ['AI笔记',   '知识点',   '导出'],
    ['Pro功能',  '求职工具', '升级'],
  ]
  return (
    <div style={{ width: '100%', height: '100%', background: p.bg, position: 'relative', overflow: 'hidden', borderRadius: 16 }}>
      <div style={{ height: 36, background: 'rgba(255,255,255,0.5)', borderBottom: `1px solid ${p.grid}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
        {[accent, '#D8C8B0', '#C8BEB4'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
        ))}
        <div style={{ flex: 1, height: 8, background: p.grid, borderRadius: 4, opacity: 0.5, marginLeft: 8 }} />
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 120, height: 14, background: accent, borderRadius: 4, opacity: 0.5 }} />
          <div style={{ width: 44, height: 22, background: accent, borderRadius: 8, opacity: 0.3 }} />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.6)', borderRadius: 12, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[80, 60, 90, 55, 70].map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, opacity: 0.65, flexShrink: 0 }} />
                <div style={{ width: `${w}%`, height: 9, background: p.grid, borderRadius: 3, opacity: 0.7 }} />
              </div>
            ))}
          </div>
          <div style={{ width: 90, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[1, 2].map(i => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 10, padding: 10, flex: 1 }}>
                <div style={{ width: '70%', height: 8, background: p.grid, borderRadius: 3, marginBottom: 6 }} />
                <div style={{ width: '90%', height: 6, background: p.grid, borderRadius: 3, opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {labels[stepIdx].map((label, i) => (
            <div key={i} style={{
              flex: 1, height: 34,
              background: i === 0 ? accent : 'rgba(255,255,255,0.55)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: i === 0 ? 0.65 : 0.8,
            }}>
              <span style={{ fontFamily: "'Kalam', cursive", fontSize: 11.5, color: i === 0 ? 'white' : '#5A4A38' }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[75, 55, 85].map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, background: p.grid, opacity: 0.7, flexShrink: 0 }} />
              <div style={{ width: `${w}%`, height: 9, background: p.grid, borderRadius: 3, opacity: 0.55 }} />
              <div style={{ flex: 1 }} />
              <div style={{ width: 28, height: 9, background: accent, borderRadius: 3, opacity: 0.35 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   WORKFLOW STEPS DATA
════════════════════════════════════════ */

const WORKFLOW_STEPS = [
  { num: '01', zh: '个性化学习路径生成', en: 'Learning Planner',  accent: '#6B9E88', img: shotPlan      },
  { num: '02', zh: '学习计划执行',       en: 'Daily Task Agent',  accent: '#C4A258', img: shotDaily     },
  { num: '03', zh: '知识沉淀',           en: 'AI Notes Agent',    accent: '#8B78C2', img: shotNotes     },
  { num: '04', zh: '求职准备',           en: 'Interview Agent',   accent: '#C4956A', img: shotInterview },
]

/* ════════════════════════════════════════
   SCREEN 2 — WORKFLOW SHOWCASE
════════════════════════════════════════ */

function TryOfferButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ position: 'absolute', right: 72, top: 48, zIndex: 30 }}>
      <button
        onClick={() => window.open('http://118.178.145.31:8080/', '_blank', 'noopener,noreferrer')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box', width: 150, height: 46,
          padding: '13px 24px', borderRadius: 999,
          border: 'none', background: '#67C6B0', color: '#FFFFFF',
          fontFamily: FREDOKA, fontSize: 17, fontWeight: 800, lineHeight: 1,
          cursor: 'var(--cursor-cute), pointer',
          boxShadow: hovered ? '0 12px 24px rgba(71,170,145,0.32)' : '0 5px 12px rgba(44,40,32,0.12)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'transform 220ms ease, box-shadow 220ms ease',
        }}
      >Try Offer到</button>
      {hovered && <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, whiteSpace: 'nowrap', padding: '7px 12px', borderRadius: 12, background: '#FFFDF8', border: '1px solid #D8C8B0', color: '#6B5748', fontFamily: FO, fontSize: 12, boxShadow: '0 8px 18px rgba(44,40,32,0.12)' }}>✦ 点击跳转至产品网页哦~ ✦</div>}
    </div>
  )
}

function Screen2({ visible, workflowStep }: { visible: boolean; workflowStep: number }) {
  const [zoomImg, setZoomImg] = useState<string | null>(null)
  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.98)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      pointerEvents: visible ? 'auto' : 'none',
      display: 'flex',
    }}>
            <TryOfferButton />
      {/* ── LEFT ── */}
      <div style={{ width: '30%', padding: '0 0 28px 88px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', transform: 'translate(-24px, 72px) scale(1.08)', transformOrigin: 'top left' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: FO, fontSize: 36, fontWeight: 700, color: '#292929', lineHeight: 1.15 }}>How It Works?</div>
          <div style={{ fontFamily: FO, fontSize: 17, fontWeight: 700, color: '#24150F', marginTop: 8, lineHeight: 1.4 }}>
            产品核心能力
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 14, top: 20, bottom: 20, width: 2, borderLeft: '2px dashed #D8C8B0' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                width: 7, height: 7, borderRadius: '50%',
                background: WORKFLOW_STEPS[workflowStep].accent, opacity: 0.7,
                top: `${i * 33}%`,
                animation: `particleFlow 2.2s ease-in-out infinite ${i * 0.73}s`,
              }} />
            ))}
          </div>
          {WORKFLOW_STEPS.map((step, i) => {
            const isActive = i === workflowStep
            const isPast   = i < workflowStep
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 17, marginBottom: i < 3 ? 36 : 0, opacity: isActive ? 1 : isPast ? 0.5 : 0.38, transition: 'opacity 0.4s ease' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: isActive ? step.accent : 'transparent',
                    border: `2px solid ${isActive ? step.accent : '#D8C8B0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: isActive ? 'scale(1.18)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  }}>
                    <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 12, fontWeight: 600, color: isActive ? 'white' : '#9A8472' }}>{step.num}</span>
                  </div>
                  {isActive && (
                    <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: `1.5px solid ${step.accent}`, animation: 'nodeRipple 1.8s ease-out infinite' }} />
                  )}
                </div>
                <div style={{ paddingTop: 5 }}>
                  <div style={{ fontFamily: FO, fontSize: 15, fontWeight: 600, color: isActive ? '#2C2820' : '#9A8472', transition: 'color 0.4s ease', lineHeight: 1.35 }}>{step.zh}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: isActive ? step.accent : '#C8BEB4', letterSpacing: '0.04em', transition: 'color 0.4s ease', marginTop: 2 }}>{step.en}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ width: 280, marginTop: 54, background: '#F2EEE8', borderRadius: 12, padding: '8px 12px', border: '1px solid #D8C8B0', boxSizing: 'border-box' }}>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 11.5, fontWeight: 600, color: '#8B6040', marginBottom: 6 }}>⚙ AI Engine</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {['RAG', 'LLM', 'Agent', 'Multi-source'].map(t => (
              <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, background: 'white', borderRadius: 6, padding: '2px 8px', color: '#7A6858', border: '1px solid #D8C8B0' }}>{t}</span>
            ))}
          </div>
        </div>
        <a href="https://offer-dao.vercel.app/" target="_blank" rel="noopener noreferrer"
          style={{
            marginTop: 14, display: 'none', alignItems: 'center', gap: 5,
            fontFamily: "'Fredoka', sans-serif", fontSize: 13.5, fontWeight: 600,
            color: '#FFFFFF', background: '#67C6B0', border: '1.5px solid #8FD8C4',
            borderRadius: 11, padding: '8px 16px', textDecoration: 'none',
            boxShadow: '0 8px 18px rgba(71,170,145,0.24)', alignSelf: 'flex-start',
            animation: 'offerButtonFloat 3.2s ease-in-out infinite',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
          Try Offer到 →
        </a>
      </div>

      {/* ── RIGHT ── */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 32px 24px 16px' }}>
        {WORKFLOW_STEPS.map((step, i) => {
          const offset     = i - workflowStep
          const isCenter   = offset === 0
          const scale      = isCenter ? 1 : 0.88
          const opacity    = isCenter ? 1 : Math.abs(offset) === 1 ? 0.22 : 0
          const translateY = offset * 420
          const translateX = i === 3 ? -56 : 0
          const stepOffsetY = i === 3 ? -42 : 0

          return (
            <div key={i} style={{
              position: 'absolute',
              marginTop: -36,
              display: 'flex', alignItems: 'center', gap: 28,
              transform: `translate(${translateX}px, ${translateY + stepOffsetY}px) scale(${scale})`,
              opacity,
              transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
              zIndex: isCenter ? 10 : 5,
            }}>
              {/* Membership screenshot — only for step 04, left of FLOW */}
              {i === 3 && (
                <div style={{
                  width: 275, flexShrink: 0,
                  position: 'relative', cursor: 'zoom-in',
                  borderRadius: 18, overflow: 'hidden',
                  boxShadow: isCenter
                    ? '0 2px 0 rgba(0,0,0,0.04), 0 12px 36px rgba(0,0,0,0.13)'
                    : '0 4px 14px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  opacity: isCenter ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
                  onClick={() => setZoomImg(shotMember)}
                >
                  <img src={shotMember} alt="会员体系" loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 28, height: 28, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.82)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    fontSize: 14, color: '#6B5B4D', pointerEvents: 'none',
                  }}>⤢</div>
                </div>
              )}

              {/* Flow panel */}
                <div style={{ flexShrink: 0, opacity: isCenter ? 1 : 0, transform: 'scale(1.05)', transformOrigin: 'center', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
                <FlowchartPanel stepIdx={i} accent={step.accent} />
              </div>

              {/* Real screenshot — no accent border, clean floating shadow */}
              <div style={{
                width: i === 3 ? 760 : 860, flexShrink: 0,
                position: 'relative',
                borderRadius: 20, overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: isCenter
                  ? '0 2px 0 rgba(0,0,0,0.03), 0 20px 56px rgba(0,0,0,0.13)'
                  : '0 4px 18px rgba(0,0,0,0.06)',
                background: '#FEFCF8',
                cursor: 'zoom-in',
              }}
                onClick={() => setZoomImg(step.img)}
              >
                <img
                  src={step.img}
                  alt={step.zh}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                {/* Zoom hint icon — top right */}
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.82)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  fontSize: 16, color: '#6B5B4D', pointerEvents: 'none',
                }}>⤢</div>
              </div>
            </div>
          )
        })}
        {/* Pagination dots */}
        <div style={{ position: 'absolute', bottom: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 7 }}>
          {WORKFLOW_STEPS.map((s, i) => (
            <div key={i} style={{ width: i === workflowStep ? 22 : 6, height: 6, borderRadius: 3, background: i === workflowStep ? s.accent : '#D8C8B0', transition: 'all 0.35s ease' }} />
          ))}
        </div>

        {/* Floating down arrow — scroll to next product (bottom, shifted left, color by step) */}
        <NextProductHint
          style={{ left: '24%' }}
          variant={workflowStep === 3 ? 'strong' : 'faint'}
          text={workflowStep === 3 ? '下滑了解下一个产品' : '下滑了解下一个功能'}
        />

        {/* Lightbox — click to enlarge screenshot */}
        {zoomImg && (
          <div
            onClick={() => setZoomImg(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 400,
              background: 'rgba(40,32,26,0.86)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 32, cursor: 'zoom-out',
            }}
          >
            <img
              src={zoomImg}
              alt="enlarged"
              style={{ maxWidth: '92vw', maxHeight: '88vh', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   MAIN OFFER PAGE
════════════════════════════════════════ */

export default function OfferPage({
  onBack,
  initialPhase = 's1',
  initialStep = 0,
  onNavigateNext,
}: {
  onBack: () => void
  initialPhase?: 's1' | 's2'
  initialStep?: number
  onNavigateNext?: () => void
}) {
  const [phase, setPhase] = useState<'s1' | 'fading' | 's2'>(initialPhase)
  const [workflowStep, setWorkflowStep] = useState(initialStep)
  const [mounted, setMounted] = useState(false)
  const navLock = useRef(false)

  // Mirror phase/step so the boundary predicate stays stable while reading live state.
  const stateRef = useRef({ phase, step: workflowStep })
  stateRef.current = { phase, step: workflowStep }
  useCrossProjectNav({
    onPrev: undefined,                                   // up-from-screen-1 already goes Home internally
    onNext: onNavigateNext,
    canPrev: () => false,
    canNext: () => stateRef.current.phase === 's2' && stateRef.current.step === 3,
  })

  useEffect(() => { requestAnimationFrame(() => setMounted(true)) }, [])

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (navLock.current) return
      if (phase === 's1') {
        e.preventDefault()
        if (e.deltaY > 10) {
          // scroll down → Screen 2
          setPhase('fading')
          setTimeout(() => setPhase('s2'), 340)
        } else if (e.deltaY < -10) {
          // scroll up → back to home
          navLock.current = true
          handleBack()
        }
      } else if (phase === 's2') {
        e.preventDefault()
        if (e.deltaY > 0) {
          if (workflowStep < 3) {
            setWorkflowStep(p => p + 1)
          } else if (onNavigateNext) {
            // last step → next project
            navLock.current = true
            onNavigateNext()
          }
        } else {
          if (workflowStep > 0) {
            setWorkflowStep(p => p - 1)
          } else {
            // step 0 → back to Screen 1
            setPhase('s1')
          }
        }
      }
    }
    window.addEventListener('wheel', handler, { passive: false })
    return () => window.removeEventListener('wheel', handler)
  }, [phase, workflowStep, onNavigateNext])

  const handleBack = useCallback(() => {
    setPhase('s1')
    setWorkflowStep(0)
    onBack()
  }, [onBack])

  const goToS2 = () => { setPhase('fading'); setTimeout(() => setPhase('s2'), 340) }
  const goToS1 = () => { setPhase('s1'); setWorkflowStep(0) }

  /* ── mobile touch / tap fallback (mirrors wheel logic) ── */
  const handleOfferNext = useCallback(() => {
    if (navLock.current) return
    if (phase === 's1') {
      goToS2()
    } else if (phase === 's2') {
      if (workflowStep < 3) setWorkflowStep(p => p + 1)
      else if (onNavigateNext) { navLock.current = true; onNavigateNext() }
    }
  }, [phase, workflowStep, onNavigateNext])
  const handleOfferPrev = useCallback(() => {
    if (navLock.current) return
    if (phase === 's2') {
      if (workflowStep > 0) setWorkflowStep(p => p - 1)
      else goToS1()
    } else if (phase === 's1') {
      navLock.current = true
      handleBack()
    }
  }, [phase, workflowStep, handleBack])
  useTouchNavigation({ onPrev: handleOfferPrev, onNext: handleOfferNext })

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#FCFAF6', overflow: 'hidden',
      opacity: mounted ? 1 : 0, transition: 'opacity 0.3s ease',
    }}>
      {/* Header */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        display: 'flex', alignItems: 'center', padding: '0 48px',
        background: 'rgba(250,248,243,0.92)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)', zIndex: 20,
      }}>
        <button onClick={handleBack} style={{
          fontFamily: FO, fontSize: 13, fontWeight: 500,
          color: '#9A8472', background: 'none', border: 'none', padding: '6px 0',
          cursor: 'var(--cursor-cute), pointer',
          display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#4A3020'}
          onMouseLeave={e => e.currentTarget.style.color = '#9A8472'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <div style={{ fontFamily: FO, fontSize: 18, fontWeight: 700, color: '#2C2820', lineHeight: 1.1 }}>Offer到</div>
          <div style={{ fontFamily: FO, fontSize: 10, color: '#C4A258', letterSpacing: '0.02em', fontWeight: 600, marginTop: 1 }}>AI Product Learning Platform</div>
        </div>

        {/* Nav tabs */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 24 }}>
          {[
            { label: 'Why Choose It?', active: phase !== 's2', onClick: () => phase === 's2' && goToS1() },
            { label: 'How It Works?', active: phase === 's2', onClick: () => phase !== 's2' && goToS2() },
          ].map(tab => (
            <button key={tab.label} onClick={tab.onClick} style={{
              background: 'none', border: 'none', padding: '4px 0',
              fontFamily: FO, fontSize: 13,
              fontWeight: tab.active ? 600 : 400,
              color: tab.active ? '#2C2820' : '#C8C0B5',
              borderBottom: tab.active ? '1.5px solid #2C2820' : '1.5px solid transparent',
              cursor: 'var(--cursor-cute), pointer', transition: 'color 0.2s',
            }}>{tab.label}</button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div style={{ position: 'absolute', top: 64, bottom: 0, left: 0, right: 0 }}>
        {phase !== 's2' && <WhyScreen fading={phase === 'fading'} />}
        <Screen2 visible={phase === 's2'} workflowStep={workflowStep} />
      </div>

      <PageArrows onPrev={handleOfferPrev} onNext={handleOfferNext} />
    </div>
  )
}
