// Shared "scroll down to next product" hint — placed at the exact bottom-center
// of the page on both Offer到 Screen 2 and 群策 Page 2 so they look identical.
const FO = "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif"

export default function NextProductHint(override: { style?: React.CSSProperties; variant?: 'faint' | 'strong'; text?: string } = {}) {
  const strong = override.variant === 'strong'
  const color = strong ? '#6B5E4E' : '#C6BDB0'   // 第四张灰棕加深，前几张极浅
  const opacity = strong ? 1 : 0.18              // 前几张极淡，几乎看不见
  const label = override.text ?? '下滑了解下一个产品'
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      bottom: 18,
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      animation: 'nextProductFloat 2.2s ease-in-out infinite',
      pointerEvents: 'none',
      zIndex: 40,
      opacity,
      transition: 'opacity 0.4s ease, color 0.4s ease',
      ...override.style,
    }}>
      <span style={{ fontFamily: FO, fontSize: 15, fontWeight: 700, color, letterSpacing: '0.04em' }}>
        {label}
      </span>
      <svg width="20" height="12" viewBox="0 0 16 10" fill="none">
        <path d="M2 2 L8 8 L14 2" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
