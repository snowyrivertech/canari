// listener-clip.jsx — Clip Maker + Share Sheet (the new feature)

// ─── CLIP MAKER ─────────────────────────────────────────────────
function ClipMaker({ song, ctx, onClose, onShare }) {
  const c = C[ctx];
  const [start, setStart] = React.useState(0.30);
  const [end, setEnd] = React.useState(0.42);
  const [branding, setBranding] = React.useState('outro'); // none|intro|outro|both
  const [previewing, setPreviewing] = React.useState(false);
  const [previewPos, setPreviewPos] = React.useState(start);
  const wfRef = React.useRef(null);

  // Preset clip durations
  const setPreset = (sec) => {
    const frac = sec / song.dur;
    const mid = (start + end) / 2;
    let s = Math.max(0, mid - frac/2);
    let e = s + frac;
    if (e > 1) { e = 1; s = Math.max(0, e - frac); }
    setStart(s); setEnd(e);
  };

  // Drag handle
  const onHandle = (which, e) => {
    e.preventDefault(); e.stopPropagation();
    const wf = wfRef.current.getBoundingClientRect();
    const move = (ev) => {
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const pct = Math.max(0, Math.min(1, (cx - wf.left) / wf.width));
      if (which === 'start') setStart(s => Math.min(pct, end - 0.03));
      else setEnd(e2 => Math.max(pct, start + 0.03));
    };
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchend', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move, { passive:false });
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);
  };

  // Preview playback animation
  React.useEffect(() => {
    if (!previewing) return;
    setPreviewPos(start);
    const dur = (end - start) * song.dur;
    const t0 = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - t0) / 1000;
      const p = start + (elapsed / dur) * (end - start);
      if (p >= end) {
        setPreviewing(false); setPreviewPos(start);
        return;
      }
      setPreviewPos(p);
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [previewing, start, end, song.dur]);

  const clipDur = (end - start) * song.dur;
  const startTime = start * song.dur;
  const endTime = end * song.dur;

  return (
    <div style={{ position:'absolute', inset:0, zIndex:90, background:c.bg, animation:'canariFadeUp .3s ease both' }}>
      <style>{`
        @keyframes canariFadeUp { from{ opacity:.3; transform:translateY(10px) } to{ opacity:1; transform:none } }
        @keyframes canariPulse { 0%,100%{ opacity:.4; transform:scale(.85) } 50%{ opacity:1; transform:scale(1) } }
        @keyframes brandPulse { 0%,100%{ opacity:.4 } 50%{ opacity:1 } }
      `}</style>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 70% at 50% 30%, ${c.glow} 0%, transparent 70%)` }}/>

      <CanariStatusBar/>

      {/* Top nav */}
      <div style={{ position:'absolute', top:62, left:0, right:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px' }}>
        <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.75)', fontSize:14, fontWeight:500, cursor:'pointer', padding:'8px 4px', fontFamily:'-apple-system,system-ui' }}>Cancel</button>
        <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.7)', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase' }}>Make a clip</div>
        <div style={{ width:54 }}/>
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', padding:'112px 22px 28px', overflow:'auto' }}>
        {/* Cover + song info */}
        <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:22 }}>
          <CoverArt ctx={ctx} size={72} radius={10}/>
          <div style={{ flex:1, minWidth:0 }}>
            <CanariSerif size={20} style={{ color:'#fff', display:'block' }}>{song.title}</CanariSerif>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:3 }}>{song.artist}</div>
            <div style={{ fontSize:9.5, color:c.hi, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', marginTop:6 }}>{c.emoji} {c.name} mix</div>
          </div>
        </div>

        {/* Selected duration display */}
        <div style={{ textAlign:'center', marginBottom:18 }}>
          <CanariSerif size={44} style={{ color:c.hi, display:'block', letterSpacing:'-.02em' }}>{fmtTime(clipDur)}</CanariSerif>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.45)', fontFamily:'JetBrains Mono,monospace', marginTop:4, letterSpacing:'.04em' }}>
            {fmtTime(startTime)} → {fmtTime(endTime)}
          </div>
        </div>

        {/* Waveform with handles */}
        <div ref={wfRef} style={{ position:'relative', height:80, padding:'10px 0', marginBottom:14, touchAction:'none', userSelect:'none' }}>
          {/* Background waveform */}
          <div style={{ height:'100%', display:'flex', alignItems:'center', gap:2 }}>
            {Array.from({length:64}).map((_,i) => {
              const h = (Math.sin(i*0.4 + ctx.charCodeAt(0)) * 0.5 + Math.sin(i*0.13 + ctx.charCodeAt(0)*2) * 0.3 + 0.6);
              const frac = i / 64;
              const inClip = frac >= start && frac <= end;
              const isPlayhead = previewing && Math.abs(frac - previewPos) < 0.012;
              return (
                <div key={i} style={{
                  flex:1, height:`${Math.max(18, Math.abs(h)*100)}%`,
                  borderRadius:1.5, minWidth:2,
                  background: isPlayhead ? '#fff' : inClip ? c.hi : 'rgba(255,255,255,0.18)',
                  opacity: isPlayhead ? 1 : inClip ? 0.95 : 0.45,
                  transition: previewing ? 'none' : 'background .2s, opacity .2s',
                }}/>
              );
            })}
          </div>

          {/* Selection region overlay */}
          <div style={{
            position:'absolute', top:6, bottom:6,
            left:`${start*100}%`, width:`${(end-start)*100}%`,
            border:'1.5px solid '+c.hi, borderRadius:6,
            background:c.hi+'10',
            pointerEvents:'none',
          }}/>

          {/* Start handle */}
          <div
            onMouseDown={(e) => onHandle('start', e)}
            onTouchStart={(e) => onHandle('start', e)}
            style={{
              position:'absolute', top:0, bottom:0,
              left:`${start*100}%`, width:24, transform:'translateX(-50%)',
              cursor:'ew-resize', display:'flex', alignItems:'center', justifyContent:'center',
              touchAction:'none',
            }}>
            <div style={{ width:6, height:60, background:c.hi, borderRadius:3, boxShadow:`0 0 16px ${c.glow}` }}>
              <div style={{ width:2, height:18, background:'rgba(0,0,0,0.3)', borderRadius:1, margin:'21px auto' }}/>
            </div>
          </div>

          {/* End handle */}
          <div
            onMouseDown={(e) => onHandle('end', e)}
            onTouchStart={(e) => onHandle('end', e)}
            style={{
              position:'absolute', top:0, bottom:0,
              left:`${end*100}%`, width:24, transform:'translateX(-50%)',
              cursor:'ew-resize', display:'flex', alignItems:'center', justifyContent:'center',
              touchAction:'none',
            }}>
            <div style={{ width:6, height:60, background:c.hi, borderRadius:3, boxShadow:`0 0 16px ${c.glow}` }}>
              <div style={{ width:2, height:18, background:'rgba(0,0,0,0.3)', borderRadius:1, margin:'21px auto' }}/>
            </div>
          </div>
        </div>

        {/* Preset durations */}
        <div style={{ display:'flex', gap:6, marginBottom:24 }}>
          {[10, 15, 30, 60].map(s => {
            const on = Math.abs(clipDur - s) < 1.5;
            return (
              <button key={s} onClick={() => setPreset(s)} style={{
                flex:1, padding:'8px 6px', borderRadius:8,
                background: on ? c.hi+'1f' : 'rgba(255,255,255,0.04)',
                border:'1px solid '+(on ? c.hi+'55' : 'rgba(255,255,255,0.06)'),
                color: on ? c.hi : 'rgba(255,255,255,0.6)',
                fontSize:12, fontWeight:600, cursor:'pointer',
                fontFamily:'-apple-system,system-ui',
              }}>{s}s</button>
            );
          })}
        </div>

        {/* Preview button */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:30 }}>
          <button onClick={() => setPreviewing(p => !p)} style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'12px 22px', borderRadius:100,
            background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
            color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer',
            fontFamily:'-apple-system,system-ui',
            backdropFilter:'blur(20px)',
          }}>
            {previewing
              ? <><svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>Stop preview</>
              : <><svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>Preview clip</>}
          </button>
        </div>

        {/* Audio branding section */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:'.08em', textTransform:'uppercase' }}>Canari sting</div>
            <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.4)', fontWeight:300 }}>Brand audio added to the clip</div>
          </div>
          <div style={{ display:'flex', gap:5, marginBottom:14 }}>
            {[
              { v:'none',  label:'None',  desc:'Raw clip' },
              { v:'intro', label:'Intro', desc:'Sting before' },
              { v:'outro', label:'Outro', desc:'Sting after' },
              { v:'both',  label:'Both',  desc:'Bookended' },
            ].map(o => {
              const on = branding === o.v;
              return (
                <button key={o.v} onClick={() => setBranding(o.v)} style={{
                  flex:1, padding:'10px 4px 9px', borderRadius:9, cursor:'pointer',
                  background: on ? c.hi+'1f' : 'rgba(255,255,255,0.03)',
                  border:'1px solid '+(on ? c.hi+'55' : 'rgba(255,255,255,0.06)'),
                  display:'flex', flexDirection:'column', gap:2,
                  fontFamily:'-apple-system,system-ui',
                }}>
                  <span style={{ fontSize:11.5, fontWeight:600, color: on ? c.hi : '#fff' }}>{o.label}</span>
                  <span style={{ fontSize:9, color: on ? c.hi+'cc' : 'rgba(255,255,255,0.4)', fontWeight:400 }}>{o.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Sting visualization */}
          <StingPreview ctx={ctx} branding={branding}/>
        </div>

        {/* Share button */}
        <button onClick={() => onShare({ start, end, branding })} style={{
          width:'100%', background:c.hi, color:'#000', border:'none',
          padding:'15px 24px', borderRadius:14, fontSize:14.5, fontWeight:700,
          fontFamily:'-apple-system,system-ui', letterSpacing:'-.01em',
          boxShadow:`0 18px 36px ${c.glow}`, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        }}>
          Share this clip
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11 5l-3-3-3 3M8 2v9" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

// Mini visualization for how the clip will play with branding
function StingPreview({ ctx, branding }) {
  const c = C[ctx];
  const hasIntro = branding === 'intro' || branding === 'both';
  const hasOutro = branding === 'outro' || branding === 'both';
  return (
    <div style={{
      background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)',
      borderRadius:10, padding:'10px 12px', display:'flex', alignItems:'center', gap:8,
    }}>
      {/* Intro sting */}
      <div style={{
        height:34, width:hasIntro ? 36 : 0, opacity: hasIntro ? 1 : 0,
        transition:'all .25s ease',
        background:`linear-gradient(135deg, ${c.hi}aa, ${c.hi}33)`,
        borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', flexShrink:0,
      }}>
        <svg width="20" height="11" viewBox="0 0 400 220" fill="none">
          <path d="M182 98C204 85 233 93 245 115L251 129C322 129 366 71 366 0H211C185 -1 159 5 136 18C112 32 94 51 82 74C70 96 56 117 38 134L35 138L38 142C56 159 70 179 82 201C83 203 84 205 85 207C123 273 208 296 275 258C278 256 281 254 283 252C331 220 308 147 251 147C248 160 241 171 228 178C206 191 178 183 165 161C152 139 160 111 182 98Z" fill="#000" opacity=".7"/>
        </svg>
      </div>
      {/* Clip waveform */}
      <div style={{ flex:1, display:'flex', alignItems:'center', gap:1.5, height:24 }}>
        {Array.from({length:28}).map((_,i) => {
          const h = Math.abs(Math.sin(i*0.5) * 0.5 + Math.sin(i*0.13) * 0.3 + 0.6);
          return <div key={i} style={{ flex:1, height:`${h*100}%`, minHeight:3, background:c.hi, opacity:.8, borderRadius:1 }}/>;
        })}
      </div>
      {/* Outro sting */}
      <div style={{
        height:34, width:hasOutro ? 36 : 0, opacity: hasOutro ? 1 : 0,
        transition:'all .25s ease',
        background:`linear-gradient(135deg, ${c.hi}aa, ${c.hi}33)`,
        borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center',
        flexShrink:0,
      }}>
        <svg width="20" height="11" viewBox="0 0 400 220" fill="none">
          <path d="M182 98C204 85 233 93 245 115L251 129C322 129 366 71 366 0H211C185 -1 159 5 136 18C112 32 94 51 82 74C70 96 56 117 38 134L35 138L38 142C56 159 70 179 82 201C83 203 84 205 85 207C123 273 208 296 275 258C278 256 281 254 283 252C331 220 308 147 251 147C248 160 241 171 228 178C206 191 178 183 165 161C152 139 160 111 182 98Z" fill="#000" opacity=".7"/>
        </svg>
      </div>
    </div>
  );
}

// ─── SHARE SHEET ────────────────────────────────────────────────
function ShareSheet({ song, ctx, clip, onClose }) {
  const c = C[ctx];
  const [caption, setCaption] = React.useState(`This is what \u201C${song.title}\u201D sounds like when it ${ctx === 'rainy' ? 'rains' : ctx === 'morning' ? 'is morning' : ctx === 'night' ? 'is late' : 'is golden'}.`);
  const [includeVersion, setIncludeVersion] = React.useState(true);
  const [posted, setPosted] = React.useState(null);

  const targets = [
    { id:'stories', label:'Stories', color:'linear-gradient(135deg,#f093fb,#f5576c)', emoji:'⊙' },
    { id:'reels',   label:'Reel',    color:'linear-gradient(135deg,#fa709a,#fee140)', emoji:'▶' },
    { id:'tiktok',  label:'TikTok',  color:'#000', emoji:'♪' },
    { id:'x',       label:'X',       color:'#0a0a0a', emoji:'𝕏' },
    { id:'msg',     label:'Message', color:'#34c759', emoji:'💬' },
    { id:'copy',    label:'Copy',    color:'rgba(255,255,255,0.08)', emoji:'⎘' },
  ];

  const handleShare = (target) => {
    setPosted(target.label);
    setTimeout(() => { onClose(); }, 1400);
  };

  return (
    <div style={{ position:'absolute', inset:0, zIndex:95 }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)' }}/>
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, top:60, zIndex:1,
        background:'rgba(20,20,18,0.97)', backdropFilter:'blur(40px) saturate(180%)',
        borderRadius:'28px 28px 0 0',
        border:'1px solid rgba(255,255,255,0.08)',
        boxShadow:`0 -30px 60px rgba(0,0,0,0.6), 0 0 100px ${c.glow}`,
        padding:'14px 22px 40px',
        overflow:'auto',
        animation:'canariSlideUp .3s cubic-bezier(.2,.7,.2,1) both',
        display:'flex', flexDirection:'column',
      }}>
        {/* Drag handle */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}>
          <div onClick={onClose} style={{ width:42, height:4.5, borderRadius:100, background:'rgba(255,255,255,0.18)', cursor:'pointer' }}/>
        </div>

        {posted ? (
          /* Posted success */
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'40px 24px' }}>
            <div style={{ width:88, height:88, borderRadius:'50%', background:c.hi+'22', border:'2px solid '+c.hi+'66', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24, animation:'canariFadeUp .35s cubic-bezier(.2,.7,.2,1) both' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M11 20l6 6 14-14" stroke={c.hi} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <CanariSerif size={26} style={{ color:'#fff', display:'block', marginBottom:8 }}>
              Sent to <span style={{ fontStyle:'italic', color:c.hi }}>{posted}</span>
            </CanariSerif>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.55)', fontWeight:300, maxWidth:280, lineHeight:1.6 }}>The clip and the version it came from are linked — anyone who plays it gets the {c.name.toLowerCase()} mix.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:10.5, fontWeight:700, color:c.hi, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:4 }}>Share this moment</div>
              <CanariSerif size={22} style={{ color:'#fff', display:'block' }}>
                A piece of <span style={{ fontStyle:'italic' }}>{song.title}</span> for the world.
              </CanariSerif>
            </div>

            {/* Preview card */}
            <div style={{ background:c.bg, border:'1px solid '+c.hi+'30', borderRadius:14, padding:16, marginBottom:16, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 80% at 30% 30%, ${c.glow} 0%, transparent 70%)` }}/>
              <div style={{ position:'relative', display:'flex', gap:12, alignItems:'center' }}>
                <CoverArt ctx={ctx} size={64} radius={9}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{song.title}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:2 }}>{song.artist}</div>
                  {includeVersion && (
                    <div style={{ fontSize:9.5, color:c.hi, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', marginTop:5 }}>{C[ctx].emoji} {C[ctx].name} mix · clipped</div>
                  )}
                </div>
                <div style={{ fontSize:11, color:c.hi, fontFamily:'JetBrains Mono,monospace', fontWeight:600 }}>{fmtTime((clip.end - clip.start) * song.dur)}</div>
              </div>
              {/* Mini waveform showing clip */}
              <div style={{ position:'relative', display:'flex', alignItems:'center', gap:1.5, height:18, marginTop:12 }}>
                {Array.from({length:38}).map((_,i) => {
                  const h = Math.abs(Math.sin(i*0.4) * 0.5 + Math.sin(i*0.13) * 0.3 + 0.6);
                  return <div key={i} style={{ flex:1, height:`${Math.max(20, h*100)}%`, minHeight:3, background:c.hi, opacity:0.8, borderRadius:1 }}/>;
                })}
                {clip.branding !== 'none' && (clip.branding === 'intro' || clip.branding === 'both') && (
                  <div style={{ position:'absolute', left:-1, top:-2, bottom:-2, width:8, background:c.hi+'66', borderRadius:'3px 0 0 3px', border:'1px solid '+c.hi }}/>
                )}
                {clip.branding !== 'none' && (clip.branding === 'outro' || clip.branding === 'both') && (
                  <div style={{ position:'absolute', right:-1, top:-2, bottom:-2, width:8, background:c.hi+'66', borderRadius:'0 3px 3px 0', border:'1px solid '+c.hi }}/>
                )}
              </div>
            </div>

            {/* Caption */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10.5, fontWeight:600, color:'rgba(255,255,255,0.5)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:6 }}>Caption</div>
              <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={2} style={{
                width:'100%', resize:'none', padding:'10px 12px', borderRadius:10,
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                color:'#fff', fontSize:13, fontWeight:400, fontFamily:'-apple-system,system-ui',
                outline:'none', lineHeight:1.5,
              }}/>
            </div>

            {/* Include version toggle */}
            <div onClick={() => setIncludeVersion(v => !v)} style={{
              display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:10,
              background: includeVersion ? c.hi+'10' : 'rgba(255,255,255,0.03)',
              border:'1px solid '+(includeVersion ? c.hi+'40' : 'rgba(255,255,255,0.06)'),
              marginBottom:18, cursor:'pointer',
            }}>
              <div style={{
                width:34, height:20, borderRadius:100, padding:2,
                background: includeVersion ? c.hi : 'rgba(255,255,255,0.12)',
                transition:'background .2s',
              }}>
                <div style={{
                  width:16, height:16, borderRadius:'50%', background:'#fff',
                  transform: includeVersion ? 'translateX(14px)' : 'translateX(0)',
                  transition:'transform .2s',
                }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12.5, fontWeight:600, color:'#fff' }}>Include the version</div>
                <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.45)', marginTop:1 }}>Anyone who plays it gets the {C[ctx].name.toLowerCase()} mix</div>
              </div>
            </div>

            {/* Share targets */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
              {targets.map(t => (
                <button key={t.id} onClick={() => handleShare(t)} style={{
                  display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                  padding:'14px 6px', borderRadius:12,
                  background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)',
                  cursor:'pointer', fontFamily:'-apple-system,system-ui',
                }}>
                  <div style={{
                    width:44, height:44, borderRadius:11,
                    background:t.color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:18, color:'#fff', fontWeight:600,
                    border: t.id === 'copy' ? '1px solid rgba(255,255,255,0.12)' : 'none',
                  }}>{t.emoji}</div>
                  <span style={{ fontSize:11, fontWeight:500, color:'rgba(255,255,255,0.8)' }}>{t.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ClipMaker, ShareSheet });
