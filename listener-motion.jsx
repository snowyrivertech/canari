// listener-motion.jsx — Now Playing in motion (live demo)
// Stems shift, waveform plays, logs append, weather pulses

function ScreenNowPlayingMotion({ ctx='rainy' }) {
  const c = C[ctx];
  const baseStems = c.stems;
  const stemNames = Object.keys(baseStems);

  const [played, setPlayed] = React.useState(0.18);
  const [stems, setStems] = React.useState({ ...baseStems });
  const [pulseKey, setPulseKey] = React.useState(0);
  const [tick, setTick] = React.useState(0);
  const [logs, setLogs] = React.useState([
    { time:'now-12s', text:`${c.emoji} ${c.name} trigger fired`, dot:'#6FCF97', fresh:true },
    { time:'now-08s', text:`Strings pulled forward (+18%)`, dot:c.hi },
    { time:'now-04s', text:`Drum bus softened (-22%)`, dot:c.hi },
  ]);

  // Reset on context change
  React.useEffect(() => {
    setStems({ ...baseStems });
    setLogs([
      { time:'now-12s', text:`${c.emoji} ${c.name} trigger fired`, dot:'#6FCF97', fresh:true },
      { time:'now-08s', text:`Strings pulled forward (+18%)`, dot:c.hi },
      { time:'now-04s', text:`Drum bus softened (-22%)`, dot:c.hi },
    ]);
    setPlayed(0.18);
    setTick(0);
  }, [ctx]);

  // Playback + stem drift (every 700ms)
  React.useEffect(() => {
    const i = setInterval(() => {
      setPlayed(p => p >= 0.98 ? 0.18 : p + 0.012);
      setTick(t => t + 1);
      setStems(s => {
        const out = {...s};
        Object.keys(out).forEach(k => {
          const target = baseStems[k];
          // wiggle around the target, with occasional bigger excursions
          const wiggle = (Math.sin((Date.now() / (k.length*420)) + k.charCodeAt(0)) * 6);
          out[k] = Math.max(8, Math.min(98, target + wiggle + (Math.random()-0.5)*3));
        });
        return out;
      });
      setPulseKey(k => k+1);
    }, 700);
    return () => clearInterval(i);
  }, [ctx]);

  // New log entries periodically
  React.useEffect(() => {
    const events = [
      `Reverb depth nudged +6%`,
      `Vocal warmth +4%`,
      `Mid-low EQ smoothed`,
      `Pad tail extended 1.2s`,
      `Hi-hat layer trimmed`,
    ];
    let n = 0;
    const i = setInterval(() => {
      setLogs(l => [
        { time:'now', text:events[n % events.length], dot:c.hi, fresh:true },
        ...l.slice(0,4).map((x,j) => j===0 ? {...x, fresh:false} : x)
      ]);
      n++;
    }, 4500);
    return () => clearInterval(i);
  }, [ctx]);

  return (
    <>
      <style>{`
        @keyframes canariPulse { 0%,100%{ opacity:1; transform:scale(1) } 50%{ opacity:.45; transform:scale(.92) } }
        @keyframes canariFadeIn { from{ opacity:0; transform:translateY(-4px) } to{ opacity:1; transform:translateY(0) } }
        @keyframes canariWaveBar { 0%,100%{ transform:scaleY(0.6) } 50%{ transform:scaleY(1) } }
      `}</style>
      <div style={{ position:'absolute', inset:0, background:c.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 70% at 50% 20%, ${c.glow} 0%, transparent 70%)`, zIndex:2, opacity:0.7 + 0.3*Math.sin(tick/3) }}/>

      <CanariStatusBar/>

      {/* Top nav */}
      <div style={{ position:'absolute', top:62, left:0, right:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px' }}>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.65)', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'#6FCF97', boxShadow:'0 0 8px #6FCF97', animation:'canariPulse 1.8s ease-in-out infinite' }}/>
          Live · Adapting
        </div>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="20" height="6" viewBox="0 0 22 6"><circle cx="3" cy="3" r="2" fill="#fff"/><circle cx="11" cy="3" r="2" fill="#fff"/><circle cx="19" cy="3" r="2" fill="#fff"/></svg>
        </button>
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', padding:'120px 22px 50px', overflow:'auto' }}>

        {/* Context receipt with live signals */}
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid '+c.hi+'30', borderRadius:14, padding:'12px 14px', marginBottom:18, backdropFilter:'blur(20px)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
            <div style={{ width:36, height:36, borderRadius:9, background:c.hi+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{c.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{c.name}</div>
              <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.5)', marginTop:1 }}>{c.weatherLine} · {c.timeLine}</div>
            </div>
          </div>
          {/* Animated mini-readout */}
          <div style={{ display:'flex', gap:8 }}>
            {['weather','time','location','season'].map((k,i) => (
              <div key={k} style={{ flex:1, padding:'6px 8px', background:'rgba(255,255,255,0.03)', borderRadius:7, textAlign:'center' }}>
                <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.4)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em' }}>{k}</div>
                <div style={{ fontSize:10, color:'#fff', fontWeight:500, marginTop:2, fontFamily:'JetBrains Mono,monospace' }}>
                  {k==='weather' && c.weatherLine.split(' · ')[0].split(' ')[0]}
                  {k==='time' && c.timeLine.split(' · ')[0]}
                  {k==='location' && 'Portland'}
                  {k==='season' && 'Spring'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact cover + title */}
        <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:18 }}>
          <CoverArt ctx={ctx} size={84} radius={11}/>
          <div style={{ flex:1, minWidth:0 }}>
            <CanariSerif size={22} style={{ color:'#fff', display:'block' }}>Silver Lining</CanariSerif>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginTop:3 }}>Emi Yano</div>
            <div style={{ fontSize:10, color:c.hi, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', marginTop:6, display:'flex', alignItems:'center', gap:6 }}>
              {c.emoji} {c.name} mix
              <span style={{ display:'inline-block', width:5, height:5, borderRadius:'50%', background:c.hi, boxShadow:`0 0 6px ${c.hi}`, animation:'canariPulse 1.8s ease-in-out infinite' }}/>
            </div>
          </div>
        </div>

        {/* Live stems */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:'14px 14px 16px', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase' }}>Stem balance · live</div>
            <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.4)', fontFamily:'JetBrains Mono,monospace' }}>{tick}s · 6s blend window</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {stemNames.map(name => {
              const v = stems[name];
              return (
                <div key={name} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:11.5, fontWeight:500, color:'rgba(255,255,255,0.65)', width:54 }}>{name}</span>
                  <div style={{ flex:1, height:5, background:'rgba(255,255,255,0.06)', borderRadius:3, overflow:'hidden', position:'relative' }}>
                    <div style={{ position:'absolute', top:0, left:0, height:'100%', width:`${v}%`, background:c.hi, opacity:.85, transition:'width 700ms cubic-bezier(.4,0,.2,1)', boxShadow:`0 0 8px ${c.hi}66` }}/>
                  </div>
                  <span style={{ fontSize:10, color:'rgba(255,255,255,0.6)', fontFamily:'JetBrains Mono,monospace', width:30, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{Math.round(v)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live event log */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:'12px 14px', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.1em', textTransform:'uppercase' }}>Adaptation log</div>
            <span style={{ fontSize:9.5, color:'#6FCF97', fontWeight:700, fontFamily:'JetBrains Mono,monospace' }}>● LIVE</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            {logs.map((l, i) => (
              <div key={i+'-'+l.text} style={{
                display:'flex', alignItems:'center', gap:10,
                animation: (l.fresh && i===0) ? 'canariFadeIn .35s ease both' : 'none',
              }}>
                <span style={{ fontSize:9.5, color:'rgba(255,255,255,0.35)', fontFamily:'JetBrains Mono,monospace', width:48 }}>{l.time}</span>
                <span style={{ width:5, height:5, borderRadius:'50%', background:l.dot, flexShrink:0, boxShadow:`0 0 6px ${l.dot}88` }}/>
                <span style={{ flex:1, fontSize:11.5, color: i===0 ? '#fff' : 'rgba(255,255,255,0.6)' }}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Waveform — animated by `played` */}
        <Waveform ctx={ctx} played={played} height={36} count={48}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10.5, color:'rgba(255,255,255,0.4)', fontWeight:500, marginTop:8, fontFamily:'JetBrains Mono,monospace' }}>
          <span style={{ fontVariantNumeric:'tabular-nums' }}>{formatTime(played * 227)}</span><span>3:47</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:28, marginTop:14 }}>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5l-9 7 9 7V5z"/><rect x="4" y="5" width="2" height="14" rx="1"/></svg>
          </button>
          <button style={{ width:58, height:58, borderRadius:'50%', background:c.hi, border:'none', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 18px 40px ${c.glow}` }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
          </button>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l9 7-9 7V5z"/><rect x="18" y="5" width="2" height="14" rx="1"/></svg>
          </button>
        </div>

      </div>
    </>
  );
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2,'0')}`;
}

Object.assign(window, { ScreenNowPlayingMotion });
