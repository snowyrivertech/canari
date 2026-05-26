// listener-shared.jsx — shared bits + the Canari iOS chrome

const C = {
  gold: '#F5A623',
  goldLight: '#FAC75A',
  goldDim: 'rgba(245,166,35,0.12)',
  goldBorder: 'rgba(245,166,35,0.35)',
  bg: '#0D0D0B',
  bg2: '#161613',
  bg3: '#1E1E1B',
  bg4: '#262624',
  border: 'rgba(255,255,255,0.06)',
  border2: 'rgba(255,255,255,0.1)',
  text: '#F0EDE4',
  textMid: '#A8A89E',
  muted: '#6B6B62',
  dim: '#3A3A36',
  white: '#FAFAF7',
  // context palettes
  rainy: { hi: '#7B9FD4', mid: '#3a5a8a', bg: 'linear-gradient(160deg, #0d1a2e 0%, #111820 100%)', deep: '#0a1422', glow: 'rgba(80,120,200,0.22)', name: 'Rainy evening', short: 'Rainy', emoji: '🌧', stems: { Strings: 92, Piano: 70, Drums: 18, Bass: 38, Vocals: 88, Reverb: 82, Synth: 60 }, weatherLine: 'Light rain · 54°F', timeLine: '9:24pm · Tuesday' },
  morning: { hi: '#F5A623', mid: '#b8801a', bg: 'linear-gradient(160deg, #1e1608 0%, #1a150a 100%)', deep: '#1a1006', glow: 'rgba(245,166,35,0.20)', name: 'Sunday morning', short: 'Morning', emoji: '☀️', stems: { Strings: 38, Piano: 55, Drums: 78, Bass: 70, Vocals: 84, Reverb: 28, Synth: 45 }, weatherLine: 'Clear · 68°F', timeLine: '8:12am · Sunday' },
  night: { hi: '#9D7BD4', mid: '#5a3a8a', bg: 'linear-gradient(160deg, #150a25 0%, #0e0818 100%)', deep: '#0a0618', glow: 'rgba(120,90,200,0.20)', name: 'Late night', short: 'Late', emoji: '🌙', stems: { Strings: 62, Piano: 82, Drums: 12, Bass: 28, Vocals: 95, Reverb: 92, Synth: 70 }, weatherLine: 'Clear · 48°F', timeLine: '1:14am · Wednesday' },
  golden: { hi: '#D88060', mid: '#a05030', bg: 'linear-gradient(160deg, #2a1208 0%, #1c0e08 100%)', deep: '#1f0e06', glow: 'rgba(216,128,96,0.20)', name: 'Golden hour', short: 'Golden', emoji: '🌅', stems: { Strings: 68, Piano: 60, Drums: 52, Bass: 60, Vocals: 90, Reverb: 55, Synth: 50 }, weatherLine: 'Clear · 76°F', timeLine: '7:48pm · Friday' },
};

// Canari status bar (white glyphs over dark gold) — replaces the default iOS bar
function CanariStatusBar({ time = '9:24', ctx }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'20px 30px 0', position:'relative', zIndex:20,
      fontFamily:'-apple-system,"SF Pro",system-ui', color:'#fff',
    }}>
      <span style={{ fontSize:17, fontWeight:600, letterSpacing:'-0.02em' }}>{time}</span>
      <div style={{ width:120 }} />
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="6.5" width="3" height="4.5" rx="0.7" fill="#fff"/><rect x="4.5" y="4" width="3" height="7" rx="0.7" fill="#fff"/><rect x="9" y="1.5" width="3" height="9.5" rx="0.7" fill="#fff"/><rect x="13.5" y="0" width="3" height="11" rx="0.7" fill="#fff"/></svg>
        <svg width="16" height="11" viewBox="0 0 17 12"><path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="#fff"/><path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill="#fff"/><circle cx="8.5" cy="10.5" r="1.5" fill="#fff"/></svg>
        <svg width="25" height="12" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="rgba(255,255,255,0.5)" fill="none"/><rect x="2" y="2" width="20" height="9" rx="2" fill="#fff"/><path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill="rgba(255,255,255,0.5)"/></svg>
      </div>
    </div>
  );
}

