// listener-screens-b.jsx — Context Drawer, Song Detail, Library, Search, Profile

// ─── CONTEXT DRAWER (sheet over Now Playing) ──────────────────
function ScreenContextDrawer({ ctx='rainy' }) {
  const c = C[ctx];
  return (
    <>
      {/* dimmed background — reuses ambient now playing */}
      <div style={{ position:'absolute', inset:0, background:c.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 70% at 50% 20%, ${c.glow} 0%, transparent 70%)`, zIndex:2 }}/>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:3 }}/>

      <CanariStatusBar/>

      {/* Faint preview at top */}
      <div style={{ position:'absolute', top:80, left:0, right:0, padding:'0 28px', zIndex:4, opacity:0.32 }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
          <CoverArt ctx={ctx} size={160} radius={14}/>
        </div>
        <div style={{ textAlign:'center' }}>
          <CanariSerif size={18} style={{ color:'#fff', display:'block' }}>Silver Lining</CanariSerif>
        </div>
      </div>

      {/* The drawer */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, top:340, zIndex:10,
        background:'rgba(20,20,18,0.94)', backdropFilter:'blur(40px) saturate(180%)',
        borderRadius:'28px 28px 0 0',
        border:'1px solid rgba(255,255,255,0.08)',
        boxShadow:`0 -30px 60px rgba(0,0,0,0.6), 0 0 80px ${c.glow}`,
        padding:'14px 22px 50px',
        overflow:'auto',
      }}>
        {/* Drag handle */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
          <div style={{ width:42, height:4.5, borderRadius:100, background:'rgba(255,255,255,0.18)' }}/>
        </div>

        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:c.hi, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:6 }}>This moment</div>
          <CanariSerif size={26} style={{ color:'#fff', display:'block', marginBottom:6 }}>
            Why you're hearing<br/>the <span style={{ fontStyle:'italic', color:c.hi }}>{c.short.toLowerCase()}</span> version.
          </CanariSerif>
        </div>

        {/* Live signals */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:14, marginBottom:12 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Live signals</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <SignalCell label="Weather" val={c.weatherLine.split(' · ')[0]} sub={c.weatherLine.split(' · ')[1]} color={c.hi}/>
            <SignalCell label="Time" val={c.timeLine.split(' · ')[0]} sub={c.timeLine.split(' · ')[1]} color={c.hi}/>
            <SignalCell label="Location" val="Portland, OR" sub="Home · Indoors" color={c.hi}/>
            <SignalCell label="Season" val="Spring" sub="Late · 73d in" color={c.hi}/>
          </div>
        </div>

        {/* Active triggers */}
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>Active triggers</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <TriggerRow icon={c.emoji} title={c.name} sub="Weather · Time · Location" active color={c.hi}/>
            <TriggerRow icon="🌿" title="Reflective mood" sub="Custom tag" active color={c.hi}/>
            <TriggerRow icon="🏙" title="Commute" sub="Location" active={false} color={c.hi}/>
          </div>
        </div>

        {/* What changed */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.1em', textTransform:'uppercase' }}>What changed</div>
            <span style={{ fontSize:10, color:c.hi, fontWeight:600 }}>Last 6m</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:12, color:'rgba(255,255,255,0.7)', fontWeight:400, lineHeight:1.5 }}>
            <ChangeLine time="9:24" dot={c.hi}>Strings pulled forward (+18%)</ChangeLine>
            <ChangeLine time="9:24" dot={c.hi}>Drum bus softened (-22%)</ChangeLine>
            <ChangeLine time="9:18" dot="#6FCF97">Rain started · trigger fired</ChangeLine>
            <ChangeLine time="9:12" dot="rgba(255,255,255,0.3)">Sunday morning version faded out</ChangeLine>
          </div>
        </div>
      </div>
    </>
  );
}

function SignalCell({ label, val, sub, color }) {
  return (
    <div>
      <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.4)', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:5 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:600, color:'#fff', fontFamily:'-apple-system', letterSpacing:'-.01em' }}>{val}</div>
      <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:1 }}>{sub}</div>
    </div>
  );
}
function TriggerRow({ icon, title, sub, active, color }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 12px', borderRadius:10, background: active ? color+'12' : 'rgba(255,255,255,0.025)', border:'1px solid '+(active ? color+'40' : 'rgba(255,255,255,0.05)') }}>
      <div style={{ width:30, height:30, borderRadius:8, background: active ? color+'22' : 'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{title}</div>
        <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.4)', marginTop:1 }}>{sub}</div>
      </div>
      {active && <div style={{ fontSize:9.5, fontWeight:700, color, letterSpacing:'.08em' }}>LIVE</div>}
    </div>
  );
}
function ChangeLine({ time, dot, children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <span style={{ fontSize:10, color:'rgba(255,255,255,0.35)', fontFamily:'JetBrains Mono,monospace', width:28 }}>{time}</span>
      <span style={{ width:5, height:5, borderRadius:'50%', background:dot, flexShrink:0 }}/>
      <span style={{ flex:1, fontSize:12, color:'rgba(255,255,255,0.7)' }}>{children}</span>
    </div>
  );
}

// ─── SONG DETAIL / VERSIONS ───────────────────────────────────
function ScreenSongDetail({ ctx='rainy' }) {
  const c = C[ctx];
  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', inset:0, background:c.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:520, background:`radial-gradient(ellipse 100% 60% at 50% 0%, ${c.glow} 0%, transparent 65%)`, zIndex:2 }}/>

      {/* Nav */}
      <div style={{ position:'absolute', top:62, left:0, right:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px' }}>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none"><path d="M7 1L1 7l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <span style={{ fontSize:12, color:'rgba(255,255,255,0.6)', fontWeight:500 }}>Song</span>
        <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'none', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11 5l-3-3-3 3M8 2v9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:5, overflow:'auto', padding:'120px 22px 180px' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <CoverArt ctx={ctx} size={220} radius={16} song="Silver Lining"/>
        </div>
        <div style={{ textAlign:'center', marginBottom:22 }}>
          <CanariSerif size={30} style={{ color:'#fff', display:'block' }}>Silver Lining</CanariSerif>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.55)', marginTop:6 }}>Emi Yano</div>
          <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.35)', marginTop:6 }}>Album: Halflight · 2025 · 3:47</div>
        </div>

        {/* Action row */}
        <div style={{ display:'flex', gap:8, marginBottom:26 }}>
          <button style={{ flex:1, background:c.hi, color:'#000', border:'none', borderRadius:12, padding:'14px', fontSize:14, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>
            Play current version
          </button>
          <button style={{ width:48, height:48, borderRadius:12, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-7-11a4 4 0 017-2.5A4 4 0 0119 10c0 6.5-7 11-7 11z" stroke="#fff" strokeWidth="1.6"/></svg>
          </button>
        </div>

        {/* Versions you've heard */}
        <div style={{ marginBottom:22 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:12 }}>
            <div style={{ fontSize:16, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>Versions you've heard</div>
            <span style={{ fontSize:11, color:c.hi, fontWeight:500 }}>4 of 7</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { k:'rainy', count:'12 times', last:'Just now', highlight:true },
              { k:'morning', count:'3 times', last:'5 days ago' },
              { k:'night', count:'8 times', last:'Last week' },
              { k:'golden', count:'1 time', last:'2 weeks ago' },
            ].map((v,i) => {
              const vc = C[v.k];
              return (
                <div key={v.k} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'12px 14px', borderRadius:12,
                  background: v.highlight ? vc.hi+'15' : 'rgba(255,255,255,0.03)',
                  border:'1px solid '+(v.highlight ? vc.hi+'40' : 'rgba(255,255,255,0.06)'),
                }}>
                  <div style={{ width:38, height:38, borderRadius:9, background:vc.deep, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, border:'1px solid '+vc.hi+'44' }}>{vc.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:13.5, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{vc.name} mix</span>
                      {v.highlight && <span style={{ fontSize:9, fontWeight:700, color:vc.hi, padding:'2px 6px', borderRadius:4, background:vc.hi+'22', letterSpacing:'.06em' }}>NOW</span>}
                    </div>
                    <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.4)', marginTop:2 }}>{v.count} · last {v.last}</div>
                  </div>
                  <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.45)' }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11 5l-3-3-3 3M8 2v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:10, fontSize:11.5, color:'rgba(255,255,255,0.4)', fontWeight:300, lineHeight:1.6 }}>
            Three versions are still waiting for the right moment — fog, heatwave, deep winter.
          </div>
        </div>

        {/* From the artist */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:18, marginBottom:12 }}>
          <div style={{ fontSize:10, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>From the artist</div>
          <CanariSerif size={18} italic style={{ color:'#fff', display:'block', lineHeight:1.4, marginBottom:10 }}>
            "I wrote this song through three different seasons. I wanted it to know which one it's in."
          </CanariSerif>
          <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.5)' }}>Emi Yano · on Silver Lining</div>
        </div>
      </div>

      <TabBar active="now"/>
    </>
  );
}

// ─── LIBRARY ──────────────────────────────────────────────────
function ScreenLibrary({ ctx='rainy' }) {
  const c = C[ctx];
  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', inset:0, background:C.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:280, background:`radial-gradient(ellipse 60% 80% at 50% 0%, ${c.glow} 0%, transparent 75%)`, zIndex:2 }}/>

      <div style={{ position:'absolute', inset:0, zIndex:5, overflow:'auto', padding:'68px 22px 180px' }}>
        {/* Header */}
        <div style={{ marginBottom:18 }}>
          <CanariSerif size={36} style={{ color:'#fff', display:'block' }}>Library</CanariSerif>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:8, marginBottom:22 }}>
          {['Versions','Songs','Playlists','Artists'].map((t,i) => (
            <div key={t} style={{
              padding:'7px 14px', borderRadius:100, fontSize:12, fontWeight:600,
              background: i===0 ? c.hi+'1f' : 'rgba(255,255,255,0.04)',
              color: i===0 ? c.hi : 'rgba(255,255,255,0.5)',
              border:'1px solid '+(i===0 ? c.hi+'44' : 'rgba(255,255,255,0.06)'),
            }}>{t}</div>
          ))}
        </div>

        {/* Section label */}
        <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:14 }}>Versions you've collected</div>

        {/* Versions list */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {[
            { song:'Silver Lining', artist:'Emi Yano', k:'rainy', n:12 },
            { song:'Half Light', artist:'Mara West', k:'morning', n:6 },
            { song:'Glasshouse', artist:'Talia Crowe', k:'night', n:9 },
            { song:'Long Way Down', artist:'Ramble & Cane', k:'golden', n:2 },
            { song:'Old Door', artist:'Field & Marrow', k:'rainy', n:4 },
            { song:'Distance, slow', artist:'Joren Vale', k:'night', n:7 },
          ].map((row,i) => {
            const cc = C[row.k];
            return (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'4px 0' }}>
                <CoverArt ctx={row.k} size={52} radius={9} song={row.song}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{row.song}</div>
                  <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.45)', display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                    <span>{row.artist}</span>
                    <span style={{ color:cc.hi }}>·</span>
                    <span style={{ color:cc.hi, fontWeight:500 }}>{cc.emoji} {cc.short}</span>
                    <span>·</span>
                    <span>{row.n}×</span>
                  </div>
                </div>
                <button style={{ width:34, height:34, borderRadius:'50%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Memory section */}
        <div style={{ marginTop:34, marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase' }}>Saved moments</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontWeight:300, marginTop:4 }}>Specific mixes from specific moments in your life.</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            { k:'rainy', date:'Mar 14 · 9:24pm', label:'Rainy walk home' },
            { k:'golden', date:'Feb 22 · 6:48pm', label:'Driving back' },
          ].map((m,i) => {
            const cc = C[m.k];
            return (
              <div key={i} style={{ background:cc.bg, border:'1px solid '+cc.hi+'30', borderRadius:14, padding:14, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 80% at 20% 20%, ${cc.glow} 0%, transparent 75%)` }}/>
                <div style={{ position:'relative' }}>
                  <div style={{ fontSize:16, marginBottom:6 }}>{cc.emoji}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#fff', letterSpacing:'-.01em', marginBottom:4 }}>{m.label}</div>
                  <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.45)' }}>{m.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MiniPlayer ctx={ctx}/>
      <TabBar active="library"/>
    </>
  );
}

