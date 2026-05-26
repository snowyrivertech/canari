// listener-app.jsx — Interactive prototype: navigation shell + Now Playing variants

const { useState, useEffect, useRef } = React;

// ─── INTERACTIVE TAB BAR ────────────────────────────────────────
function ITabBar({ active, onTab, onMiniTap }) {
  const tabs = [
    { id:'feed',    label:'For You',  svg:<path d="M3 10L12 3l9 7v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V10z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/> },
    { id:'search',  label:'Search',   svg:<><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></> },
    { id:'library', label:'Library',  svg:<><path d="M5 4h14v16H5z" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M9 4v16M13 4v16" stroke="currentColor" strokeWidth="1.6"/></> },
    { id:'profile', label:'Profile',  svg:<><circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></> },
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
            <button key={t.id} onClick={() => onTab(t.id)} style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              color: on ? C.gold : 'rgba(255,255,255,0.45)', flex:1,
              background:'none', border:'none', padding:'4px 0', cursor:'pointer',
              fontFamily:'-apple-system,system-ui',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{t.svg}</svg>
              <span style={{ fontSize:10, fontWeight:600, letterSpacing:'.01em' }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── MINI PLAYER (interactive) ──────────────────────────────────
function IMiniPlayer({ song, ctx, played, playing, onExpand, onPlayToggle }) {
  const c = C[ctx];
  return (
    <div style={{
      position:'absolute', bottom:84, left:8, right:8, zIndex:54,
      borderRadius:14, padding:'8px 12px 10px',
      background:'rgba(28,28,26,0.82)',
      border:'1px solid rgba(255,255,255,0.07)',
      backdropFilter:'blur(24px) saturate(180%)',
      display:'flex', alignItems:'center', gap:11,
      boxShadow:'0 10px 30px rgba(0,0,0,0.45)',
      cursor:'pointer',
    }} onClick={onExpand}>
      <CoverArt ctx={ctx} size={38} radius={8}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:600, color:'#fff', letterSpacing:'-.01em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{song.title}</div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:1 }}>
          <span style={{ fontSize:10.5, color:'rgba(255,255,255,0.5)' }}>{song.artist}</span>
          <span style={{ fontSize:9, color:c.hi, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase' }}>· {c.emoji} {c.short}</span>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onPlayToggle(); }} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.85)', padding:6, cursor:'pointer' }} aria-label="Play/pause">
        {playing
          ? <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
          : <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>}
      </button>
      <button onClick={(e) => { e.stopPropagation(); onExpand(); }} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', padding:4, cursor:'pointer' }} aria-label="Expand">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div style={{ position:'absolute', bottom:0, left:14, right:14, height:1.5, background:'rgba(255,255,255,0.06)', borderRadius:1, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${played*100}%`, background:c.hi, borderRadius:1, transition:'width .25s linear' }}/>
      </div>
    </div>
  );
}

// ─── NOW PLAYING — AMBIENT (interactive) ────────────────────────
function INowPlayingAmbient({ song, ctx, played, playing, onCollapse, onExpand, onDrawer, onClip, onPlayToggle, onNext, onPrev, onMore }) {
  const c = C[ctx];
  return (
    <div style={{ position:'absolute', inset:0, zIndex:80, overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:c.bg }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 70% at 50% 20%, ${c.glow} 0%, transparent 70%)` }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 95%, rgba(0,0,0,0.55) 0%, transparent 60%)' }}/>

      <CanariStatusBar/>

      {/* Top nav */}
      <div style={{ position:'absolute', top:62, left:0, right:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px' }}>
        <button onClick={onCollapse} style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }} aria-label="Collapse">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={onDrawer} style={{ background:'none', border:'none', padding:0, cursor:'pointer' }} aria-label="Context">
          <ContextPill ctx={ctx}/>
        </button>
        <button onClick={onMore} style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }} aria-label="More options">
          <svg width="20" height="6" viewBox="0 0 22 6"><circle cx="3" cy="3" r="2" fill="#fff"/><circle cx="11" cy="3" r="2" fill="#fff"/><circle cx="19" cy="3" r="2" fill="#fff"/></svg>
        </button>
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', padding:'120px 28px 50px' }}>
        {/* Cover */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:34 }}>
          <CoverArt ctx={ctx} size={340} radius={20}/>
        </div>

        {/* Title */}
        <div style={{ marginBottom:22 }}>
          <CanariSerif size={32} style={{ color:'#fff', display:'block' }}>{song.title}</CanariSerif>
          <div style={{ fontSize:15, color:'rgba(255,255,255,0.55)', marginTop:6, fontWeight:400 }}>{song.artist}</div>
          <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:11.5, color:c.hi, fontWeight:600, padding:'5px 11px', background:c.hi+'18', border:'1px solid '+c.hi+'40', borderRadius:100, letterSpacing:'.02em' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:c.hi, boxShadow:`0 0 8px ${c.hi}` }}/>
              <span>{c.emoji} {c.name} mix · adapting live</span>
            </div>
            <button onClick={onExpand} style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:500, color:'rgba(255,255,255,0.55)', background:'none', border:'none', padding:'5px 4px', letterSpacing:'.02em', cursor:'pointer' }}>
              Why this version?
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <Waveform ctx={ctx} played={played} height={42}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(255,255,255,0.4)', fontWeight:500, marginTop:10, fontVariantNumeric:'tabular-nums' }}>
          <span>{fmtTime(played*song.dur)}</span><span>{fmtTime(song.dur)}</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:30, marginTop:28 }}>
          <button onClick={onPrev} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)', cursor:'pointer' }} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5l-9 7 9 7V5z"/><rect x="4" y="5" width="2" height="14" rx="1"/></svg>
          </button>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer' }} aria-label="Back 15">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 5V2L6 6l6 4V7a6 6 0 110 12 6 6 0 01-6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={onPlayToggle} style={{ width:68, height:68, borderRadius:'50%', background:'#fff', border:'none', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 20px 50px rgba(0,0,0,0.5)' }} aria-label="Play/pause">
            {playing
              ? <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
              : <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>}
          </button>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer' }} aria-label="Forward 15">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 5V2l6 4-6 4V7a6 6 0 100 12 6 6 0 006-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={onNext} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)', cursor:'pointer' }} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l9 7-9 7V5z"/><rect x="18" y="5" width="2" height="14" rx="1"/></svg>
          </button>
        </div>

        <div style={{ marginTop:32, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={onClip} style={{ background:'none', border:'none', color:c.hi, display:'flex', alignItems:'center', gap:7, fontSize:12.5, fontWeight:600, cursor:'pointer', padding:'8px 10px', margin:'-8px 0 -8px -10px' }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.6"/><circle cx="5" cy="15" r="2.2" stroke="currentColor" strokeWidth="1.6"/></svg>
            Clip this moment
          </button>
          <button onClick={onDrawer} style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', display:'flex', alignItems:'center', gap:7, fontSize:11.5, fontWeight:600, padding:'8px 14px', borderRadius:100, backdropFilter:'blur(20px)', cursor:'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Context
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NOW PLAYING — EXPANDED (the engine view) ──────────────────
function INowPlayingExpanded({ song, ctx, played, playing, onCollapse, onPlayToggle, onMore }) {
  const c = C[ctx];
  const stemNames = Object.keys(c.stems);
  return (
    <div style={{ position:'absolute', inset:0, zIndex:80, overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:c.bg }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 70% at 50% 20%, ${c.glow} 0%, transparent 70%)` }}/>

      <CanariStatusBar/>

      <div style={{ position:'absolute', top:62, left:0, right:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px' }}>
        <button onClick={onCollapse} style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }} aria-label="Back to ambient">
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none"><path d="M7 1L1 7l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase' }}>Why this version</div>
        <button onClick={onMore} style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }} aria-label="More options">
          <svg width="20" height="6" viewBox="0 0 22 6"><circle cx="3" cy="3" r="2" fill="#fff"/><circle cx="11" cy="3" r="2" fill="#fff"/><circle cx="19" cy="3" r="2" fill="#fff"/></svg>
        </button>
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', padding:'120px 22px 50px', overflow:'auto' }}>
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid '+c.hi+'30', borderRadius:14, padding:'12px 14px', marginBottom:18, display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:9, background:c.hi+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{c.emoji}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:700, color:c.hi, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:2 }}>Trigger fired</div>
            <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>{c.name} · {c.weatherLine}</div>
            <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.45)', marginTop:1 }}>{c.timeLine} · Portland, OR</div>
          </div>
        </div>

        <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:18 }}>
          <CoverArt ctx={ctx} size={84} radius={11}/>
          <div style={{ flex:1, minWidth:0 }}>
            <CanariSerif size={22} style={{ color:'#fff', display:'block' }}>{song.title}</CanariSerif>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginTop:3 }}>{song.artist}</div>
            <div style={{ fontSize:10, color:c.hi, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', marginTop:6 }}>{c.emoji} {c.name} mix</div>
          </div>
        </div>

        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:'14px 14px 16px', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase' }}>Live stem balance</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'JetBrains Mono,monospace', display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#6FCF97', boxShadow:'0 0 6px #6FCF97' }}/>ADAPTING
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {stemNames.map(name => (
              <div key={name} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:11.5, fontWeight:500, color:'rgba(255,255,255,0.65)', width:54 }}>{name}</span>
                <div style={{ flex:1, height:4, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden', position:'relative' }}>
                  <div style={{ position:'absolute', top:0, left:0, height:'100%', width:`${c.stems[name]}%`, background:c.hi, opacity:.85 }}/>
                </div>
                <span style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'JetBrains Mono,monospace', width:30, textAlign:'right' }}>{c.stems[name]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>Hear it elsewhere</div>
          <div style={{ display:'flex', gap:6 }}>
            {['rainy','morning','night','golden'].map(k => {
              const cc = C[k]; const on = k === ctx;
              return (
                <div key={k} style={{
                  flex:1, padding:'10px 6px', borderRadius:10, textAlign:'center',
                  background: on ? cc.hi+'22' : 'rgba(255,255,255,0.03)',
                  border:'1px solid '+(on ? cc.hi+'55' : 'rgba(255,255,255,0.06)'),
                  display:'flex', flexDirection:'column', gap:3,
                }}>
                  <span style={{ fontSize:14 }}>{cc.emoji}</span>
                  <span style={{ fontSize:9.5, fontWeight:600, color: on ? cc.hi : 'rgba(255,255,255,0.5)' }}>{cc.short}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Waveform ctx={ctx} played={played} height={36} count={50}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10.5, color:'rgba(255,255,255,0.4)', fontWeight:500, marginTop:8 }}>
          <span>{fmtTime(played*song.dur)}</span><span>{fmtTime(song.dur)}</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:28, marginTop:16 }}>
          <button onClick={onPlayToggle} style={{ width:60, height:60, borderRadius:'50%', background:c.hi, border:'none', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:`0 18px 40px ${c.glow}` }}>
            {playing
              ? <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
              : <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTEXT DRAWER (overlay sheet) ─────────────────────────────
function IContextDrawer({ ctx, onClose }) {
  const c = C[ctx];
  return (
    <div style={{ position:'absolute', inset:0, zIndex:90 }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)' }}/>
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, top:170, zIndex:1,
        background:'rgba(20,20,18,0.96)', backdropFilter:'blur(40px) saturate(180%)',
        borderRadius:'28px 28px 0 0',
        border:'1px solid rgba(255,255,255,0.08)',
        boxShadow:`0 -30px 60px rgba(0,0,0,0.6), 0 0 80px ${c.glow}`,
        padding:'14px 22px 40px',
        overflow:'auto',
        animation:'canariSlideUp .3s cubic-bezier(.2,.7,.2,1) both',
      }}>
        <style>{`@keyframes canariSlideUp { from{ transform:translateY(40px); opacity:.4 } to{ transform:none; opacity:1 } }`}</style>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
          <div onClick={onClose} style={{ width:42, height:4.5, borderRadius:100, background:'rgba(255,255,255,0.18)', cursor:'pointer' }}/>
        </div>

        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:c.hi, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:6 }}>This moment</div>
          <CanariSerif size={26} style={{ color:'#fff', display:'block' }}>
            Why you're hearing<br/>the <span style={{ fontStyle:'italic', color:c.hi }}>{c.short.toLowerCase()}</span> version.
          </CanariSerif>
        </div>

        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:14, marginBottom:12 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Live signals</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <SigCell label="Weather" val={c.weatherLine.split(' · ')[0]} sub={c.weatherLine.split(' · ')[1]}/>
            <SigCell label="Time" val={c.timeLine.split(' · ')[0]} sub={c.timeLine.split(' · ')[1]}/>
            <SigCell label="Location" val="Portland" sub="Home · Indoors"/>
            <SigCell label="Season" val="Spring" sub="Late · 73d in"/>
          </div>
        </div>

        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.1em', textTransform:'uppercase' }}>What changed</div>
            <span style={{ fontSize:10, color:c.hi, fontWeight:600 }}>Last 6m</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <ChangeRow time="9:24" dot={c.hi}>Strings pulled forward (+18%)</ChangeRow>
            <ChangeRow time="9:24" dot={c.hi}>Drum bus softened (-22%)</ChangeRow>
            <ChangeRow time="9:18" dot="#6FCF97">Rain started · trigger fired</ChangeRow>
          </div>
        </div>
      </div>
    </div>
  );
}
function SigCell({ label, val, sub }) {
  return (
    <div>
      <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.4)', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:5 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{val}</div>
      <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:1 }}>{sub}</div>
    </div>
  );
}
function ChangeRow({ time, dot, children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <span style={{ fontSize:10, color:'rgba(255,255,255,0.35)', fontFamily:'JetBrains Mono,monospace', width:28 }}>{time}</span>
      <span style={{ width:5, height:5, borderRadius:'50%', background:dot, flexShrink:0 }}/>
      <span style={{ flex:1, fontSize:12, color:'rgba(255,255,255,0.7)' }}>{children}</span>
    </div>
  );
}