// Dynamic island
function DynamicIsland() {
  return <div style={{
    position:'absolute', top:11, left:'50%', transform:'translateX(-50%)',
    width:126, height:37, borderRadius:24, background:'#000', zIndex:50,
  }} />;
}

// iPhone shell wrapper — Canari styled
function Phone({ children, label, ctx, sublabel, focal=false }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:18 }}>
      <div style={{
        width:402, height:872, borderRadius:54, overflow:'hidden',
        position:'relative', background: ctx ? C[ctx].bg : C.bg,
        boxShadow: focal
          ? `0 60px 120px rgba(0,0,0,0.55), 0 0 0 1px ${C.goldBorder}, 0 0 60px ${ctx ? C[ctx].glow : 'rgba(245,166,35,0.18)'}`
          : '0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
        fontFamily:'-apple-system,"SF Pro",system-ui',
        WebkitFontSmoothing:'antialiased',
        color: C.text,
      }}>
        <DynamicIsland/>
        {children}
        {/* home indicator */}
        <div style={{ position:'absolute', bottom:8, left:0, right:0, zIndex:60, display:'flex', justifyContent:'center' }}>
          <div style={{ width:139, height:5, borderRadius:100, background:'rgba(255,255,255,0.55)' }}/>
        </div>
      </div>
      {label && (
        <div style={{ textAlign:'center', fontFamily:'Poppins,sans-serif', maxWidth:360 }}>
          <div style={{ fontSize:13, fontWeight:600, color:C.text, letterSpacing:'-.01em', marginBottom:4 }}>{label}</div>
          {sublabel && <div style={{ fontSize:11.5, color:C.muted, fontWeight:300, lineHeight:1.55 }}>{sublabel}</div>}
        </div>
      )}
    </div>
  );
}

