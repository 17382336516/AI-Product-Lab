import { useState, useRef, type ReactNode, type WheelEvent, Fragment } from 'react'

/* ── Why screen assets ── */
import valueCard01 from '@/imports/4.1.png'
import valueCard02 from '@/imports/4.2.png'
import valueCard03 from '@/imports/4.3.png'

/* ── How It Works assets ── */
import shotStudy  from '@/imports/image-23.png'
import shotWrong  from '@/imports/image-24.png'
import shotReview from '@/imports/image-25.png'

const F  = "'Inter', 'DM Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif"
const FR = "'Fredoka', 'Nunito', 'PingFang SC', sans-serif"
const OR = '#C85A2A'       // main orange
const WF = '#E36B35'       // workflow orange

/* ════════════════════════════════════════
   WORKFLOW SVG ICONS
════════════════════════════════════════ */

function IcoUser() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="8.5" r="4.5" stroke={WF} strokeWidth="1.7"/>
      <path d="M3.5 23.5 Q3.5 16 13 16 Q22.5 16 22.5 23.5" stroke={WF} strokeWidth="1.7" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function IcoGlobe() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="10" stroke={WF} strokeWidth="1.7"/>
      <ellipse cx="13" cy="13" rx="4.5" ry="10" stroke={WF} strokeWidth="1.3"/>
      <line x1="3" y1="10" x2="23" y2="10" stroke={WF} strokeWidth="1.3"/>
      <line x1="3" y1="16" x2="23" y2="16" stroke={WF} strokeWidth="1.3"/>
    </svg>
  )
}

function IcoDatabase() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <ellipse cx="13" cy="7.5" rx="8" ry="3.2" stroke={WF} strokeWidth="1.7"/>
      <path d="M5 7.5 L5 18.5 Q5 22 13 22 Q21 22 21 18.5 L21 7.5" stroke={WF} strokeWidth="1.7" fill="none"/>
      <path d="M5 13 Q5 16.5 13 16.5 Q21 16.5 21 13" stroke={WF} strokeWidth="1.3" fill="none"/>
    </svg>
  )
}

function IcoBrain() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M10 6.5 Q7 6.5 6 9.5 Q4 9.5 4 12.5 Q4 15.5 6 16.5 Q6 19.5 8.5 20.5 Q9.5 22 12.5 21 L12.5 6.5Z" stroke={WF} strokeWidth="1.6" fill="none"/>
      <path d="M16 6.5 Q19 6.5 20 9.5 Q22 9.5 22 12.5 Q22 15.5 20 16.5 Q20 19.5 17.5 20.5 Q16.5 22 13.5 21 L13.5 6.5Z" stroke={WF} strokeWidth="1.6" fill="none"/>
      <line x1="12.5" y1="6.5" x2="13.5" y2="6.5" stroke={WF} strokeWidth="1.5"/>
      <line x1="12.5" y1="21" x2="13.5" y2="21" stroke={WF} strokeWidth="1.5"/>
    </svg>
  )
}

function IcoDoc() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M6.5 3.5 L16.5 3.5 L21.5 8.5 L21.5 22.5 L6.5 22.5 Z" stroke={WF} strokeWidth="1.7" fill="none"/>
      <path d="M16.5 3.5 L16.5 8.5 L21.5 8.5" stroke={WF} strokeWidth="1.4" fill="none"/>
      <line x1="10" y1="12.5" x2="18.5" y2="12.5" stroke={WF} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="10" y1="16" x2="18.5" y2="16" stroke={WF} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="10" y1="19.5" x2="15" y2="19.5" stroke={WF} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function IcoTarget() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="10" stroke={WF} strokeWidth="1.7"/>
      <circle cx="13" cy="13" r="5.5" stroke={WF} strokeWidth="1.4"/>
      <path d="M9.5 13 L12 15.5 L17.5 10" stroke={WF} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ════════════════════════════════════════
   WORKFLOW DATA
════════════════════════════════════════ */