// ─── SEARCH / BROWSE ──────────────────────────────────────────
function ScreenSearch({ ctx='rainy' }) {
  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', inset:0, background:C.bg, zIndex:1 }}/>

      <div style={{ position:'absolute', inset:0, zIndex:5, overflow:'auto', padding:'68px 22px 180px' }}>
        <div style={{ marginBottom:18 }}>
          <CanariSerif size={36} style={{ color:'#fff', display:'block' }}>Search</CanariSerif>
        </div>

        {/* Search field */}
        <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 14px', marginBottom:24 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8"/><path d="M16 16l4 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span style={{ fontSize:14, color:'rgba(255,255,255,0.4)', fontWeight:400 }}>Songs, artists, moments…</span>
        </div>

        {/* Browse by moment */}
        <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Browse by moment</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:30 }}>
          {[
            { k:'rainy', t:'Rainy', n:'1,240 songs' },
            { k:'morning', t:'Morning', n:'2,180 songs' },
            { k:'night', t:'Late night', n:'1,890 songs' },
            { k:'golden', t:'Golden hour', n:'940 songs' },
          ].map((m,i) => {
            const cc = C[m.k];
            return (
              <div key={i} style={{ aspectRatio:'1', borderRadius:14, background:cc.bg, border:'1px solid '+cc.hi+'22', padding:16, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 100% 80% at 30% 80%, ${cc.glow} 0%, transparent 70%)` }}/>
                <div style={{ position:'relative', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div style={{ fontSize:32 }}>{cc.emoji}</div>
                  <div>
                    <CanariSerif size={20} style={{ color:'#fff', display:'block' }}>{m.t}</CanariSerif>
                    <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.45)', marginTop:3 }}>{m.n}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Browse by activity */}
        <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Made for activities</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:30 }}>
          {[
            { e:'🏃', t:'Running', n:'546 songs' },
            { e:'☕', t:'Slow morning', n:'380 songs' },
            { e:'🚗', t:'Long drive', n:'612 songs' },
            { e:'💤', t:'Falling asleep', n:'241 songs' },
            { e:'🎉', t:'Friends over', n:'330 songs' },
          ].map((m,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize:22 }}>{m.e}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#fff' }}>{m.t}</div>
                <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.4)', marginTop:2 }}>{m.n}</div>
              </div>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          ))}
        </div>

        {/* Recently searched */}
        <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Recent</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {['Emi Yano','rainy walks','Joren Vale','Slow piano','Glasshouse'].map(t => (
            <div key={t} style={{ padding:'7px 13px', borderRadius:100, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', fontSize:12, color:'rgba(255,255,255,0.7)' }}>{t}</div>
          ))}
        </div>
      </div>

      <MiniPlayer ctx={ctx}/>
      <TabBar active="search"/>
    </>
  );
}

// ─── PROFILE / SETTINGS ───────────────────────────────────────
function ScreenProfile({ ctx='rainy' }) {
  const c = C[ctx];
  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', inset:0, background:C.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:340, background:`radial-gradient(ellipse 90% 60% at 50% 0%, ${c.glow} 0%, transparent 70%)`, zIndex:2 }}/>

      <div style={{ position:'absolute', inset:0, zIndex:5, overflow:'auto', padding:'68px 22px 180px' }}>
        {/* User card */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:c.bg, border:'1px solid '+c.hi+'55', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"DM Serif Display"', fontSize:24, color:c.hi }}>LJ</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>Luke J.</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:2 }}>Listening since May 2026</div>
          </div>
          <button style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', color:'#fff' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ margin:'0 auto', display:'block' }}><circle cx="8" cy="8" r="5.5" stroke="#fff" strokeWidth="1.4"/><circle cx="8" cy="6" r="0.7" fill="#fff"/><circle cx="8" cy="8" r="0.7" fill="#fff"/><circle cx="8" cy="10" r="0.7" fill="#fff"/></svg>
          </button>
        </div>

        {/* Listening stats */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:14, marginBottom:22 }}>
          <div style={{ fontSize:10, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Your year so far</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            <Stat n="847" l="songs"/>
            <Stat n="62" l="versions"/>
            <Stat n="14" l="moments saved"/>
          </div>
          <div style={{ marginTop:14, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.05)', fontSize:11.5, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>
            You hear <span style={{ color:c.hi, fontWeight:600 }}>{c.emoji} Rainy</span> versions most. Your peak listening hours are 9–11pm.
          </div>
        </div>

        {/* Settings groups */}
        <SettingsGroup label="Context engine">
          <SettingRow icon="📍" title="Location" detail="On · Approximate" color={c.hi}/>
          <SettingRow icon="🌤" title="Weather" detail="Live · OpenWeather" color={c.hi}/>
          <SettingRow icon="🕐" title="Time & season" detail="Auto" color={c.hi}/>
          <SettingRow icon="🌱" title="Mood signals" detail="Learning" color={c.hi} last/>
        </SettingsGroup>

        <SettingsGroup label="Playback">
          <SettingRow icon="🎚" title="Adaptation speed" detail="Smooth · 6s blend" color={c.hi}/>
          <SettingRow icon="🎧" title="Audio quality" detail="Lossless" color={c.hi}/>
          <SettingRow icon="✨" title="Show version receipts" detail="Always" color={c.hi} last/>
        </SettingsGroup>

        <SettingsGroup label="Account">
          <SettingRow icon="👤" title="Account" detail="" color={c.hi}/>
          <SettingRow icon="🔒" title="Privacy & data" detail="" color={c.hi}/>
          <SettingRow icon="📜" title="About Canari" detail="v0.4 · Private beta" color={c.hi} last/>
        </SettingsGroup>
      </div>

      <MiniPlayer ctx={ctx}/>
      <TabBar active="profile"/>
    </>
  );
}
function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily:'"DM Serif Display",serif', fontSize:28, color:'#fff', lineHeight:1 }}>{n}</div>
      <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.4)', marginTop:4, fontWeight:500 }}>{l}</div>
    </div>
  );
}
function SettingsGroup({ label, children }) {
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ fontSize:10.5, fontWeight:600, color:'rgba(255,255,255,0.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8, paddingLeft:6 }}>{label}</div>
      <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden' }}>
        {children}
      </div>
    </div>
  );
}
function SettingRow({ icon, title, detail, color, last }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px', borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ width:30, height:30, borderRadius:8, background:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>{icon}</div>
      <div style={{ flex:1, fontSize:14, fontWeight:500, color:'#fff', letterSpacing:'-.01em' }}>{title}</div>
      {detail && <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.4)' }}>{detail}</div>}
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  );
}

Object.assign(window, { ScreenContextDrawer, ScreenSongDetail, ScreenLibrary, ScreenSearch, ScreenProfile });
