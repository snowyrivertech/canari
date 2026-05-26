// listener-screens-a.jsx — Onboarding, Home/For You, Now Playing variants

// ─── ONBOARDING ───────────────────────────────────────────────
function ScreenOnboarding() {
  const ctx = 'rainy';
  const c = C[ctx];
  return (
    <>
      <CanariStatusBar/>
      {/* ambient bg */}
      <div style={{ position:'absolute', inset:0, background:c.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 70% 50% at 50% 30%, ${c.glow} 0%, transparent 70%)`, zIndex:2 }}/>
      {/* particles */}
      <svg viewBox="0 0 402 872" style={{ position:'absolute', inset:0, zIndex:3, opacity:.5 }}>
        {Array.from({length:30}).map((_,i)=>{
          const x=(i*73)%380+10, y=(i*131)%600+80, r=0.5+(i%3)*0.4;
          return <circle key={i} cx={x} cy={y} r={r} fill={i%4===0?c.hi:'#fff'} opacity={0.2+(i%5)*0.12}/>;
        })}
      </svg>

      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', padding:'130px 36px 60px' }}>
        {/* Logo */}
        <div style={{ marginBottom:24 }}>
          <svg height="22" viewBox="0 0 400 300" fill="none">
            <path d="M182.418 98.2877C204.674 85.5092 233.116 93.1011 245.942 115.276L251.6 129.332C323.197 129.332 366.2 71.528 366.2 0.118558H211.087C185.737 -0.933791 159.785 5.00447 136.171 18.5347C112.33 32.2152 94.1482 51.9092 82.379 74.5347C70.9114 96.7092 56.4261 117.08 38.7722 134.744L35 138.427L38.6968 142.111C56.2753 159.625 70.7605 179.845 82.2281 201.869C83.2088 203.823 84.2651 205.702 85.3967 207.582C123.722 273.805 208.673 296.43 275.139 258.245C278.157 256.516 281.099 254.637 283.966 252.758C331.118 220.811 308.41 147.297 251.299 147.297C248.809 160 241.038 171.576 228.892 178.567C206.636 191.345 178.193 183.753 165.368 161.579C152.542 139.48 160.162 111.141 182.418 98.2877Z" fill={c.hi}/>
          </svg>
        </div>

        <CanariSerif size={42} style={{ color:'#fff', display:'block', marginBottom:14 }}>
          Music that<br/><span style={{ fontStyle:'italic', color:c.hi }}>breathes</span> with<br/>your world.
        </CanariSerif>

        <p style={{ fontSize:15, color:'rgba(255,255,255,0.65)', fontWeight:300, lineHeight:1.65, marginBottom:48, marginTop:12 }}>
          Canari reads the weather, time, and place around you — and serves the version of each song that belongs in this exact moment.
        </p>

        <div style={{ marginTop:'auto' }}>
          {/* Permission card */}
          <div style={{
            background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:18, padding:'18px 18px', marginBottom:12, backdropFilter:'blur(20px)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:c.hi+'22', border:'1px solid '+c.hi+'55', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z" stroke={c.hi} strokeWidth="1.6"/><circle cx="12" cy="9" r="2.5" stroke={c.hi} strokeWidth="1.6"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#fff' }}>Allow location & weather</div>
                <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.55)', marginTop:2, lineHeight:1.5 }}>Used only to choose the right version. Never stored or shared.</div>
              </div>
            </div>
          </div>

          <button style={{
            width:'100%', background:c.hi, color:'#000', border:'none',
            padding:'17px 24px', borderRadius:14, fontSize:15, fontWeight:600,
            fontFamily:'-apple-system,system-ui', letterSpacing:'-.01em',
            boxShadow:`0 20px 40px ${c.glow}, 0 0 0 1px rgba(255,255,255,0.08) inset`,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            Allow & start listening
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0l-4-4m4 4l-4 4" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div style={{ textAlign:'center', marginTop:18, fontSize:12, color:'rgba(255,255,255,0.4)', fontWeight:400 }}>
            Skip for now
          </div>
        </div>
      </div>
    </>
  );
}

// ─── HOME / FOR YOU ────────────────────────────────────────────
function ScreenHome({ ctx='rainy' }) {
  const c = C[ctx];
  const greeting = ctx === 'morning' ? 'Good morning' : ctx === 'night' ? 'Still up' : ctx === 'golden' ? 'Golden hour' : 'Good evening';

  return (
    <>
      <CanariStatusBar/>
      {/* ambient ceiling glow */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:380, background:`radial-gradient(ellipse 100% 80% at 50% 0%, ${c.glow} 0%, transparent 75%)`, zIndex:1 }}/>

      <div style={{ position:'absolute', inset:0, zIndex:2, overflow:'auto' }}>
        {/* Hero */}
        <div style={{ padding:'72px 22px 16px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
            <div>
              <div style={{ fontSize:12, color:c.hi, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:4 }}>{greeting}</div>
              <CanariSerif size={32} style={{ color:'#fff', display:'block' }}>
                Your world is<br/><span style={{ fontStyle:'italic', color:c.hi }}>{c.short.toLowerCase()}.</span>
              </CanariSerif>
            </div>
          </div>
          <ContextPill ctx={ctx}/>
        </div>

        {/* Hero song card */}
        <div style={{ padding:'20px 22px 12px' }}>
          <div style={{ position:'relative', borderRadius:20, overflow:'hidden', background:c.bg, border:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 80% 60% at 30% 30%, ${c.glow} 0%, transparent 65%)` }}/>
            <div style={{ position:'relative', padding:18, display:'flex', gap:14, alignItems:'center' }}>
              <CoverArt ctx={ctx} size={88} radius={12} song="Silver Lining"/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:4 }}>For this moment</div>
                <div style={{ fontSize:18, fontWeight:600, color:'#fff', marginBottom:2, letterSpacing:'-.01em' }}>Silver Lining</div>
                <div style={{ fontSize:12.5, color:'rgba(255,255,255,0.5)', marginBottom:10 }}>Emi Yano</div>
                <div style={{ fontSize:10.5, fontWeight:600, color:c.hi, display:'flex', alignItems:'center', gap:5 }}>
                  <span>{c.emoji}</span><span>{c.name} mix</span>
                </div>
              </div>
              <button style={{ width:44, height:44, borderRadius:'50%', background:c.hi, border:'none', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 10px 24px ${c.glow}` }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Section: For this {context} */}
        <div style={{ padding:'24px 0 8px' }}>
          <div style={{ padding:'0 22px', display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:12 }}>
            <div style={{ fontSize:18, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>Made for {c.short.toLowerCase()}</div>
            <span style={{ fontSize:12, color:c.hi, fontWeight:500 }}>See all</span>
          </div>
          <div style={{ display:'flex', gap:12, padding:'0 22px', overflowX:'auto' }}>
            {[
              { t:'Streetlights & rain', n:'24 songs', col:c },
              { t:'After hours', n:'18 songs', col:C.night },
              { t:'Quiet places', n:'31 songs', col:C.rainy },
              { t:'Listen as it falls', n:'12 songs', col:c },
            ].map((p,i) => (
              <div key={i} style={{ flexShrink:0, width:152 }}>
                <CoverArt ctx={['rainy','night','rainy','golden'][i]} size={152} radius={12} song={p.t}/>
                <div style={{ fontSize:13.5, fontWeight:600, color:'#fff', marginTop:10, letterSpacing:'-.01em' }}>{p.t}</div>
                <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.5)', marginTop:2 }}>{p.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Recently in your world */}
        <div style={{ padding:'24px 22px 8px' }}>
          <div style={{ fontSize:18, fontWeight:600, color:'#fff', marginBottom:14, letterSpacing:'-.01em' }}>Recently in your world</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { t:'Half Light', a:'Mara West', ctx:'morning', ver:'Sunday morning mix' },
              { t:'Long Way Down', a:'Ramble & Cane', ctx:'golden', ver:'Golden hour mix' },
              { t:'Glasshouse', a:'Talia Crowe', ctx:'night', ver:'Late night mix' },
            ].map((s,i)=> (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'4px 0' }}>
                <CoverArt ctx={s.ctx} size={48} radius={8} song={s.t}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{s.t}</div>
                  <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.45)', display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                    <span>{s.a}</span>
                    <span style={{ color:C[s.ctx].hi }}>·</span>
                    <span style={{ color:C[s.ctx].hi }}>{C[s.ctx].emoji} {s.ver}</span>
                  </div>
                </div>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height:170 }}/>
      </div>

      <MiniPlayer ctx={ctx}/>
      <TabBar active="feed"/>
    </>
  );
}

// ─── NOW PLAYING — AMBIENT ─────────────────────────────────────
function ScreenNowPlayingAmbient({ ctx='rainy', playing=true }) {
  const c = C[ctx];
  return (
    <>
      {/* full bg gradient */}
      <div style={{ position:'absolute', inset:0, background:c.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 70% at 50% 20%, ${c.glow} 0%, transparent 70%)`, zIndex:2 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 95%, rgba(0,0,0,0.55) 0%, transparent 60%)', zIndex:3 }}/>

      <CanariStatusBar/>

      {/* close chevron + ctx pill */}
      <div style={{ position:'absolute', top:62, left:0, right:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px' }}>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <ContextPill ctx={ctx}/>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="20" height="6" viewBox="0 0 22 6"><circle cx="3" cy="3" r="2" fill="#fff"/><circle cx="11" cy="3" r="2" fill="#fff"/><circle cx="19" cy="3" r="2" fill="#fff"/></svg>
        </button>
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', padding:'130px 28px 130px' }}>
        {/* Cover */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:36 }}>
          <CoverArt ctx={ctx} size={340} radius={20} song="Silver Lining"/>
        </div>

        {/* Title */}
        <div style={{ marginBottom:24 }}>
          <CanariSerif size={32} style={{ color:'#fff', display:'block' }}>Silver Lining</CanariSerif>
          <div style={{ fontSize:16, color:'rgba(255,255,255,0.55)', marginTop:6, fontWeight:400 }}>Emi Yano</div>
          {/* subtle version pill */}
          <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:11.5, color:c.hi, fontWeight:600, padding:'5px 11px', background:c.hi+'18', border:'1px solid '+c.hi+'40', borderRadius:100, letterSpacing:'.02em' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:c.hi, boxShadow:`0 0 8px ${c.hi}` }}/>
              <span>{c.emoji} {c.name} mix · adapting live</span>
            </div>
            <button style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:500, color:'rgba(255,255,255,0.55)', background:'none', border:'none', padding:'5px 4px', letterSpacing:'.02em' }}>
              Why this version?
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Waveform */}
        <Waveform ctx={ctx} played={0.32} height={42}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(255,255,255,0.4)', fontWeight:500, marginTop:10 }}>
          <span>1:14</span><span>3:47</span>
        </div>

        {/* Controls */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:32, marginTop:32 }}>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5l-9 7 9 7V5z"/><rect x="4" y="5" width="2" height="14" rx="1"/></svg>
          </button>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6l8 6-8 6V6z"/></svg>
          </button>
          <button style={{ width:68, height:68, borderRadius:'50%', background:'#fff', border:'none', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset` }}>
            {playing
              ? <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
              : <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>}
          </button>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6l-8 6 8 6V6z" transform="rotate(180 12 12)"/></svg>
          </button>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l9 7-9 7V5z"/><rect x="18" y="5" width="2" height="14" rx="1"/></svg>
          </button>
        </div>

        {/* Bottom row: share version + context drawer trigger */}
        <div style={{ marginTop:34, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.55)', display:'flex', alignItems:'center', gap:7, fontSize:12.5, fontWeight:500 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 5l-3-3-3 3M8 2v9M3 11v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Share this version
          </button>
          <button style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', display:'flex', alignItems:'center', gap:7, fontSize:11.5, fontWeight:600, padding:'8px 14px', borderRadius:100, backdropFilter:'blur(20px)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 8l4-4 4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Context
          </button>
        </div>
      </div>
    </>
  );
}

// ─── NOW PLAYING — FOREGROUNDED ───────────────────────────────
function ScreenNowPlayingFore({ ctx='rainy', playing=true }) {
  const c = C[ctx];
  const stemNames = Object.keys(c.stems);
  return (
    <>
      <div style={{ position:'absolute', inset:0, background:c.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 70% at 50% 20%, ${c.glow} 0%, transparent 70%)`, zIndex:2 }}/>

      <CanariStatusBar/>

      {/* Top nav */}
      <div style={{ position:'absolute', top:62, left:0, right:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px' }}>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase' }}>Now Playing · Live</div>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="20" height="6" viewBox="0 0 22 6"><circle cx="3" cy="3" r="2" fill="#fff"/><circle cx="11" cy="3" r="2" fill="#fff"/><circle cx="19" cy="3" r="2" fill="#fff"/></svg>
        </button>
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', padding:'120px 22px 50px', overflow:'auto' }}>
        {/* Context receipt */}
        <div style={{
          background:'rgba(255,255,255,0.04)', border:'1px solid '+c.hi+'30',
          borderRadius:14, padding:'12px 14px', marginBottom:18, backdropFilter:'blur(20px)',
          display:'flex', alignItems:'center', gap:12,
        }}>
          <div style={{ width:36, height:36, borderRadius:9, background:c.hi+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{c.emoji}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:700, color:c.hi, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:2 }}>Trigger fired</div>
            <div style={{ fontSize:13, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{c.name} · {c.weatherLine}</div>
            <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.45)', marginTop:1 }}>{c.timeLine} · Portland, OR</div>
          </div>
          <span style={{ fontSize:10, color:c.hi, fontWeight:600 }}>Why?</span>
        </div>

        {/* Compact cover */}
        <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:18 }}>
          <CoverArt ctx={ctx} size={84} radius={11} song="Silver Lining"/>
          <div style={{ flex:1, minWidth:0 }}>
            <CanariSerif size={22} style={{ color:'#fff', display:'block' }}>Silver Lining</CanariSerif>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginTop:3 }}>Emi Yano</div>
            <div style={{ fontSize:10, color:c.hi, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', marginTop:6 }}>{c.emoji} {c.name} mix · v.{ctx==='rainy'?'12':ctx==='morning'?'4':ctx==='night'?'7':'2'}</div>
          </div>
        </div>

        {/* Live stem balance */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:'14px 14px 16px', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase' }}>Live stem balance</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'JetBrains Mono,monospace', display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#6FCF97', boxShadow:'0 0 6px #6FCF97' }}/>
              ADAPTING
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {stemNames.map(name => {
              const v = c.stems[name];
              return (
                <div key={name} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:11.5, fontWeight:500, color:'rgba(255,255,255,0.65)', width:54, fontFamily:'-apple-system' }}>{name}</span>
                  <div style={{ flex:1, height:4, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden', position:'relative' }}>
                    <div style={{ position:'absolute', top:0, left:0, height:'100%', width:`${v}%`, background:c.hi, opacity:.85, transition:'width 1.2s cubic-bezier(.4,0,.2,1)' }}/>
                  </div>
                  <span style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'JetBrains Mono,monospace', width:30, textAlign:'right' }}>{v}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time-travel control */}
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
                  <span style={{ fontSize:9.5, fontWeight:600, color: on ? cc.hi : 'rgba(255,255,255,0.5)', letterSpacing:'.02em' }}>{cc.short}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Waveform + controls */}
        <Waveform ctx={ctx} played={0.32} height={36} count={50}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10.5, color:'rgba(255,255,255,0.4)', fontWeight:500, marginTop:8 }}>
          <span>1:14</span><span>3:47</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:28, marginTop:16 }}>
          <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.65)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5l-9 7 9 7V5z"/><rect x="4" y="5" width="2" height="14" rx="1"/></svg>
          </button>
          <button style={{ width:60, height:60, borderRadius:'50%', background:c.hi, border:'none', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 18px 40px ${c.glow}` }}>
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

Object.assign(window, { ScreenOnboarding, ScreenHome, ScreenNowPlayingAmbient, ScreenNowPlayingFore });
