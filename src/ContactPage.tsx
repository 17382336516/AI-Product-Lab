import { useState, useEffect, useRef } from 'react'
import dogContact from '@/imports/__2-1.png'
import logoImg from '@/imports/1a649729676d49b38321ae06f8ab5352.png'
import { useViewport } from './useViewport'
import emailjs from '@emailjs/browser'
import { emailConfig } from './config/email'

const F  = "'Inter', 'DM Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif"
const FR = "'Fredoka', 'Nunito', 'PingFang SC', sans-serif"
const KA = "'Kalam', cursive"

/* ════════════════════════════════════════
   STAR-CURTAIN SVGs  (same as homepage)
════════════════════════════════════════ */

function StarSVG({ size = 16, opacity = 1 }: { size?: number; opacity?: number }) {
  /* Legacy misplaced handler kept inert. */
  /*
  async function submitFeedback() {
    const unusedMessage = feedback.trim()
    if (!unusedMessage || feedbackState === 'sending') return
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setFeedbackState('error')
      showToast('发送失败，请稍后重试。')
      return
    }
    setFeedbackState('sending')
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
        message,
        timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
        source: 'Portfolio Connect Page',
        title: '作品集收到新的用户反馈',
      }, { publicKey: emailConfig.publicKey })
      setFeedback('')
      setFeedbackState('success')
      showToast('谢谢你的反馈！每一次交流，都是产品成长的机会 🌱')
    } catch {
      setFeedbackState('error')
      showToast('发送失败，请稍后重试。')
    }
  }

  */
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ opacity, display: 'block' }}>
      <path d="M10 1.5 L11.5 7.8 L17.8 9.2 L11.5 10.6 L10 16.8 L8.5 10.6 L2.2 9.2 L8.5 7.8 Z"
        stroke="#C8A640" strokeWidth="1.1" strokeLinejoin="round" fill="#EFDB78" fillOpacity="0.52" />
    </svg>
  )
}

function CloudSVG({ width = 52 }: { width?: number }) {
  return (
    <svg width={width} height={Math.round(width * 0.6)} viewBox="0 0 52 31" fill="none" style={{ display: 'block' }}>
      <path d="M6 27 Q0.5 27 0.5 21.5 Q0.5 17 6 16.5 Q6 9.5 13 8.5 Q17 3 25 4.5 Q31 2 36 8 Q43.5 7.5 47 13.5 Q52.5 14 52.5 20.5 Q52.5 27 46 27 Z"
        stroke="#C0B9B1" strokeWidth="1.1" fill="white" fillOpacity="0.62" />
    </svg>
  )
}

function MoonSVG({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" style={{ display: 'block' }}>
      <path d="M18 13.5 Q18 21 12 24 Q5 24 3 16.5 Q1 9 8 5.5 Q12 3.5 14.5 6 Q9 9 9 13.5 Q9 20 15.5 21 Q18 19 18 13.5Z"
        stroke="#C4A870" strokeWidth="1.1" fill="#F5E8B4" fillOpacity="0.55" />
    </svg>
  )
}

type HangItem = { pct: number; topPx: number; stringH: number; animDur: number; animDelay: number; type: 'star' | 'moon' | 'cloud' | 'tag' | 'paper'; size?: number }

const HANG_ITEMS: HangItem[] = [
  { pct: 8,    topPx: 20, stringH: 15, animDur: 3.8, animDelay: 0,   type: 'star',  size: 15 },
  { pct: 20,   topPx: 23, stringH: 17, animDur: 5.2, animDelay: 0.6, type: 'moon',  size: 22 },
  { pct: 34,   topPx: 25, stringH: 14, animDur: 6.5, animDelay: 1.4, type: 'cloud', size: 44 },
  { pct: 50,   topPx: 23, stringH: 16, animDur: 4.4, animDelay: 0.2, type: 'tag'               },
  { pct: 64,   topPx: 20, stringH: 15, animDur: 3.5, animDelay: 1.8, type: 'star',  size: 13 },
  { pct: 78,   topPx: 19, stringH: 18, animDur: 4.8, animDelay: 0.9, type: 'paper'             },
  { pct: 90.5, topPx: 22, stringH: 14, animDur: 3.2, animDelay: 2.2, type: 'star',  size: 10 },
]