// Bottom tab bar (5 tabs: For You, Search, Library, Versions, Profile)
function TabBar({ active='now' }) {
  const tabs = [
    { id:'feed', label:'For You', svg:<path d="M3 10L12 3l9 7v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V10z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/> },
    { id:'search', label:'Search', svg:<><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></> },
    { id:'now', label:'Now Playing', svg:<><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none"/><circle cx="12" cy="12" r="2" fill="currentColor"/></> },
    { id:'library', label:'Library', svg:<><path d="M5 4h14v16H5z" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M9 4v16M13 4v16" stroke="currentColor" strokeWidth="1.6"/></> },
    { id:'profile', label:'Profile', svg:<><circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></> },
  ];
  return (
    <div style={{
      position:'absolute', bottom:0, left:0, right:0, zIndex:55,
      paddingBottom:30, paddingTop:10,
      background:'linear-gradient(to top, rgba(0,0,0,0.85) 30%, transparent 100%)',
      backdropFilter:'blur(20px)',
    }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-around', padding:'0 14px' }}>
        {tabs.map(t => {
          const on = t.id === active;
          return (
            <div key={t.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, color: on ? C.gold : 'rgba(255,255,255,0.45)', flex:1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{t.svg}</svg>
              <span style={{ fontSize:10, fontWeight:600, letterSpacing:'.01em' }}>{t.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Context pill — small, ambient
function ContextPill({ ctx, glow=true }) {
  const c = C[ctx];
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8,
      padding:'7px 14px', borderRadius:100,
      background:'rgba(255,255,255,0.06)',
      border:'1px solid rgba(255,255,255,0.1)',
      backdropFilter:'blur(12px)',
      fontSize:11, fontWeight:500, color:'rgba(255,255,255,0.85)',
      letterSpacing:'.02em',
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:c.hi, boxShadow: glow ? `0 0 8px ${c.hi}` : 'none' }}/>
      <span>{c.weatherLine} · {c.timeLine.split(' · ')[0]}</span>
    </div>
  );
}

// Waveform — animated bars
function Waveform({ ctx, played=0.38, height=44, count=58 }) {
  const c = C[ctx];
  const heights = React.useMemo(() => {
    const seeded = ctx.charCodeAt(0);
    return Array.from({length:count}, (_,i) => {
      const v = Math.sin(i*0.4 + seeded) * 0.5 + Math.sin(i*0.13 + seeded*2) * 0.3 + 0.6;
      return Math.max(0.18, Math.min(1, v));
    });
  }, [ctx, count]);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:2.5, height, width:'100%' }}>
      {heights.map((h,i) => {
        const isPlayed = i/count < played;
        const isPlaying = i/count >= played && i/count < played+0.04;
        return (
          <div key={i} style={{
            flex:1, height: `${h*100}%`, minHeight:3,
            borderRadius:1.5,
            background: isPlayed ? c.hi : isPlaying ? c.hi : 'rgba(255,255,255,0.18)',
            opacity: isPlaying ? 1 : isPlayed ? 1 : 0.5,
            transition:'all .3s',
          }}/>
        );
      })}
    </div>
  );
}

// Big song title using DM Serif Display
function CanariSerif({ children, size=28, italic=false, style={} }) {
  return <span style={{
    fontFamily:'"DM Serif Display",serif', fontWeight:400,
    fontSize:size, fontStyle: italic ? 'italic' : 'normal',
    letterSpacing:'-0.01em', lineHeight:1.08,
    ...style,
  }}>{children}</span>;
}

// Cover artwork placeholder — abstract gradient that reads as the context
function CoverArt({ ctx, size=300, radius=18, song='Silver Lining' }) {
  const c = C[ctx];
  const id = `cov-${ctx}-${size}-${song.length}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ borderRadius:radius, display:'block', boxShadow:'0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)' }}>
      <defs>
        <radialGradient id={id} cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor={c.hi} stopOpacity="0.65"/>
          <stop offset="50%" stopColor={c.mid} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={c.deep} stopOpacity="1"/>
        </radialGradient>
        <filter id={`n-${id}`}><feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"/></filter>
      </defs>
      <rect width="200" height="200" rx={radius*200/size} fill={c.deep}/>
      <rect width="200" height="200" rx={radius*200/size} fill={`url(#${id})`}/>
      <rect width="200" height="200" rx={radius*200/size} fill={`url(#${id})`} style={{ mixBlendMode:'overlay', opacity:.5 }}/>
      {/* abstract shape — wave */}
      <path d="M0 130 Q 50 100 100 130 T 200 130 L 200 200 L 0 200 Z" fill={c.mid} opacity="0.35"/>
      <path d="M0 150 Q 50 120 100 150 T 200 150 L 200 200 L 0 200 Z" fill={c.deep} opacity="0.55"/>
      <rect width="200" height="200" rx={radius*200/size} fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
    </svg>
  );
}

// Persistent mini player — sits above tab bar on feed screens.
// Tap to expand into Ambient Now Playing.
function MiniPlayer({ ctx='rainy', song='Silver Lining', artist='Emi Yano', played=0.32, playing=true }) {
  const c = C[ctx];
  return (
    <div style={{
      position:'absolute', bottom:84, left:8, right:8, zIndex:54,
      borderRadius:14, padding:'8px 12px 10px',
      background:'rgba(28,28,26,0.78)',
      border:'1px solid rgba(255,255,255,0.07)',
      backdropFilter:'blur(24px) saturate(180%)',
      WebkitBackdropFilter:'blur(24px) saturate(180%)',
      display:'flex', alignItems:'center', gap:11,
      boxShadow:'0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02) inset',
    }}>
      <CoverArt ctx={ctx} size={38} radius={8}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:600, color:'#fff', letterSpacing:'-.01em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{song}</div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:1 }}>
          <span style={{ fontSize:10.5, color:'rgba(255,255,255,0.5)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:120 }}>{artist}</span>
          <span style={{ fontSize:9, color:c.hi, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase' }}>· {c.emoji} {c.short}</span>
        </div>
      </div>
      <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.85)', padding:6, marginRight:-4 }} aria-label="Play/pause">
        {playing
          ? <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
          : <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>}
      </button>
      <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', padding:4, marginRight:-2 }} aria-label="Expand">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* progress strip */}
      <div style={{ position:'absolute', bottom:0, left:14, right:14, height:1.5, background:'rgba(255,255,255,0.06)', borderRadius:1, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${played*100}%`, background:c.hi, borderRadius:1 }}/>
      </div>
    </div>
  );
}

Object.assign(window, { C, CanariStatusBar, DynamicIsland, Phone, TabBar, ContextPill, Waveform, CanariSerif, CoverArt, MiniPlayer });