// ─── UTILS ──────────────────────────────────────────────────────
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2,'0')}`;
}

// ─── ACTION SHEET (3-dot menu) ──────────────────────────────────
function IActionSheet({ song, ctx, onClose, onClip, onShare, onShowDrawer }) {
  const c = C[ctx];
  const [savedTo, setSavedTo] = React.useState(null);

  const items = [
    { label:'Save to library',  detail:savedTo === 'lib' ? 'Saved' : null, icon:'＋', onClick:() => { setSavedTo('lib'); setTimeout(onClose, 700); } },
    { label:'Save this moment', detail:savedTo === 'moment' ? 'Saved' : 'Pin this exact mix to your library', icon:'☆', onClick:() => { setSavedTo('moment'); setTimeout(onClose, 700); } },
    { label:'Clip & share',     detail:'Open the clip maker', icon:'✂', onClick:() => { onClose(); setTimeout(onClip, 200); } },
    { label:'Why this version?', detail:'Live signals & adaptation log', icon:'ℹ', onClick:() => { onClose(); setTimeout(onShowDrawer, 200); } },
    { label:'Go to artist',     detail:song.artist, icon:'→', onClick:onClose },
    { label:'Share the song',   detail:'With its current version', icon:'↗', onClick:onClose },
  ];

  return (
    <div style={{ position:'absolute', inset:0, zIndex:92 }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)', animation:'canariFadeIn .2s ease both' }}/>
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        background:'rgba(20,20,18,0.97)', backdropFilter:'blur(40px) saturate(180%)',
        borderRadius:'24px 24px 0 0',
        border:'1px solid rgba(255,255,255,0.08)',
        boxShadow:`0 -30px 60px rgba(0,0,0,0.6), 0 0 60px ${c.glow}`,
        padding:'12px 14px 30px',
        animation:'canariSlideUp .3s cubic-bezier(.2,.7,.2,1) both',
      }}>
        <style>{`@keyframes canariFadeIn { from{opacity:0} to{opacity:1} }`}</style>
        {/* Drag handle */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}>
          <div onClick={onClose} style={{ width:42, height:4.5, borderRadius:100, background:'rgba(255,255,255,0.18)', cursor:'pointer' }}/>
        </div>

        {/* Song header */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'2px 8px 14px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <CoverArt ctx={ctx} size={42} radius={9}/>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13.5, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{song.title}</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:1 }}>{song.artist} · {c.emoji} {c.short}</div>
          </div>
        </div>

        {/* Items */}
        <div style={{ display:'flex', flexDirection:'column', gap:2, marginTop:6 }}>
          {items.map((it, i) => (
            <button key={i} onClick={it.onClick} style={{
              display:'flex', alignItems:'center', gap:14, padding:'13px 12px',
              background:'none', border:'none', cursor:'pointer',
              fontFamily:'-apple-system,system-ui', textAlign:'left', borderRadius:10,
            }}
            onMouseEnter={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
            onMouseLeave={(e)=>e.currentTarget.style.background='none'}>
              <div style={{ width:30, height:30, borderRadius:8, background:c.hi+'18', border:'1px solid '+c.hi+'40', color:c.hi, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:600 }}>{it.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:500, color:'#fff', letterSpacing:'-.01em' }}>{it.label}</div>
                {it.detail && <div style={{ fontSize:11, color: (it.detail==='Saved') ? '#6FCF97' : 'rgba(255,255,255,0.4)', marginTop:2 }}>{it.detail}</div>}
              </div>
            </button>
          ))}
        </div>

        {/* Cancel */}
        <button onClick={onClose} style={{
          marginTop:10, width:'100%', padding:'13px',
          background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)',
          color:'#fff', fontSize:14, fontWeight:600, borderRadius:11,
          fontFamily:'-apple-system,system-ui', cursor:'pointer',
        }}>Cancel</button>
      </div>
    </div>
  );
}

Object.assign(window, { ITabBar, IMiniPlayer, INowPlayingAmbient, INowPlayingExpanded, IContextDrawer, IActionSheet, fmtTime });