function HangingItem({ item }: { item: HangItem }) {
  const isCloud = item.type === 'cloud'
  return (
    <div style={{ position: 'absolute', left: `${item.pct}%`, top: item.topPx, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 1, height: item.stringH, background: '#C8C0B8', flexShrink: 0 }} />
      <div style={{ transformOrigin: 'top center', animation: isCloud ? `lineCloudFloat ${item.animDur}s ease-in-out infinite ${item.animDelay}s` : `swingItem ${item.animDur}s ease-in-out infinite ${item.animDelay}s` }}>
        {item.type === 'star'  && <StarSVG size={item.size ?? 15} opacity={0.75} />}
        {item.type === 'moon'  && <MoonSVG size={item.size ?? 22} />}
        {item.type === 'cloud' && <CloudSVG width={item.size ?? 44} />}
        {item.type === 'tag'   && (
          <div style={{ width: 22, height: 16, background: '#EDE5D5', border: '0.8px solid #C8C0B8', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#C0B8B0' }} />
          </div>
        )}
        {item.type === 'paper' && (
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ display: 'block' }}>
            <path d="M1 1 L15 1 L15 18 Q11 17 8 19 Q5 20 1 18 Z" fill="#EDE5D5" stroke="#C8C0B8" strokeWidth="0.8" />
            <line x1="3.5" y1="6"  x2="12" y2="6"  stroke="#D0C8BC" strokeWidth="0.6" />
            <line x1="3.5" y1="9"  x2="11" y2="9"  stroke="#D0C8BC" strokeWidth="0.6" />
            <line x1="3.5" y1="12" x2="9"  y2="12" stroke="#D0C8BC" strokeWidth="0.6" />
          </svg>
        )}
      </div>
    </div>
  )
}

function StarCurtain() {
  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: 82, zIndex: 10, animation: 'clotheslineDrift 9s ease-in-out infinite' }}>
      <svg width="100%" height="36" style={{ position: 'absolute', top: 0 }} fill="none" preserveAspectRatio="none" viewBox="0 0 1440 36">
        <path d="M -10 20 Q 360 31 720 24 Q 1080 17 1450 27" stroke="#C8C0B8" strokeWidth="0.9" />
      </svg>
      {HANG_ITEMS.map((item, i) => <HangingItem key={i} item={item} />)}
    </div>
  )
}

/* ════════════════════════════════════════
   WAVY UNDERLINE
════════════════════════════════════════ */

function WavyUnderline() {
  return (
    <svg width="320" height="14" viewBox="0 0 320 14" fill="none" style={{ display: 'block', marginTop: 4 }}>
      <path d="M4 8 Q20 2 36 8 Q52 14 68 8 Q84 2 100 8 Q116 14 132 8 Q148 2 164 8 Q180 14 196 8 Q212 2 228 8 Q244 14 260 8 Q276 2 292 8 Q308 14 316 8"
        stroke="#E87B4A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.65" />
    </svg>
  )
}

/* ════════════════════════════════════════
   ICONS
════════════════════════════════════════ */

function WeChatIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M13 7C8.03 7 4 10.58 4 15c0 2.3 1.1 4.36 2.87 5.84L6 24l3.5-1.75C10.6 22.7 11.78 23 13 23c4.97 0 9-3.58 9-8S17.97 7 13 7Z" fill="white" fillOpacity="0.9"/>
      <path d="M22 14c3.87 0 7 2.69 7 6 0 1.72-.82 3.26-2.14 4.36L27.5 27l-2.62-1.31A7.4 7.4 0 0 1 22 26c-3.87 0-7-2.69-7-6s3.13-6 7-6Z" fill="white" fillOpacity="0.7"/>
      <circle cx="10.5" cy="15" r="1.5" fill="#5AB55E"/>
      <circle cx="15.5" cy="15" r="1.5" fill="#5AB55E"/>
      <circle cx="19.5" cy="20" r="1.2" fill="#5AB55E" fillOpacity="0.8"/>
      <circle cx="24" cy="20" r="1.2" fill="#5AB55E" fillOpacity="0.8"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect x="5" y="9" width="24" height="17" rx="3" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M5 12 L17 19 L29 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M9 5H14L16.5 11.5L13.5 13.5C14.8 16.3 17.7 19.2 20.5 20.5L22.5 17.5L29 20V25C29 27.2 27.2 29 25 29C13.95 29 3 18.05 3 7C3 4.8 4.8 3 7 3L9 5Z"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 9.5 L11 3 L19 9.5 V19 H14 V14 H8 V19 H3 Z" stroke="#9A8878" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="#9A8878" strokeWidth="1.5" fill="none"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="#9A8878" strokeWidth="1.5" fill="none"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="#9A8878" strokeWidth="1.5" fill="none"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="#9A8878" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

function AvatarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#C8BEB4" strokeWidth="1.3" fill="none"/>
      <circle cx="14" cy="11" r="4" stroke="#9A8878" strokeWidth="1.3" fill="none"/>
      <path d="M5 24C5 19.58 9.03 16 14 16S23 19.58 23 24" stroke="#9A8878" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function PaperPlane() {
  return (
    <svg width="52" height="40" viewBox="0 0 52 40" fill="none" style={{ animation: 'float 4s ease-in-out infinite 0.5s' }}>
      <path d="M2 18 L50 6 L34 36 L22 24 Z" stroke="#D4B896" strokeWidth="1.4" fill="#FBF0E4" strokeLinejoin="round"/>
      <path d="M22 24 L28 30" stroke="#D4B896" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M22 24 L50 6" stroke="#D4B896" strokeWidth="1" strokeDasharray="0"/>
      {/* Dashed trail */}
      <path d="M2 18 Q-6 30 4 36 Q12 42 20 38" stroke="#D4C0A8" strokeWidth="1.2" strokeDasharray="3 4" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

/* ════════════════════════════════════════
   TOAST
════════════════════════════════════════ */

function Toast({ message, visible }: { message: string; visible: boolean }) {
  /*
  async function submitFeedback() {
    const duplicateMessage = feedback.trim()
    if (!duplicateMessage || feedbackState === 'sending') return
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setFeedbackState('error')
      showToast('发送失败，请稍后重试。')
      return
    }
    setFeedbackState('sending')
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
        message,
        timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
        source: 'Portfolio Connect Page',
        title: '作品集收到新的用户反馈',
      }, { publicKey: emailConfig.publicKey })
      setFeedback('')
      setFeedbackState('success')
      showToast('谢谢你的反馈！每一次交流，都是产品成长的机会 🌱')
    } catch {
      setFeedbackState('error')
      showToast('发送失败，请稍后重试。')
    }
  }

  */
  return (
    <div style={{
      position: 'fixed', bottom: 36, left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 12}px)`,
      opacity: visible ? 1 : 0,
      background: '#2C2820', color: '#FBF8F3',
      borderRadius: 28, padding: '10px 22px',
      fontFamily: F, fontSize: 13.5, fontWeight: 500,
      boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      zIndex: 9999, pointerEvents: 'none',
      display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7 L5.5 10.5 L12 3.5" stroke="#7ED88C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {message}
    </div>
  )
}

/* ════════════════════════════════════════
   CONTACT CARD
════════════════════════════════════════ */

function ContactCard({
  iconBg, icon, title, value, subtitle, onClick,
}: {
  iconBg: string; icon: React.ReactNode; title: string
  value: string; subtitle: string; onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 190,
        flex: '0 0 190px',
        background: '#FFFFFF',
        borderRadius: 24,
        border: '1px solid rgba(230,218,205,0.6)',
        boxShadow: hovered
          ? '0 18px 44px rgba(80,60,40,0.14)'
          : '0 8px 28px rgba(80,60,40,0.07)',
        transform: hovered ? 'translateY(-7px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        padding: '18px 14px 16px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 0, userSelect: 'none',
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
        boxShadow: `0 6px 18px ${iconBg}55`,
      }}>
        {icon}
      </div>
      <div style={{ fontFamily: FR, fontSize: 18, fontWeight: 600, color: '#2B211B', marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: F, fontSize: 12, color: '#7A6858', textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.5, marginBottom: 12 }}>{value}</div>
      <div style={{ fontFamily: F, fontSize: 11.5, color: '#B5ADA2', textAlign: 'center', marginTop: 'auto' }}>{subtitle}</div>
    </div>
  )
}

/* ════════════════════════════════════════
   MAIN CONTACT PAGE
════════════════════════════════════════ */

export default function ContactPage({ onBack, onScrollPrev }: { onBack: () => void; onScrollPrev?: () => void }) {
  const vp = useViewport()
  const [toastMsg, setToastMsg]         = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [feedback, setFeedback]         = useState('')
  const [mounted, setMounted]           = useState(false)
  const [btnHovered, setBtnHovered]     = useState(false)
  const [feedbackState, setFeedbackState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const scrollLock = useRef(false)

  useEffect(() => { requestAnimationFrame(() => setMounted(true)) }, [])

  useEffect(() => {
    if (!onScrollPrev) return
    function handleWheel(e: WheelEvent) {
      if (scrollLock.current) return
      if (e.deltaY < 0) {
        scrollLock.current = true
        onScrollPrev()
        setTimeout(() => { scrollLock.current = false }, 800)
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [onScrollPrev])

  function showToast(msg: string) {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2400)
  }

  function copy(text: string, label: string) {
    const done = () => showToast(label)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done))
    } else {
      fallbackCopy(text, done)
    }
  }

  function fallbackCopy(text: string, done: () => void) {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.top = '-9999px'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      if (ok) done()
    } catch {
      /* ignore */
    }
  }

  function sendFeedback() {
    const message = feedback.trim()
    if (!message) {
      showToast('请先填写你的建议 🌱')
      return
    }
    if (feedbackState === 'sending') return
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      // EmailJS 未配置：降级为邮件发送，保证建议可送达
      const mailto = `mailto:2276508984@qq.com?subject=${encodeURIComponent('作品集反馈建议')}&body=${encodeURIComponent(message)}`
      window.open(mailto, '_blank')
      setFeedback('')
      setFeedbackState('success')
      showToast('已为你打开邮件，发送即可收到建议 🌱')
      return
    }
    setFeedbackState('sending')
    emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
      message,
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      source: 'Portfolio Connect Page',
      title: '作品集收到新的用户反馈',
    }, { publicKey: emailConfig.publicKey }).then(() => {
      setFeedback('')
      setFeedbackState('success')
      showToast('谢谢你的反馈！')
    }).catch(() => {
      setFeedbackState('error')
      showToast('发送失败，请稍后重试。')
    })
    return
    /* duplicate legacy path disabled */
    const message2 = feedback.trim()
    if (!message2 || feedbackState === 'sending') return
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setFeedbackState('error')
      showToast('发送失败，请稍后重试。')
      return
    }
    setFeedbackState('sending')
    emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
      message,
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      source: 'Portfolio Connect Page',
      title: 'Portfolio feedback',
    }, { publicKey: emailConfig.publicKey }).then(() => {
      setFeedback('')
      setFeedbackState('success')
      showToast('谢谢你的反馈！')
    }).catch(() => {
      setFeedbackState('error')
      showToast('发送失败，请稍后重试。')
    })
    return
    showToast('建议已发送，谢谢你 🌱')
    setFeedback('')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#FBF8F3', overflow: 'hidden',
      opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease',
    }}>
      {/* Star curtain — same as homepage */}
      <StarCurtain />

      {/* ── HEADER ── */}
      <header style={{
        position: 'relative', zIndex: 20, height: 62,
        display: 'flex', alignItems: 'center', padding: `0 ${vp.sidePad}`,
        background: 'rgba(251,248,243,0.92)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(200,185,165,0.1)',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: F, fontSize: 14, fontWeight: 500, color: '#9A8878',
            padding: '4px 0', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#3D2B1F'}
          onMouseLeave={e => e.currentTarget.style.color = '#9A8878'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div style={{ flex: 1 }} />
      </header>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        height: 'calc(100% - 62px)',
        padding: `20px ${vp.sidePad} 20px`,
        display: 'flex', flexDirection: 'column',
        boxSizing: 'border-box', gap: 12,
        maxWidth: '1600px', margin: '0 auto', width: '100%',
      }}>

        {/* ══ HERO SECTION ══ */}
        <div style={{
          display: 'flex', alignItems: 'center', flex: '0 0 360px', minHeight: 0, gap: 0,
          flexDirection: vp.isNarrow ? 'column' : 'row',
        }}>

          {/* Left: title + text */}
          <div style={{ flex: vp.isNarrow ? '0 0 auto' : '0 0 46%', width: '100%', paddingTop: 52, paddingLeft: 28 }}>
            {/* Title */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h1 style={{
                fontFamily: FR, fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 700,
                color: '#2B211B', margin: 0, lineHeight: 1.12,
                letterSpacing: '-0.02em',
              }}>
                Thank you<br />for exploring!
              </h1>
              {/* Heart decoration */}
              <div style={{
                position: 'absolute', top: -2, right: -36,
                fontSize: 22, animation: 'float 3.5s ease-in-out infinite',
              }}>🩷</div>
            </div>

            {/* Wavy underline */}
            <WavyUnderline />

            {/* Body text */}
            <div style={{ marginTop: 22, fontFamily: F, fontSize: 16, color: '#40352D', lineHeight: 1.85 }}>
              <p style={{ margin: '0 0 20px' }}>
                我相信 AI 的价值，<br />
                不仅在于技术突破，<br />
                更在于创造<span style={{ color: '#E87B4A', fontWeight: 600 }}>真实、有温度</span>的用户体验。
              </p>
              <p style={{ margin: 0 }}>
                如果你对我的项目有任何想法，<br />
                欢迎<span style={{ color: '#E87B4A', fontWeight: 600 }}>交流</span>，或者留下你的<span style={{ color: '#E87B4A', fontWeight: 600 }}>建议</span>。
              </p>
            </div>
          </div>

          {/* Right: dog illustration with decorations */}
          <div style={{ flex: vp.isNarrow ? '0 0 auto' : '0 0 54%', width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>

            {/* Sparkle cross */}
            <div style={{
              position: 'absolute', left: 30, top: '35%', zIndex: 10,
              animation: 'twinkle 3s ease-in-out infinite',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2 L9 16 M2 9 L16 9 M4 4 L14 14 M14 4 L4 14" stroke="#E8A878" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"/>
              </svg>
            </div>

            {/* Dog illustration */}
            <img
              src={dogContact}
              alt="AI Product Manager dog at work"
              loading="lazy"
              style={{
                width: '100%', maxWidth: 880, maxHeight: '100%',
                objectFit: 'contain',
                display: 'block',
                animation: 'float 4s ease-in-out infinite 0.3s',
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 8px 24px rgba(180,140,80,0.08))',
              }}
            />
          </div>
        </div>

        {/* ══ CONNECT SECTION ══ */}
        <div style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', gap: 24, alignItems: 'stretch', flexDirection: vp.isNarrow ? 'column' : 'row' }}>

          {/* Left: Let's Connect + 3 cards */}
          <div style={{ flex: vp.isNarrow ? '0 0 auto' : '0 0 700px', width: '100%', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 52 }}>

            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: FR, fontSize: 20, fontWeight: 700, color: '#2B211B' }}>✨ Let's Connect</span>
              <div style={{
                background: '#FEE8D8', borderRadius: 20,
                padding: '5px 14px',
                fontFamily: F, fontSize: 12.5, color: '#B56030',
                border: '1px solid rgba(230,180,140,0.4)',
              }}>
                欢迎你的联系~
              </div>
            </div>

            {/* 3 contact cards */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'nowrap' }}>
              <ContactCard
                iconBg="#5AB55E"
                icon={<WeChatIcon />}
                title="微信"
                value="Cecelia_ya"
                subtitle="期待与你交流想法 🌱"
                onClick={() => copy('Cecelia_ya', '微信号已复制')}
              />
              <ContactCard
                iconBg="#E07060"
                icon={<EmailIcon />}
                title="邮箱"
                value="2276508984@qq.com"
                subtitle="欢迎邮件联系 ✉️"
                onClick={() => copy('2276508984@qq.com', '邮箱已复制')}
              />
              <ContactCard
                iconBg="#E8A845"
                icon={<PhoneIcon />}
                title="电话"
                value="13005197165"
                subtitle="期待与你沟通更多可能 ✨"
                onClick={() => copy('13005197165', '电话号码已复制')}
              />
            </div>
          </div>

          {/* Right: Feedback card */}
          <div style={{
            flex: vp.isNarrow ? '0 0 auto' : 1,
            width: '100%',
            background: 'linear-gradient(145deg, #FFF8F1 0%, #FEF2E6 100%)',
            borderRadius: 28,
            border: '1px solid #F0D4B8',
            padding: '26px 30px 24px',
            boxShadow: '0 8px 32px rgba(180,120,60,0.08)',
            display: 'flex', flexDirection: 'column', gap: 10,
            alignSelf: 'stretch',
          }}>
            <div style={{ fontFamily: FR, fontSize: 22, fontWeight: 700, color: '#2B211B' }}>❤️ Leave Feedback</div>
            <div style={{ fontFamily: F, fontSize: 16, color: '#9A7860', lineHeight: 1.6 }}>
              你的建议是我前进的动力 🌱
            </div>
            <div style={{ position: 'relative', flex: 1 }}>
              <textarea
                value={feedback}
                onChange={e => { setFeedback(e.target.value); setFeedbackState('idle') }}
                placeholder="有什么想告诉我的？通过 EmailJS 匿名发送哦~"
                style={{
                  width: '100%', height: '100%', minHeight: 90,
                  background: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(220,190,155,0.45)',
                  borderRadius: 16, padding: '12px 40px 12px 14px',
                  fontFamily: F, fontSize: 13.5, color: '#4A3828',
                  lineHeight: 1.65, resize: 'none', outline: 'none',
                  boxSizing: 'border-box',
                  boxShadow: 'inset 0 2px 6px rgba(180,140,80,0.06)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(220,140,80,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(220,190,155,0.45)'}
              />
              {/* Pencil icon */}
              <div style={{ position: 'absolute', bottom: 12, right: 12, opacity: 0.4, pointerEvents: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.5 2.5 L13.5 4.5 L5 13 L2.5 13.5 L3 11 Z" stroke="#8B6840" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div style={{ fontFamily: F, fontSize: 12, color: '#B59A82', marginTop: 8, paddingLeft: 2 }}>
                通过 EmailJS 匿名发送哦 ~ 🌱
              </div>
            </div>
            <button
              onClick={sendFeedback}
              disabled={feedbackState === 'sending'}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                width: '100%', height: 44, borderRadius: 22,
                background: btnHovered
                  ? 'linear-gradient(135deg, #D06030 0%, #C05028 100%)'
                  : 'linear-gradient(135deg, #C85A30 0%, #B84820 100%)',
                border: 'none', cursor: feedbackState === 'sending' ? 'not-allowed' : 'pointer',
                opacity: feedbackState === 'sending' ? 0.6 : 1,
                fontFamily: FR, fontSize: 15, fontWeight: 600, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: btnHovered
                  ? '0 10px 28px rgba(180,70,30,0.32)'
                  : '0 6px 18px rgba(180,70,30,0.22)',
                transform: btnHovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: '0.25s ease',
              }}
            >
              发送建议
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 7.5 L13 7.5 M9 3.5 L13 7.5 L9 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <div style={{
          flexShrink: 0, height: 58,
          display: 'flex', alignItems: 'center', gap: 16,
          borderTop: '1px solid rgba(200,185,165,0.18)',
          paddingTop: 10,
        }}>
          {/* Small dog avatar */}
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: '#F2E8D8', border: '2px solid #E8D8C0',
            overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(180,140,80,0.12)',
          }}>
            <img src={logoImg} alt="" loading="lazy" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          </div>

          {/* Speech bubble */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%) rotate(45deg)', width: 10, height: 10, background: '#FFF4E8', borderLeft: '1px solid rgba(220,190,150,0.4)', borderBottom: '1px solid rgba(220,190,150,0.4)' }} />
            <div style={{
              background: '#FFF4E8', borderRadius: 16,
              border: '1px solid rgba(220,190,150,0.4)',
              padding: '8px 16px',
              fontFamily: F, fontSize: 12.5, color: '#6B5040', lineHeight: 1.6,
            }}>
              每一次交流，都是产品成长的机会。<br />
              期待未来可以一起创造更好的 AI 产品体验！
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Sparkle */}
          <span style={{ fontSize: 18, animation: 'twinkle 3.2s ease-in-out infinite', opacity: 0.7 }}>✦</span>

          {/* Paper plane */}
          <PaperPlane />
        </div>

      </div>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  )
}