const WF_NODES = [
  {
    num: '01', title: '用户输入', Icon: IcoUser,
    lines: ['历史关键词 / 学习目标'],
    extras: ['"安史之乱的原因是什么?"', '"工业革命对社会的影响?"'],
  },
  {
    num: '02', title: '历史知识理解 Agent', Icon: IcoGlobe,
    lines: ['理解用户意图', '拆解学习需求'], bold: true,
  },
  {
    num: '03', title: 'RAG知识检索', Icon: IcoDatabase,
    lines: ['Wikipedia API检索', '历史资料库、图片资源'],
  },
  {
    num: '04', title: 'LLM内容理解', Icon: IcoBrain,
    lines: ['DeepSeek深度理解', '知识提炼与关联分析'],
  },
  {
    num: '05', title: '学习内容生成', Icon: IcoDoc,
    lines: ['结构化内容生成', '考点提炼、内容生成'],
  },
  {
    num: '06', title: '学习反馈与强化', Icon: IcoTarget,
    lines: ['错题记录 / 复习推荐', '反复练习 / 能力提升'],
  },
]

/* ════════════════════════════════════════
   WORKFLOW CARD (coded)
════════════════════════════════════════ */

function WorkflowCard({ compact = false }: { compact?: boolean }) {
  const pad = compact ? '14px 22px 12px' : '20px 28px 18px'
  const iconSz = compact ? 46 : 54
  const headerMb = compact ? 10 : 18
  const feedMt = compact ? 8 : 14

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 24,
      border: '1px solid rgba(210,190,165,0.14)',
      boxShadow: '0 8px 32px rgba(60,40,20,0.06)',
      padding: pad,
    }}>
      {/* Header label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: headerMb }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke={WF} strokeWidth="1.4"/>
          <circle cx="8" cy="8" r="2.5" fill={WF} fillOpacity="0.2" stroke={WF} strokeWidth="1.2"/>
          <line x1="8" y1="1.5" x2="8" y2="4" stroke={WF} strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="8" y1="12" x2="8" y2="14.5" stroke={WF} strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="1.5" y1="8" x2="4" y2="8" stroke={WF} strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="12" y1="8" x2="14.5" y2="8" stroke={WF} strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: WF, letterSpacing: '0.02em' }}>
          时鉴 Agent 工作流
        </span>
      </div>

      {/* Nodes row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
        {WF_NODES.map((node, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', flex: i === 0 || i === WF_NODES.length - 1 ? '0 0 auto' : 1, minWidth: 0 }}>
            {/* Node column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: i === 0 ? 110 : i === WF_NODES.length - 1 ? 120 : undefined, flex: i > 0 && i < WF_NODES.length - 1 ? 1 : undefined }}>
              {/* Circle icon */}
              <div style={{
                width: iconSz, height: iconSz, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(145deg, #FFF4EE 0%, #FDE8D8 100%)',
                border: '1.5px solid rgba(227,107,53,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <node.Icon />
              </div>

              {/* Step label */}
              <div style={{ marginTop: 8, textAlign: 'center' }}>
                <div style={{ fontFamily: F, fontSize: 10, color: WF, fontWeight: 600, marginBottom: 2 }}>
                  {node.num}
                </div>
                <div style={{
                  fontFamily: F, fontSize: 12.5,
                  fontWeight: node.bold ? 700 : 600,
                  color: '#2B211C', lineHeight: 1.3,
                  textAlign: 'center',
                }}>
                  {node.title}
                </div>
                {node.lines.map((l, li) => (
                  <div key={li} style={{ fontFamily: F, fontSize: compact ? 10 : 11, color: '#8A7668', lineHeight: 1.5, marginTop: li === 0 ? 4 : 0, textAlign: 'center' }}>
                    {l}
                  </div>
                ))}
                {/* Query bubbles — hidden in compact mode */}
                {!compact && node.extras && (
                  <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {node.extras.map((e, ei) => (
                      <div key={ei} style={{
                        fontFamily: F, fontSize: 10, color: WF,
                        background: '#FEF0E8', borderRadius: 6, padding: '3px 7px',
                        textAlign: 'left', lineHeight: 1.4,
                      }}>
                        {e}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Arrow between nodes */}
            {i < WF_NODES.length - 1 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                paddingTop: 26, width: 28, flexShrink: 0,
              }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <div style={{
                    borderTop: '1.5px dashed rgba(227,107,53,0.45)',
                    width: '100%',
                  }} />
                  <svg
                    style={{ position: 'absolute', right: -5, top: -4.5 }}
                    width="8" height="9" viewBox="0 0 8 9" fill="none"
                  >
                    <path d="M1 1 L7 4.5 L1 8" stroke="rgba(227,107,53,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback loop */}
      <div style={{ marginTop: feedMt, display: 'flex', alignItems: 'center', gap: 0 }}>
        {/* Left upward tick */}
        <div style={{ flexShrink: 0, marginLeft: 26 }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M5 14 L5 2 M2 5 L5 2 L8 5" stroke="rgba(227,107,53,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Line + center text */}
        <div style={{ flex: 1, position: 'relative', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: '50%',
            borderTop: '1.5px dashed rgba(227,107,53,0.35)',
          }} />
          <span style={{
            position: 'relative', background: '#FFFFFF',
            padding: '3px 16px', borderRadius: 10,
            fontFamily: F, fontSize: 11.5, fontWeight: 600, color: WF,
            border: '1px solid rgba(227,107,53,0.2)',
            whiteSpace: 'nowrap',
          }}>
            ♦ 持续反馈，形成学习闭环
          </span>
        </div>

        {/* Right upward tick */}
        <div style={{ flexShrink: 0, marginRight: 26 }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M5 14 L5 2 M2 5 L5 2 L8 5" stroke="rgba(227,107,53,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   HEADER
════════════════════════════════════════ */

type Tab = 'why' | 'how'

function ShijianHeader({ onBack, activeTab, onTabChange }: {
  onBack: () => void
  activeTab: Tab
  onTabChange: (t: Tab) => void
}) {
  const tabs: { key: Tab; label: string }[] = [
    { key: 'why', label: 'Why Choose It?' },
    { key: 'how', label: 'How It Works?' },
  ]

  return (
    <header style={{
      height: 64, flexShrink: 0,
      display: 'flex', alignItems: 'center',
      padding: '0 48px', boxSizing: 'border-box',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      background: 'rgba(250,248,243,0.92)',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Left: back + branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'var(--cursor-cute), pointer',
            color: '#9A8472', padding: '6px 0', lineHeight: 1,
            display: 'flex', alignItems: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#4A3020')}
          onMouseLeave={e => (e.currentTarget.style.color = '#9A8472')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ marginLeft: 4, fontFamily: F, fontSize: 13, fontWeight: 500, color: '#9A8472' }}>Back</span>
        <div style={{ display: 'none', width: 1, height: 16, background: '#DDD5C8' }} />
        <span style={{ display: 'none', fontFamily: F, fontSize: 13, fontWeight: 600, color: OR }}>02</span>
        <span style={{ display: 'none', fontFamily: F, fontSize: 13, color: '#C8BFB6' }}>|</span>
        <span style={{ display: 'none', fontFamily: FR, fontSize: 15, fontWeight: 600, color: '#2B211C', letterSpacing: '0.01em' }}>时鉴</span>
      </div>

      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', whiteSpace: 'nowrap', opacity: 0 }}>
        <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: '#2C2820', lineHeight: 1.1 }}>时鉴</div>
        <div style={{ fontFamily: F, fontSize: 10, color: '#C4A258', letterSpacing: '0.02em', fontWeight: 600, marginTop: 1 }}>AI History Learning System</div>
      </div>
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: '#2C2820', lineHeight: 1.1 }}>{'\u65f6\u9274'}</div>
        <div style={{ fontFamily: F, fontSize: 10, color: '#C4A258', letterSpacing: '0.02em', fontWeight: 600, marginTop: 1 }}>AI History Learning System</div>
      </div>
      <div style={{ flex: 1 }} />

      {/* Right: tabs only */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 24 }}>
        {tabs.map(({ key, label }) => {
          const active = activeTab === key
          return (
            <button key={key} onClick={() => onTabChange(key)} style={{
              fontFamily: F, fontSize: 13, background: 'none', border: 'none',
              cursor: 'var(--cursor-cute), pointer', padding: '4px 0',
              color: active ? '#2C2820' : '#C8C0B5',
              fontWeight: active ? 600 : 400,
              borderBottom: active ? '1.5px solid #2C2820' : '1.5px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
              whiteSpace: 'nowrap',
            }}>
              {label}
            </button>
          )
        })}
      </div>
    </header>
  )
}

/* ════════════════════════════════════════
   WHY SCREEN
════════════════════════════════════════ */

const VALUE_IMGS = [valueCard01, valueCard02, valueCard03]

const PAIN_CARDS = [
  {
    num: '01',
    title: '历史知识依赖记忆，缺少理解',
    desc: '历史学习通常依赖教材阅读和背诵，学生难理解事件背景、人物关系和历史影响。',
    bullets: ['内容以文字为主', '历史场景难想象', '因果关系难建立'],
    highlight: '知道历史事件，但不知道为什么发生。',
  },
  {
    num: '02',
    title: '历史知识碎片化，难形成体系',
    desc: '学生面对大量历史人物和事件，难建立时间线和发展逻辑。',
    bullets: ['事件关系不清晰', '历史脉络难串联', '知识容易遗忘'],
    highlight: '记住知识点，但缺少历史体系。',
  },
  {
    num: '03',
    title: '学习理解与考试训练脱节',
    desc: '学生完成知识学习后，仍需要额外整理考点和寻找练习。',
    bullets: ['不知道考试重点', '缺少针对练习', '错题无法有效复盘'],
    highlight: '理解历史，还需要转化为考试能力。',
  },
]

function PainCard({ card, hovered, aspectRatio, children }: { card: typeof PAIN_CARDS[0]; hovered: boolean; aspectRatio: number; children: ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 20, padding: 12,
        background: '#FFF8F2', border: '1px solid rgba(220,190,160,0.25)',
        boxShadow: hovered ? '0 14px 44px rgba(80,60,40,0.10)' : '0 10px 35px rgba(80,60,40,0.08)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'default', flexShrink: 0,
        aspectRatio: String(aspectRatio),
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: '#E86F24', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{card.num}</div>
        <div>
          <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: '#2B211B', lineHeight: 1.2 }}>{card.title}</div>
          <div style={{ fontFamily: F, fontSize: 13, color: '#8A7668', lineHeight: 1.35, marginTop: 3 }}>{card.desc}</div>
        </div>
      </div>

      {/* body */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'stretch', flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1.4, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
        <div style={{ width: 1, alignSelf: 'center', height: '62%', background: 'rgba(220,190,160,0.3)', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, paddingLeft: 22 }}>
          {card.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <span style={{ color: '#E86F24', fontSize: 11, lineHeight: '19px' }}>●</span>
              <span style={{ fontFamily: F, fontSize: 13.5, color: '#5E5046', lineHeight: 1.3 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div style={{ background: 'rgba(232,111,36,0.10)', borderRadius: 10, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 21, height: 21, borderRadius: 11, background: '#E86F24', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontSize: 14, fontWeight: 800 }}>!</div>
        <div style={{ fontFamily: F, fontSize: 13.5, fontWeight: 600, color: '#E86F24', lineHeight: 1.2 }}>{card.highlight}</div>
      </div>
    </div>
  )
}

function WhyScreen({ onSwitchToHow, onNavigatePrev }: { onSwitchToHow: () => void; onNavigatePrev?: () => void }) {
  const [hoverPain,  setHoverPain]  = useState<number | null>(null)
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const [cooldown, setCooldown] = useState(false)

  function handleWheel(e: WheelEvent) {
    if (cooldown) return
    if (e.deltaY > 0) {
      setCooldown(true)
      onSwitchToHow()
      setTimeout(() => setCooldown(false), 800)
    } else if (e.deltaY < 0 && onNavigatePrev) {
      setCooldown(true)
      onNavigatePrev()
    }
  }

  return (
    <div
      onWheel={handleWheel}
      style={{
        position: 'relative',
        flex: 1, minHeight: 0, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        padding: '36px 80px 28px', boxSizing: 'border-box',
        marginTop: -16,
      }}>
      <div style={{ marginBottom: 28, flexShrink: 0 }}>
        <h1 style={{ fontFamily: F, fontSize: 36, fontWeight: 700, letterSpacing: '0', color: '#292929', margin: '0 0 8px', lineHeight: 1.15 }}>
          Why choose 时鉴?
        </h1>
      </div>

      {/* Subtitle — absolute to page top, same as 群策 */}
      <p style={{ position: 'absolute', left: '50%', top: 36, transform: 'translateX(-50%)', width: 560, margin: 0, fontFamily: F, fontSize: 13, color: '#9C9489', lineHeight: 1.8, textAlign: 'center' }}>
        一个面向初高中学生的 AI History Learning Platform，通过 AI 知识模块拆解与联想记忆，<br />
        帮助学生理解历史知识、构建知识体系，更高效地应对中高考。
      </p>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', gap: 70, alignItems: 'flex-start' }}>
        {/* LEFT */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto', marginTop: -16 }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#E86F24', letterSpacing: '0.08em', marginBottom: 8 }}>USER PAIN POINTS</div>
            <div style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#2B211B', marginBottom: 12 }}>学生学习历史的三大痛点</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PAIN_CARDS.map((card, i) => (
              <PainCard
                key={i}
                card={card}
                hovered={hoverPain === i}
                aspectRatio={[1604 / 482, 1540 / 407, 1595 / 469][i]}
              >
                {i === 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', flexWrap: 'wrap' }}>
                    {['为什么发生?', '为什么重要?', '有什么影响?'].map((q, j) => (
                      <div key={j} style={{ padding: '8px 18px', borderRadius: 10, background: '#fff', border: '1px solid #E0D8CC', fontFamily: F, fontSize: 16, color: '#5E5046', whiteSpace: 'nowrap' }}>{q}</div>
                    ))}
                  </div>
                )}
                {i === 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
                    {['秦朝', '唐朝', '宋朝', '明朝'].map((d, j) => (
                      <Fragment key={j}>
                        <div style={{ padding: '7px 13px', borderRadius: 8, background: '#fff', border: '1px solid #E0D8CC', fontFamily: F, fontSize: 14, fontWeight: 600, color: '#5E5046' }}>{d}</div>
                        {j < 3 && <span style={{ color: '#E86F24', fontFamily: F, fontSize: 14 }}>✕</span>}
                      </Fragment>
                    ))}
                  </div>
                )}
                {i === 2 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {[{ icon: '📖', label: '知识学习' }, { icon: '📝', label: '考点提炼' }, { icon: '✏️', label: '练习反馈' }].map((item, j) => (
                      <Fragment key={j}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <div style={{ fontSize: 26 }}>{item.icon}</div>
                          <div style={{ fontFamily: F, fontSize: 12, color: '#5E5046', whiteSpace: 'nowrap' }}>{item.label}</div>
                        </div>
                        {j < 2 && <span style={{ color: '#E86F24', fontFamily: F, fontSize: 14 }}>✕</span>}
                      </Fragment>
                    ))}
                  </div>
                )}
              </PainCard>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto', marginTop: -16 }}>
          <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#4A9270', letterSpacing: '0.08em', marginBottom: 8 }}>CORE VALUE</div>
          <div style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: '#2B211B', marginBottom: 12 }}>时鉴如何解决这些问题</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {VALUE_IMGS.map((src, i) => (
              <div key={i}
                onMouseEnter={() => setHoverValue(i)} onMouseLeave={() => setHoverValue(null)}
                style={{
                  borderRadius: 20, overflow: 'hidden',
                  boxShadow: hoverValue === i ? '0 16px 50px rgba(80,60,40,0.10)' : '0 12px 40px rgba(80,60,40,0.08)',
                  transform: hoverValue === i ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'default', flexShrink: 0,
                }}>
                <img src={src} alt={`Value ${i + 1}`} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   HOW IT WORKS SCREEN
════════════════════════════════════════ */

const SCENES = [
  { key: 0, name: '专题研学', img: shotStudy,  desc: '把知识点拆成可对话的专题，AI 带你真正"读懂"历史' },
  { key: 1, name: '错题本',   img: shotWrong,  desc: '自动归因薄弱点，把错题变成针对性练习' },
  { key: 2, name: '复习卡片', img: shotReview, desc: '间隔重复 + 考点提炼，让记忆真正留住' },
]

function HowScreen({ onNavigateNext, onNavigatePrev }: { onNavigateNext?: () => void; onNavigatePrev?: () => void }) {
  const [hoveredShot, setHoveredShot] = useState<number | null>(null)
  const [cooldown, setCooldown] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  function handleWheel(e: WheelEvent) {
    if (cooldown) return
    if (e.deltaY > 0 && onNavigateNext) {
      setCooldown(true)
      onNavigateNext()
      setTimeout(() => setCooldown(false), 800)
    } else if (e.deltaY < 0 && onNavigatePrev) {
      setCooldown(true)
      onNavigatePrev()
      setTimeout(() => setCooldown(false), 800)
    }
  }

  return (
    <div
      onWheel={handleWheel}
      style={{
        flex: 1, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        padding: '36px 80px 26px', boxSizing: 'border-box',
      }}>

      {/* ══ ROW 1: Hero (25%) + Workflow (75%) ══ */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 28,
        flexShrink: 0, marginBottom: 14,
      }}>
        {/* Left hero — 25% */}
        <div style={{ width: '25%', flexShrink: 0, paddingTop: 2 }}>
          <h1 style={{
            fontFamily: F, fontSize: 36, fontWeight: 700,
            color: '#292929', margin: '0 0 8px', lineHeight: 1.15, letterSpacing: '0',
          }}>
            How It Works?
          </h1>
          <p style={{ fontFamily: F, fontSize: 20, color: '#8C8178', margin: '0 0 8px', lineHeight: 1.8 }}>
            时鉴 Agent 如何将历史知识转化为
            <br />
            <span style={{ color: OR, fontWeight: 600 }}>理解</span>
            {' · '}
            <span style={{ color: OR, fontWeight: 600 }}>学习</span>
            {' · '}
            <span style={{ color: OR, fontWeight: 600 }}>巩固</span>
            的闭环
          </p>
        </div>

        {/* Right workflow — 75% */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <WorkflowCard compact />
        </div>
      </div>

      {/* ══ Section label ══ */}
      <div style={{
        fontFamily: F, fontSize: 16, fontWeight: 600,
        color: '#D95F32', letterSpacing: '0.02em',
        flexShrink: 0, marginBottom: 12,
      }}>
        AI 驱动的核心学习场景
      </div>

      {/* ══ ROW 2: Three equal screenshots ══ */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', gap: 16,
        padding: '0 0',
      }}>
        {SCENES.map((s, i) => {
          const hovered = hoveredShot === i
          return (
            <div
              key={s.key}
              onMouseEnter={() => setHoveredShot(i)}
              onMouseLeave={() => setHoveredShot(null)}
              style={{
                flex: 1,
                display: 'flex', flexDirection: 'column', gap: 10,
                minWidth: 0,
              }}
            >
              {/* Scene label above screenshot */}
              <div style={{
                fontFamily: F, fontSize: 12.5, fontWeight: 600,
                color: hovered ? OR : '#B0A49A',
                textAlign: 'center', flexShrink: 0,
                transition: 'color 0.3s ease',
              }}>
                {s.name}
              </div>

              {/* Screenshot card */}
              <div
                onClick={() => setLightbox(i)}
                style={{
                  flex: 1, minHeight: 0,
                  borderRadius: 16, overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: hovered
                    ? '0 18px 48px rgba(50,30,20,0.18)'
                    : '0 6px 22px rgba(50,30,20,0.08)',
                  transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                  border: '1px solid rgba(210,195,175,0.18)',
                  background: '#EFEAE2',
                  cursor: 'zoom-in',
                }}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  style={{
                    width: '100%', flex: 1, minHeight: 0,
                    objectFit: 'contain', objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* 截图下方说明：填实 contain 留出的空白 */}
                <div style={{
                  flexShrink: 0, padding: '9px 12px',
                  fontFamily: F, fontSize: 12, lineHeight: 1.5,
                  color: '#8C8178', textAlign: 'center',
                  borderTop: '1px solid rgba(210,195,175,0.22)',
                  background: 'rgba(255,255,255,0.55)',
                }}>
                  {s.desc}
                </div>
              </div>
            </div>
          )
        })}

        {/* ══ Lightbox: click to view full-size screenshot ══ */}
        {lightbox !== null && (
          <div
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(28,22,18,0.82)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 40, boxSizing: 'border-box',
              cursor: 'zoom-out',
            }}
          >
            <img
              src={SCENES[lightbox].img}
              alt={SCENES[lightbox].name}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '92vw', maxHeight: '88vh',
                width: 'auto', height: 'auto',
                borderRadius: 14,
                boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
                objectFit: 'contain',
              }}
            />
            <div
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: 24, right: 28,
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)',
                color: '#fff', fontSize: 26, lineHeight: '44px',
                textAlign: 'center', cursor: 'pointer',
                userSelect: 'none', backdropFilter: 'blur(4px)',
              }}
            >
              ×
            </div>
            <div
              style={{
                position: 'absolute', bottom: 28, left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.04em',
              }}
            >
              {SCENES[lightbox].name}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   EXPORT
════════════════════════════════════════ */

export default function ShijianPage({ onBack, onNavigateNext, onNavigatePrev, initialTab = 'why' }: { onBack: () => void; onNavigateNext?: () => void; onNavigatePrev?: () => void; initialTab?: Tab }) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#FAF7F2',
      display: 'flex', flexDirection: 'column',
      fontFamily: F, overflow: 'hidden',
    }}>
      <ShijianHeader onBack={onBack} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'why'
        ? <WhyScreen onSwitchToHow={() => setActiveTab('how')} onNavigatePrev={onNavigatePrev} />
        : <HowScreen onNavigateNext={onNavigateNext} onNavigatePrev={() => setActiveTab('why')} />
      }
    </div>
  )
}
