import { useState, useCallback, useRef } from 'react'
import { useCrossProjectNav } from './useCrossProjectNav'
import PageArrows from './PageArrows'
import NextProductHint from './NextProductHint'
import Lightbox from './Lightbox'
import dogImg from '@/imports/gunshu-dog.png'
import screen01 from '@/imports/2.1.png'
import screen02 from '@/imports/2.2.png'
import screen03 from '@/imports/2.3.png'

/* ════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════ */

const F = "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif"
const FREDOKA = "'Fredoka', 'PingFang SC', 'Microsoft YaHei', sans-serif"

const CARD_SHELL: React.CSSProperties = {
  background: '#FFFDF9',
  border: '1px solid #EEE7DD',
  borderRadius: 20,
  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
  transition: 'transform 300ms ease, box-shadow 300ms ease',
}

const VALUE_SHELL: React.CSSProperties = {
  background: '#FFFDF9',
  border: '1px solid rgba(220,210,195,0.5)',
  borderRadius: 24,
  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
  transition: 'transform 300ms ease, box-shadow 300ms ease',
  padding: 28,
  display: 'flex',
  flexDirection: 'column',
}

function hi(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = 'translateY(-4px)'
  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.06)'
}
function ho(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = 'translateY(0px)'
  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)'
}

/* ════════════════════════════════════════
   PRIMITIVES
════════════════════════════════════════ */

function Badge({ n, bg }: { n: string; bg: string }) {
  return (
    <div style={{
      width: 30, height: 30, borderRadius: '50%', background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff',
    }}>{n}</div>
  )
}

function GrayPill({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 12px', background: '#F0EBE3',
      borderRadius: 100, fontFamily: F, fontSize: 12, fontWeight: 600, color: '#6B6056',
    }}>{label}</span>
  )
}

function FlowNode({ label, variant = 'gray' }: { label: string; variant?: 'gray' | 'green' | 'small' }) {
  const green = variant === 'green'
  const small = variant === 'small'
  return (
    <div style={{
      padding: small ? '3px 10px' : '6px 16px',
      background: green ? '#D8EEDE' : '#F0EBE3',
      border: green ? '1px solid #B8D8C4' : 'none',
      borderRadius: 8,
      fontFamily: F, fontSize: small ? 11 : 13, fontWeight: 500,
      color: green ? '#2A7049' : '#3D342A', textAlign: 'center',
    }}>{label}</div>
  )
}

function VLine({ h = 10 }: { h?: number }) {
  return <div style={{ width: 1, height: h, background: '#C8C0B0', flexShrink: 0 }} />
}

function GreenArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 1 L7 11 M3 8 L7 12 L11 8" stroke="#4A9E6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckBadge({ color, text }: { color: string; text: string }) {
  return (
    <div style={{
      marginTop: 14, borderRadius: 10, padding: '8px 14px',
      background: color + '18',
      display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="7" fill={color + '28'} stroke={color} strokeWidth="1.2" />
        <path d="M5 8 L7 10.2 L11 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: F, fontSize: 12, fontWeight: 500, color }}>{text}</span>
    </div>
  )
}

/* ════════════════════════════════════════
   PAIN CARD 01  — 380 × 250
════════════════════════════════════════ */

function PainCard01() {
  return (
    <div style={{ ...CARD_SHELL, width: 380, minHeight: 250, padding: 24, boxSizing: 'border-box' }}
      onMouseEnter={hi} onMouseLeave={ho}>
      {/* title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Badge n="01" bg="#E87040" />
        <span style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#292929', lineHeight: 1.3 }}>
          数据隔离导致 AI 缺乏真实业务依据
        </span>
      </div>
      {/* two-column body */}
      <div style={{ display: 'flex', gap: 16 }}>
        {/* left */}
        <div style={{ flex: '0 0 130px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {['用户行为', '消费记录', '交易信息'].map(t => <GrayPill key={t} label={t} />)}
          </div>
          <p style={{ fontFamily: F, fontSize: 12.5, color: '#756B62', lineHeight: 1.65, margin: '6px 0 0' }}>
            由于数据安全限制，<br />无法直接输入通用 LLM
          </p>
        </div>
        {/* right: flow */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <span style={{ fontFamily: F, fontSize: 11, color: '#A89C8E', alignSelf: 'flex-start', marginBottom: 2 }}>传统 LLM：</span>
          <FlowNode label="购买手机" />
          <VLine />
          <FlowNode label="猜测兴趣" />
          <div style={{ display: 'flex', gap: 4, margin: '3px 0' }}>
            {['旅游?', '豪车?', '科技生活?'].map(t => <FlowNode key={t} label={t} variant="small" />)}
          </div>
          <VLine />
          <FlowNode label="泛化建议" />
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   PAIN CARD 02  — 380 × 160
════════════════════════════════════════ */

function PainCard02() {
  return (
    <div style={{ ...CARD_SHELL, width: 380, minHeight: 155, padding: 24, boxSizing: 'border-box' }}
      onMouseEnter={hi} onMouseLeave={ho}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <Badge n="02" bg="#E87040" />
        <span style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#292929', lineHeight: 1.3 }}>
          缺少企业知识背景，AI 难以理解业务语境
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {['企业定位', '产品特点', '历史策略', '行业经验'].map(t => <GrayPill key={t} label={t} />)}
      </div>
      <div style={{ borderTop: '1px solid #EEE7DD', paddingTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: F, fontSize: 12, color: '#9C9489', flexShrink: 0 }}>导致：</span>
        {['策略不符合业务目标', '缺少执行价值'].map(t => (
          <div key={t} style={{
            padding: '5px 14px', background: '#FFF3EC',
            border: '1px solid #F0C4A0', borderRadius: 100,
            fontFamily: F, fontSize: 12, fontWeight: 600, color: '#E87040',
          }}>{t}</div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   VALUE CARD 01 — DATA GROUNDED AI
════════════════════════════════════════ */

function DataGroundedCard() {
  return (
    <div style={VALUE_SHELL} onMouseEnter={hi} onMouseLeave={ho}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Badge n="01" bg="#4A9E6F" />
        <div>
          <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#292929' }}>Data Grounded AI</div>
          <div style={{ fontFamily: F, fontSize: 12.5, color: '#9C9489', marginTop: 2 }}>数据驱动，降低 AI 幻觉</div>
        </div>
      </div>

      {/* comparison */}
      <div style={{ flex: 1, display: 'flex', gap: 8, marginTop: 18 }}>
        {/* traditional */}
        <div style={{
          flex: 1, background: '#F5F2ED', borderRadius: 14,
          padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}>
          <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#6B5A4A', marginBottom: 4 }}>传统 LLM</div>
          <FlowNode label="买手机" />
          <VLine />
          <FlowNode label="猜测兴趣" />
          <VLine />
          <FlowNode label="泛化建议" />
        </div>

        {/* VS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            border: '1.5px solid #D0C8BC', background: '#FDFAF6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: F, fontSize: 10, fontWeight: 700, color: '#9C9489',
          }}>VS</div>
        </div>

        {/* 群策 */}
        <div style={{
          flex: 1, background: '#EEF8F2', border: '1px solid #C0DEC9', borderRadius: 14,
          padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}>
          <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#2A7049', marginBottom: 4 }}>群策</div>
          <FlowNode label="真实行为洞察" variant="green" />
          <GreenArrow />
          <div style={{
            background: '#FFF8F0', border: '1px solid #F0D8C0', borderRadius: 8,
            padding: '6px 10px', width: '100%',
          }}>
            {['消费频率', '品牌偏好', '品类偏好'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#E87040', flexShrink: 0 }} />
                <span style={{ fontFamily: F, fontSize: 11, color: '#6B5A4A' }}>{t}</span>
              </div>
            ))}
          </div>
          <GreenArrow />
          <FlowNode label="可信用户洞察" variant="green" />
        </div>
      </div>

      <CheckBadge color="#4A9E6F" text="基于真实数据，洞察更准确，策略更可信" />
    </div>
  )
}

/* ════════════════════════════════════════
   VALUE CARD 02 — CONTROLLED MULTI-AGENT
════════════════════════════════════════ */

function MultiAgentCard() {
  return (
    <div style={VALUE_SHELL} onMouseEnter={hi} onMouseLeave={ho}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Badge n="02" bg="#5B9ABE" />
        <div>
          <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#292929' }}>Controlled Multi-Agent</div>
          <div style={{ fontFamily: F, fontSize: 12.5, color: '#9C9489', marginTop: 2 }}>专业 Agent 分工，而非单一 chatbot</div>
        </div>
      </div>

      <p style={{ fontFamily: F, fontSize: 13, color: '#756B62', lineHeight: 1.7, margin: '14px 0 0' }}>
        通过 Orchestrator 调度多个专业 Agent，<br />实现可控、可解释的分析业务流程。
      </p>

      {/* architecture */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 0 }}>
        {/* orchestrator box */}
        <div style={{
          padding: '10px 28px', border: '1.5px solid #B7CEDD',
          borderRadius: 12, background: '#fff', textAlign: 'center',
        }}>
          <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#292929' }}>Orchestrator</div>
          <div style={{ fontFamily: F, fontSize: 11, color: '#9C9489', marginTop: 2 }}>任务调度</div>
        </div>

        {/* SVG tree */}
        <svg width="220" height="36" viewBox="0 0 220 36" fill="none" style={{ flexShrink: 0 }}>
          <line x1="110" y1="0" x2="110" y2="18" stroke="#B7CEDD" strokeWidth="1.5" />
          <line x1="36" y1="18" x2="184" y2="18" stroke="#B7CEDD" strokeWidth="1.5" />
          <line x1="36" y1="18" x2="36" y2="36" stroke="#B7CEDD" strokeWidth="1.5" />
          <line x1="110" y1="18" x2="110" y2="36" stroke="#B7CEDD" strokeWidth="1.5" />
          <line x1="184" y1="18" x2="184" y2="36" stroke="#B7CEDD" strokeWidth="1.5" />
        </svg>

        {/* 3 agent boxes */}
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          {[
            { name: 'Data Agent', sub: '数据处理' },
            { name: 'Insight Agent', sub: '用户洞察' },
            { name: 'Strategy Agent', sub: '策略生成' },
          ].map(a => (
            <div key={a.name} style={{
              flex: 1, padding: '10px 6px', border: '1.5px solid #B7CEDD',
              borderRadius: 12, background: '#fff', textAlign: 'center',
            }}>
              <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#292929' }}>{a.name}</div>
              <div style={{ fontFamily: F, fontSize: 10.5, color: '#9C9489', marginTop: 3 }}>{a.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <CheckBadge color="#5B9ABE" text="分工协作，流程可控，结果可解释" />
    </div>
  )
}

/* ════════════════════════════════════════
   VALUE CARD 03 — BUSINESS GROWTH
════════════════════════════════════════ */

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="8" cy="7" r="3" stroke="#E87040" strokeWidth="1.5" />
      <path d="M2 17 C2 13.5 5 11.5 8 11.5 C11 11.5 14 13.5 14 17" stroke="#E87040" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="14.5" cy="6.5" r="2.5" stroke="#E87040" strokeWidth="1.5" />
      <path d="M17 15.5 C17 13.2 15.5 12 14.5 12" stroke="#E87040" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3.5" stroke="#E87040" strokeWidth="1.5" />
      <path d="M3 18 C3 14 6.5 12 10 12 C13.5 12 17 14 17 18" stroke="#E87040" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M14 3 L17 6 L7 16 L4 17 L5 14 Z" stroke="#E87040" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <line x1="12" y1="5" x2="15" y2="8" stroke="#E87040" strokeWidth="1.5" />
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="12" width="3.5" height="6" rx="1" stroke="#E87040" strokeWidth="1.5" />
      <rect x="8" y="8" width="3.5" height="10" rx="1" stroke="#E87040" strokeWidth="1.5" />
      <rect x="14" y="4" width="3.5" height="14" rx="1" stroke="#E87040" strokeWidth="1.5" />
      <path d="M3.75 9 L9.75 6 L15.75 2.5" stroke="#E87040" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const GROWTH_STEPS = [
  { label: '用户分群', icon: <UsersIcon /> },
  { label: '用户画像', icon: <PersonIcon /> },
  { label: '营销策略', icon: <EditIcon /> },
  { label: '增长决策', icon: <ChartIcon /> },
]

function BusinessGrowthCard() {
  return (
    <div style={VALUE_SHELL} onMouseEnter={hi} onMouseLeave={ho}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Badge n="03" bg="#E87040" />
        <div>
          <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#292929' }}>Business Growth</div>
          <div style={{ fontFamily: F, fontSize: 12.5, color: '#9C9489', marginTop: 2 }}>从洞察到策略闭环</div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, marginTop: 16 }}>
        {GROWTH_STEPS.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: '#FFF5EE', borderRadius: 100,
              padding: '10px 22px', width: '88%', boxSizing: 'border-box',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: '#FFE8D6', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {step.icon}
              </div>
              <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#292929' }}>{step.label}</span>
            </div>
            {i < 3 && (
              <div style={{ width: 1, height: 16, background: '#DDD0C4', margin: '3px 0' }} />
            )}
          </div>
        ))}
      </div>

      <CheckBadge color="#E87040" text="洞察驱动增长，策略直接推动业务" />
    </div>
  )
}

/* ════════════════════════════════════════
   HEADER
════════════════════════════════════════ */

function Header({ onBack, page, setPage }: { onBack: () => void; page: number; setPage: (n: number) => void }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 64, zIndex: 50,
      display: 'flex', alignItems: 'center', padding: '0 48px',
      borderBottom: '1px solid rgba(232,220,203,0.45)',
      background: 'rgba(250,248,243,0.92)', backdropFilter: 'blur(8px)',
    }}>
      {/* Back */}
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'none', border: 'none', padding: '6px 0',
        borderRadius: 8, cursor: 'var(--cursor-cute), pointer',
        fontFamily: F, fontSize: 13, fontWeight: 500, color: '#9A8472',
        transition: 'color 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.color = '#4A3020'}
        onMouseLeave={e => e.currentTarget.style.color = '#9A8472'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      {/* Center */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: '#292929', lineHeight: 1.2 }}>群策</div>
        <div style={{ fontFamily: F, fontSize: 10, color: '#C4A258', fontWeight: 600, marginTop: 1, letterSpacing: '0.02em' }}>
          AI Customer Intelligence Agent
        </div>
      </div>

      {/* Right tabs */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 24 }}>
        {['Why Choose It?', 'How It Works?'].map((label, i) => (
          <button key={i} onClick={() => setPage(i)} style={{
            background: 'none', border: 'none', padding: '4px 0',
            fontFamily: F, fontSize: 13, fontWeight: i === page ? 600 : 400,
            color: i === page ? '#2C2820' : '#C8C0B5',
            cursor: 'var(--cursor-cute), pointer',
            borderBottom: i === page ? '1.5px solid #2C2820' : '1.5px solid transparent',
            transition: 'color 0.2s',
          }}>{label}</button>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   PAGE 1 — WHY CHOOSE IT?
════════════════════════════════════════ */

function Page1({ visible, onDown, onNavigatePrev }: { visible: boolean; onDown: () => void; onNavigatePrev?: () => void }) {
  const lock = useRef(false)
  const tStart = useRef({ x: 0, y: 0 })
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (lock.current) return
    lock.current = true
    if (e.deltaY > 0) {
      onDown()
      setTimeout(() => { lock.current = false }, 700)
    } else if (e.deltaY < 0 && onNavigatePrev) {
      onNavigatePrev()
      // keep lock — navigating away
    } else {
      lock.current = false
    }
  }, [onDown, onNavigatePrev])

  // Touch / tap fallback (mobile, no wheel)
  const onTouchStart = (e: React.TouchEvent) => { tStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (lock.current) return
    const dx = e.changedTouches[0].clientX - tStart.current.x
    const dy = e.changedTouches[0].clientY - tStart.current.y
    if (Math.abs(dy) < 50 && Math.abs(dx) < 50) return
    const up = dy < 0 || (Math.abs(dx) > Math.abs(dy) && dx < 0)
    const down = dy > 0 || (Math.abs(dx) > Math.abs(dy) && dx > 0)
    if (down) { lock.current = true; onDown(); setTimeout(() => { lock.current = false }, 700) }
    else if (up && onNavigatePrev) onNavigatePrev()
  }
  const onClick = (e: React.MouseEvent) => {
    if (lock.current) return
    lock.current = true
    if (e.clientX < window.innerWidth / 2) { if (onNavigatePrev) onNavigatePrev() }
    else { onDown() }
    setTimeout(() => { lock.current = false }, 700)
  }

  return (
    <div
      style={{
        position: 'absolute', inset: 0, paddingTop: 64,
        opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.38s ease',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}
      onWheel={handleWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
      <div style={{ flex: 1, padding: '28px 56px 20px', display: 'flex', flexDirection: 'column', minHeight: 0, gap: 0, position: 'relative' }}>

        {/* ── Title row ── */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 22 }}>
          <div style={{ flex: '0 0 380px' }}>
            <div style={{ fontFamily: F, fontSize: 36, fontWeight: 700, color: '#292929', lineHeight: 1.15 }}>
              Why Choose 群策?
            </div>
            <div style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#756B62', marginTop: 6 }}>
              为什么企业需要群策
            </div>
          </div>
        </div>

        {/* Subtitle — absolute to page top, same as Offer到 */}
        <p style={{ position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)', width: 560, margin: 0, fontFamily: F, fontSize: 13, color: '#9C9489', lineHeight: 1.8, textAlign: 'center' }}>
          一个面向企业增长场景的 AI Customer Intelligence Agent，<br />
          通过真实用户数据与企业知识，帮助团队生成更精准、更可信的营销策略。
        </p>

        {/* ── Content row ── */}
        <div style={{ display: 'flex', gap: 32, flex: 1, minHeight: 0, alignItems: 'flex-start', paddingTop: 26 }}>

          {/* LEFT: Pain Points */}
          <div style={{ flex: '0 0 380px' }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: '#F07838', letterSpacing: '1.2px', marginBottom: 4 }}>USER PAIN POINTS</div>
            <div style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#24150F', marginBottom: 24 }}>{'企业 AI 应用中的两个核心问题'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <PainCard01 />
              <PainCard02 />
            </div>
          </div>

          {/* RIGHT: Core Value cards */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: '#52906A', letterSpacing: '0.08em', marginBottom: 6 }}>CORE VALUE</div>
            <div style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#24150F', marginBottom: 24 }}>{'群策的三大核心价值'}</div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20, alignItems: 'stretch',
            }}>
              <DataGroundedCard />
              <MultiAgentCard />
              <BusinessGrowthCard />
            </div>
          </div>
        </div>
      </div>

      {/* Dog mascot */}
      <div style={{
        position: 'absolute', right: 10, bottom: 20, width: 180,
        pointerEvents: 'none', zIndex: 10,
        animation: 'iconDrift 5s ease-in-out infinite',
      }}>
        <img src={dogImg} alt="" loading="lazy" style={{ width: '100%', height: 'auto', mixBlendMode: 'multiply', display: 'block' }} />
      </div>

      <TryGunshuButton />
    </div>
  )
}

/* ════════════════════════════════════════
   PAGE 2 — HOW IT WORKS?
   (mockup version until screenshots are available)
════════════════════════════════════════ */

/* ════════════════════════════════════════
   PAGE 2 — HOW IT WORKS?
════════════════════════════════════════ */

const CARD_SPECS = [
  {
    color: '#6DBA8A', textColor: '#2A6044', bgColor: '#EEF8F2',
    agentName: 'Data Agent', badge: '01',
    title: 'Data Understanding', subtitle: '数据理解与用户分群',
    screen: screen01,
    input: ['用户消费数据'],
    processing: ['数据清洗', '消费行为分析', '品类偏好分析', '用户分群'],
    output: ['User Segments', '用户分群结果', '用户消费特征'],
  },
  {
    color: '#5B9FE8', textColor: '#1E5C8E', bgColor: '#EEF4FD',
    agentName: 'Insight Agent', badge: '02',
    title: 'Customer Insight', subtitle: '用户洞察生成',
    screen: screen02,
    input: ['User Segments', '用户分群结果'],
    processing: ['消费行为分析', '消费偏好分析', '用户画像生成'],
    output: ['Customer Insight', '用户洞察'],
  },
  {
    color: '#FF9B55', textColor: '#8B4A0E', bgColor: '#FFF4EB',
    agentName: 'Strategy Agent', badge: '03',
    title: 'Strategy Generation', subtitle: '营销策略生成',
    screen: screen03,
    extraAgent: 'Knowledge Retrieval (RAG)',
    input: ['用户洞察', '业务问题', '企业知识'],
    processing: ['营销机会分析', '策略生成', '方案优化'],
    output: ['Marketing Strategy', '营销策略'],
  },
]

type CardSpec = typeof CARD_SPECS[number]

function ArchitecturePanel({ activeIdx, onSelect }: { activeIdx: number; onSelect?: (idx: number) => void }) {
  const greenFull = { bg: '#EEF8F2', border: '#6DBA8A', color: '#2A6044' }
  const greenDim  = { bg: '#FAFAF8', border: '#D8EDE0', color: '#A0B8AA' }
  const blueFull  = { bg: '#EEF4FD', border: '#5B9FE8', color: '#1E5C8E' }
  const blueDim   = { bg: '#FAFAF8', border: '#D8E8F8', color: '#A0B8D0' }
  const orangeFull = { bg: '#FFF4EB', border: '#FF9B55', color: '#8B4A0E' }
  const orangeDim  = { bg: '#FAFAF8', border: '#EEE7DD', color: '#B0A898' }

  const dS = activeIdx === 0 ? greenFull : greenDim
  const iS = activeIdx === 1 ? blueFull : blueDim
  const kS = activeIdx === 2 ? orangeFull : orangeDim
  const sS = activeIdx === 2 ? orangeFull : orangeDim

  const node = (label: string, sub: string, s: { bg: string; border: string; color: string }, active = false, idx?: number) => (
    <div
      onClick={idx !== undefined && onSelect ? () => onSelect(idx) : undefined}
      style={{
        flex: 1, padding: active ? '12px 6px' : '10px 6px', background: s.bg, border: `1.5px solid ${s.border}`,
        borderRadius: 12, textAlign: 'center', transition: 'all 0.4s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: onSelect && idx !== undefined ? 'pointer' : 'default',
      }}>
      <div style={{ fontFamily: F, fontSize: active ? 17 : 15, fontWeight: active ? 800 : 700, color: s.color, transition: 'all 0.4s ease', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ fontFamily: F, fontSize: active ? 14 : 12.5, color: s.color + '99', marginTop: 2, lineHeight: 1.3, fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>{sub}</div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* User Query */}
      <div style={{ padding: '10px 30px', background: '#F5F2ED', border: '1px solid #E0D8CC', borderRadius: 10, fontFamily: F, fontSize: 16, fontWeight: 800, color: '#756B62' }}>
        User Query
      </div>
      <svg width="2" height="14" style={{ flexShrink: 0 }}><line x1="1" y1="0" x2="1" y2="14" stroke="#D0C8BC" strokeWidth="1.4" /></svg>

      {/* Orchestrator */}
      <div style={{ padding: '13px 40px', background: '#FFF4EB', border: '1.5px solid #F0C4A0', borderRadius: 14, textAlign: 'center' }}>
        <div style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: '#C05010' }}>Orchestrator Agent</div>
        <div style={{ fontFamily: F, fontSize: 14, color: '#C0601099', marginTop: 2, fontWeight: 600 }}>意图理解 / 任务编排</div>
      </div>

      {/* Fan-out: Orchestrator → 3 agents */}
      <svg width="400" height="24" viewBox="0 0 400 24" fill="none" style={{ flexShrink: 0 }}>
        <line x1="200" y1="0" x2="200" y2="10" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="66" y1="10" x2="334" y2="10" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="66" y1="10" x2="66" y2="24" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="200" y1="10" x2="200" y2="24" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="334" y1="10" x2="334" y2="24" stroke="#D0C8BC" strokeWidth="1.2" />
      </svg>

      {/* 3 Sub-agents */}
      <div style={{ display: 'flex', gap: 8, width: 400, alignItems: 'stretch' }}>
        {node('Data Agent', '数据分析', dS, activeIdx === 0, 0)}
        {node('Insight Agent', '用户洞察', iS, activeIdx === 1, 1)}
        {node('Knowledge Agent', '企业知识RAG', kS, activeIdx === 2, 2)}
      </div>

      {/* Fan-in: 3 agents → Strategy Agent */}
      <svg width="400" height="24" viewBox="0 0 400 24" fill="none" style={{ flexShrink: 0 }}>
        <line x1="66" y1="0" x2="66" y2="14" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="200" y1="0" x2="200" y2="14" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="334" y1="0" x2="334" y2="14" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="66" y1="14" x2="334" y2="14" stroke="#D0C8BC" strokeWidth="1.2" />
        <line x1="200" y1="14" x2="200" y2="24" stroke="#D0C8BC" strokeWidth="1.2" />
      </svg>

      {/* Strategy Agent */}
      <div
        onClick={() => onSelect && onSelect(2)}
        style={{
          padding: activeIdx === 2 ? '13px 40px' : '11px 38px', background: sS.bg, border: `1.5px solid ${sS.border}`,
          borderRadius: 14, textAlign: 'center', transition: 'all 0.4s ease',
          cursor: onSelect ? 'pointer' : 'default',
        }}>
        <div style={{ fontFamily: F, fontSize: activeIdx === 2 ? 17 : 15, fontWeight: activeIdx === 2 ? 800 : 700, color: sS.color, transition: 'all 0.4s ease' }}>Strategy Agent</div>
        <div style={{ fontFamily: F, fontSize: activeIdx === 2 ? 14 : 12, color: sS.color + '99', marginTop: 2, fontWeight: activeIdx === 2 ? 600 : 400 }}>营销策略生成</div>
      </div>
    </div>
  )
}

function AIEnginePanel() {
  const items = [
    { label: 'LLM Reasoning', icon: (
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="#9C9489" strokeWidth="1.2" />
        <path d="M5 5.5 C5 4.2 6 3.5 7 3.5 C8.2 3.5 9 4.3 9 5.3 C9 6.3 8.2 6.8 7.4 7.5 L7 8" stroke="#9C9489" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="7" cy="9.5" r="0.7" fill="#9C9489" />
      </svg>
    )},
    { label: 'RAG Retrieval', icon: (
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="1.5" width="4" height="4" rx="1" stroke="#9C9489" strokeWidth="1.2" />
        <rect x="8.5" y="1.5" width="4" height="4" rx="1" stroke="#9C9489" strokeWidth="1.2" />
        <rect x="1.5" y="8.5" width="4" height="4" rx="1" stroke="#9C9489" strokeWidth="1.2" />
        <rect x="8.5" y="8.5" width="4" height="4" rx="1" stroke="#9C9489" strokeWidth="1.2" />
      </svg>
    )},
    { label: 'Agent Orchestration', icon: (
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="#9C9489" strokeWidth="1.2" />
        <path d="M7 3.5 L7 7 L9.5 9" stroke="#9C9489" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )},
    { label: 'Data Grounding', icon: (
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
        <ellipse cx="7" cy="4.5" rx="4.5" ry="2" stroke="#9C9489" strokeWidth="1.2" />
        <path d="M2.5 4.5 L2.5 9.5 C2.5 10.6 4.5 11.5 7 11.5 C9.5 11.5 11.5 10.6 11.5 9.5 L11.5 4.5" stroke="#9C9489" strokeWidth="1.2" />
        <path d="M2.5 7 C2.5 8.1 4.5 9 7 9 C9.5 9 11.5 8.1 11.5 7" stroke="#9C9489" strokeWidth="1.2" />
      </svg>
    )},
  ]
  return (
    <div style={{ marginTop: 30, background: '#F5F2ED', borderRadius: 16, padding: '14px 18px', flexShrink: 0 }}>
      <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#A09080', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>AI Engine</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {items.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {item.icon}
            </div>
            <span style={{ fontFamily: F, fontSize: 12.5, color: '#6B6056', fontWeight: 500, lineHeight: 1.3 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CarouselCard({ spec, isActive, hovering, onEnter, onLeave, onScreenshotClick }: {
  spec: CardSpec; isActive: boolean; hovering: boolean;
  onEnter: () => void; onLeave: () => void; onScreenshotClick: () => void;
}) {
  const ty = hovering ? -6 : 0
  const scale = hovering ? 1.06 : 1
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: 480, background: '#FFFDF9',
        border: '1px solid rgba(220,210,195,0.35)',
        borderRadius: 32,
        boxShadow: isActive ? '0 30px 80px rgba(0,0,0,0.08)' : '0 12px 40px rgba(0,0,0,0.04)',
        boxSizing: 'border-box', padding: 26,
        display: 'flex', flexDirection: 'column',
        transform: `translateY(${ty}px) scale(${scale})`,
        transition: 'transform 300ms ease, box-shadow 300ms ease',
        userSelect: 'none',
      }}
    >
      {/* Badge + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', background: spec.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: F, fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>{spec.badge}</div>
        <div>
          <div style={{ fontFamily: F, fontSize: 19, fontWeight: 700, color: '#292929', lineHeight: 1.2 }}>{spec.title}</div>
          <div style={{ fontFamily: F, fontSize: 12, color: '#9C9489', marginTop: 3 }}>{spec.subtitle}</div>
        </div>
      </div>

      {/* Screenshot */}
      <div data-no-turn onClick={onScreenshotClick} style={{ borderRadius: 14, overflow: 'hidden', height: 300, marginBottom: 16, flexShrink: 0, border: '1px solid rgba(220,210,195,0.3)', background: '#fff', cursor: 'var(--cursor-cute), pointer', position: 'relative' }}>
        <img src={spec.screen} alt={spec.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center', display: 'block' }} />
        <div style={{ position: 'absolute', right: 10, bottom: 10, padding: '4px 10px', borderRadius: 100, background: 'rgba(41,41,41,0.62)', color: '#fff', fontFamily: F, fontSize: 11, fontWeight: 600, pointerEvents: 'none' }}>点击放大</div>
      </div>

      {/* Agent section */}
      <div style={{ background: spec.bgColor, borderRadius: 16, padding: '13px 14px', flex: 1 }}>
        {/* Agent label(s) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 11 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: spec.color, flexShrink: 0 }} />
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: spec.textColor }}>{spec.agentName}</span>
          </div>
          {('extraAgent' in spec) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: spec.color, flexShrink: 0 }} />
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: spec.textColor }}>{(spec as CardSpec & { extraAgent: string }).extraAgent}</span>
            </div>
          )}
        </div>

        {/* I / P / O columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1fr', gap: 8 }}>
          {(['Input', 'Processing', 'Output'] as const).map(col => {
            const items = col === 'Input' ? spec.input : col === 'Processing' ? spec.processing : spec.output
            return (
              <div key={col}>
                <div style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: spec.color, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col}</div>
                {items.map(t => (
                  <div key={t} style={{ display: 'flex', gap: 4, alignItems: 'baseline', marginBottom: 2 }}>
                    <span style={{ color: spec.color, fontSize: 7, flexShrink: 0, lineHeight: '16px' }}>▸</span>
                    <span style={{ fontFamily: F, fontSize: 10.5, color: spec.textColor, lineHeight: 1.55 }}>{t}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Page2({ visible, onUp, onNavigateNext, activeIdx, setActiveIdx }: {
  visible: boolean; onUp: () => void
  onNavigateNext?: () => void
  activeIdx: number
  setActiveIdx: (updater: (prev: number) => number) => void
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const lock = useRef(false)
  const tStart = useRef({ x: 0, y: 0 })

  const CARD_W = 520
  const INACTIVE_SCALE = 0.78
  const OFFSET = 500

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (lock.current) return
    const dir = e.deltaY > 0 ? 1 : -1
    if (dir > 0 && activeIdx < 2) {
      lock.current = true; setActiveIdx(i => i + 1); setTimeout(() => { lock.current = false }, 500)
    } else if (dir > 0 && activeIdx === 2 && onNavigateNext) {
      lock.current = true
      onNavigateNext()
    } else if (dir < 0 && activeIdx > 0) {
      lock.current = true; setActiveIdx(i => i - 1); setTimeout(() => { lock.current = false }, 500)
    } else if (dir < 0 && activeIdx === 0) {
      onUp()
    }
  }, [activeIdx, onUp, onNavigateNext])

  // Touch / tap fallback (mobile, no wheel)
  const onTouchStart = (e: React.TouchEvent) => { tStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (lock.current) return
    const dx = e.changedTouches[0].clientX - tStart.current.x
    const dy = e.changedTouches[0].clientY - tStart.current.y
    if (Math.abs(dy) < 50 && Math.abs(dx) < 50) return
    const up = dy < 0 || (Math.abs(dx) > Math.abs(dy) && dx < 0)
    const down = dy > 0 || (Math.abs(dx) > Math.abs(dy) && dx > 0)
    if (down) {
      lock.current = true
      if (activeIdx < 2) { setActiveIdx(i => i + 1); setTimeout(() => { lock.current = false }, 500) }
      else if (onNavigateNext) onNavigateNext()
    } else if (up) {
      lock.current = true
      if (activeIdx > 0) { setActiveIdx(i => i - 1); setTimeout(() => { lock.current = false }, 500) }
      else onUp()
    }
  }
  const onClick = (e: React.MouseEvent) => {
    if (lock.current) return
    lock.current = true
    const left = e.clientX < window.innerWidth / 2
    if (!left) {
      if (activeIdx < 2) { setActiveIdx(i => i + 1); setTimeout(() => { lock.current = false }, 500) }
      else if (onNavigateNext) onNavigateNext()
    } else {
      if (activeIdx > 0) { setActiveIdx(i => i - 1); setTimeout(() => { lock.current = false }, 500) }
      else onUp()
    }
  }

  function cardPos(cardIdx: number) {
    const rel = cardIdx - activeIdx
    const tx = rel * OFFSET
    const scale = rel === 0 ? 1.1 : INACTIVE_SCALE
    const opacity = Math.abs(rel) > 1 ? 0 : rel === 0 ? 1.0 : 0.44
    const zIndex = rel === 0 ? 10 : rel < 0 ? 1 : 5
    return { tx, scale, opacity, zIndex }
  }

  return (
    <div
      style={{
        position: 'absolute', inset: 0, paddingTop: 64,
        opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.38s ease', overflow: 'hidden',
      }}
      onWheel={handleWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
      {/* Hover hot-zones: hover left side → slide up (prev), hover right side → slide down (next) */}
      {activeIdx > 0 && (
        <div
          onMouseEnter={() => {
            if (lock.current) return
            lock.current = true
            setActiveIdx(i => Math.max(0, i - 1))
            setTimeout(() => { lock.current = false }, 500)
          }}
          style={{ position: 'absolute', left: 0, top: 64, bottom: 0, width: '40%', zIndex: 15, cursor: 'w-resize' }}
        />
      )}
      {activeIdx < 2 && (
        <div
          onMouseEnter={() => {
            if (lock.current) return
            lock.current = true
            setActiveIdx(i => Math.min(2, i + 1))
            setTimeout(() => { lock.current = false }, 500)
          }}
          style={{ position: 'absolute', right: 0, top: 64, bottom: 0, width: '40%', zIndex: 15, cursor: 'e-resize' }}
        />
      )}
      {activeIdx === 2 && (
        <div
          onMouseEnter={() => {
            if (lock.current) return
            lock.current = true
            onNavigateNext && onNavigateNext()
          }}
          style={{ position: 'absolute', right: 0, top: 64, bottom: 0, width: '40%', zIndex: 15, cursor: 'e-resize' }}
        />
      )}
      <div style={{ height: '100%', padding: '24px 56px 18px', display: 'flex', gap: 44, boxSizing: 'border-box' }}>

        {/* LEFT — Architecture */}
        <div style={{ width: 400, flexShrink: 0, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: F, fontSize: 36, fontWeight: 700, color: '#292929', lineHeight: 1.15 }}>How It Works?</div>
            <div style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#756B62', marginTop: 6 }}>从用户数据分析，到营销策略生成</div>
          </div>
          <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#4B3F35', marginTop: 8, marginBottom: 14, letterSpacing: '-0.01em' }}>Controlled Multi-Agent System</div>
          <ArchitecturePanel activeIdx={activeIdx} onSelect={(idx) => {
            if (lock.current) return
            lock.current = true
            setActiveIdx(idx)
            setTimeout(() => { lock.current = false }, 400)
          }} />
          <AIEnginePanel />
        </div>

        {/* RIGHT — Carousel */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Label */}
          <div style={{ marginBottom: 14, flexShrink: 0, marginLeft: 24 }}>
            <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#B5ADA2', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Product Flow</div>
            <div style={{ fontFamily: F, fontSize: 16, color: '#9C9489' }}>通过三个阶段完成：数据理解 → 用户洞察 → 策略生成</div>
          </div>

          {/* Cards stage */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible', minHeight: 0 }}>
            {CARD_SPECS.map((spec, i) => {
              const { tx, scale, opacity, zIndex } = cardPos(i)
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: CARD_W,
                    transform: `translateX(${tx}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: 'transform 400ms ease-in-out, opacity 400ms ease-in-out',
                  }}
                >
                  <CarouselCard
                    spec={spec}
                    isActive={i === activeIdx}
                    hovering={hoveredIdx === i}
                    onEnter={() => setHoveredIdx(i)}
                    onLeave={() => setHoveredIdx(null)}
                    onScreenshotClick={() => setLightboxSrc(spec.screen)}
                  />
                </div>
              )
            })}

            {/* Left arrow */}
            {activeIdx > 0 && (
              <button onClick={() => { lock.current = true; setActiveIdx(i => i - 1); setTimeout(() => { lock.current = false }, 500) }} style={{
                position: 'absolute', left: 0, zIndex: 20,
                width: 36, height: 36, borderRadius: '50%',
                background: '#fff', border: '1px solid #E8DCCB',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                cursor: 'var(--cursor-cute), pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M8.5 3 L4.5 7 L8.5 11" stroke="#6B6056" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Right arrow */}
            {activeIdx < 2 && (
              <button onClick={() => { lock.current = true; setActiveIdx(i => i + 1); setTimeout(() => { lock.current = false }, 500) }} style={{
                position: 'absolute', right: 0, zIndex: 20,
                width: 36, height: 36, borderRadius: '50%',
                background: '#fff', border: '1px solid #E8DCCB',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                cursor: 'var(--cursor-cute), pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M5.5 3 L9.5 7 L5.5 11" stroke="#6B6056" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Floating down arrow — scroll to next product (bottom, shifted right, shared) */}
          <NextProductHint
            style={{ left: '45%' }}
            variant={activeIdx === 2 ? 'strong' : 'faint'}
            text={activeIdx === 2 ? '下滑了解下一个产品' : '下滑了解下一个功能'}
          />

          {/* Dots */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {CARD_SPECS.map((_, i) => (
                <div key={i} onClick={() => setActiveIdx(i)} style={{
                  width: i === activeIdx ? 20 : 6, height: 6, borderRadius: 3,
                  background: i === activeIdx ? '#C8A878' : '#D8D0C8',
                  transition: 'all 0.3s ease', cursor: 'var(--cursor-cute), pointer',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <TryGunshuButton />

      <Lightbox src={lightboxSrc} alt="screenshot" onClose={() => setLightboxSrc(null)} />
    </div>
  )
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */

export default function GunshuPage({
  onBack,
  initialPage = 0,
  initialActiveIdx = 0,
  onNavigatePrev,
  onNavigateNext,
}: {
  onBack: () => void
  initialPage?: number
  initialActiveIdx?: number
  onNavigatePrev?: () => void
  onNavigateNext?: () => void
}) {
  const [page, setPage] = useState(initialPage)
  const [activeIdx, setActiveIdx] = useState(initialActiveIdx)
  const navLock = useRef(false)

  // Keep latest page/idx in a ref so the boundary predicates stay stable.
  const pageRef = useRef(page)
  pageRef.current = page
  const idxRef = useRef(activeIdx)
  idxRef.current = activeIdx
  useCrossProjectNav({
    onPrev: onNavigatePrev,
    onNext: onNavigateNext,
    canPrev: () => pageRef.current === 0,   // Page1 up → previous project (Page2 up handled internally)
    canNext: () => false,                   // down-nav handled inside: Page1→Page2, Page2 carousel end→next project
  })

  /* ── unified next/prev (used by touch, tap and arrows) ── */
  const gunshuNext = useCallback(() => {
    if (navLock.current) return
    navLock.current = true
    if (pageRef.current === 0) { setPage(1) }
    else {
      if (idxRef.current < 2) setActiveIdx(i => i + 1)
      else if (onNavigateNext) onNavigateNext()
    }
    setTimeout(() => { navLock.current = false }, 600)
  }, [onNavigateNext])
  const gunshuPrev = useCallback(() => {
    if (navLock.current) return
    navLock.current = true
    if (pageRef.current === 1) {
      if (idxRef.current > 0) setActiveIdx(i => i - 1)
      else setPage(0)
    } else if (onNavigatePrev) onNavigatePrev()
    setTimeout(() => { navLock.current = false }, 600)
  }, [onNavigatePrev])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#FAF8F3', zIndex: 100, overflow: 'hidden' }}>
      <Header onBack={onBack} page={page} setPage={setPage} />
      <Page1 visible={page === 0} onDown={() => setPage(1)} onNavigatePrev={gunshuPrev} />
      <Page2
        visible={page === 1}
        onUp={() => setPage(0)}
        onNavigateNext={gunshuNext}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
      />
      <PageArrows onPrev={gunshuPrev} onNext={gunshuNext} />
    </div>
  )
}

/* ════════════════════════════════════════
   TRY 群策 BUTTON  (与 Offer到 TryOfferButton 一致)
════════════════════════════════════════ */

function TryGunshuButton() {
  const [hovered, setHovered] = useState(false)
  // Mobile-only toast: on touch devices, tapping does NOT navigate — show a hint instead.
  const [mobileHint, setMobileHint] = useState(false)
  const isTouch =
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const handleClick = () => {
    if (isTouch) {
      setMobileHint(true)
      return
    }
    window.open('https://ai-customer-intelligence-agent.vercel.app/', '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ position: 'absolute', right: 72, top: 114, zIndex: 30 }}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box', width: 150, height: 46,
          padding: '13px 24px', borderRadius: 999,
          border: 'none', background: '#5B9FE8', color: '#FFFFFF',
          fontFamily: FREDOKA, fontSize: 17, fontWeight: 800, lineHeight: 1,
          cursor: 'var(--cursor-cute), pointer',
          boxShadow: hovered ? '0 12px 24px rgba(91,159,232,0.32)' : '0 5px 12px rgba(44,40,32,0.12)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'transform 220ms ease, box-shadow 220ms ease',
        }}
      >Try 群策</button>
      {hovered && !isTouch && <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, whiteSpace: 'nowrap', padding: '7px 12px', borderRadius: 12, background: '#FFFDF8', border: '1px solid #5B9FE8', color: '#2C6DB0', fontFamily: F, fontSize: 12, boxShadow: '0 8px 18px rgba(44,40,32,0.12)' }}>✦ 点击跳转至产品网页哦~ ✦</div>}
      {mobileHint && (
        <div
          onClick={(e) => { e.stopPropagation(); setMobileHint(false) }}
          style={{
            position: 'absolute', top: 'calc(100% + 10px)', right: 0, whiteSpace: 'nowrap',
            padding: '9px 14px', borderRadius: 12, background: '#FFFDF8',
            border: '1px solid #5B9FE8', color: '#2C6DB0', fontFamily: F, fontSize: 13,
            fontWeight: 600, boxShadow: '0 8px 18px rgba(44,40,32,0.12)', cursor: 'pointer',
          }}
        >建议PC端使用哦~ ✦</div>
      )}
    </div>
  )
}
