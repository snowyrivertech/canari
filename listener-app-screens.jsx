// listener-app-screens.jsx — interactive screens for the live prototype

// Song catalog — mirrors what Studio would publish
const SONGS = [
  { id:'silver',  title:'Silver Lining',   artist:'Emi Yano',          ctx:'rainy',   dur:227, album:'Halflight' },
  { id:'half',    title:'Half Light',      artist:'Mara West',         ctx:'morning', dur:184, album:'Carry' },
  { id:'glass',   title:'Glasshouse',      artist:'Talia Crowe',       ctx:'night',   dur:241, album:'Glasshouse' },
  { id:'long',    title:'Long Way Down',   artist:'Ramble & Cane',     ctx:'golden',  dur:312, album:'After Hours' },
  { id:'door',    title:'Old Door',        artist:'Field & Marrow',    ctx:'rainy',   dur:198, album:'Field Recordings' },
  { id:'distance',title:'Distance, slow',  artist:'Joren Vale',        ctx:'night',   dur:268, album:'Late Bloom' },
];

// ─── FEED SCREEN ────────────────────────────────────────────────
function FeedScreen({ ctx, onPlay, currentSongIdx }) {
  const c = C[ctx];
  const greeting = ctx === 'morning' ? 'Good morning' : ctx === 'night' ? 'Still up' : ctx === 'golden' ? 'Golden hour' : 'Good evening';

  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:380, background:`radial-gradient(ellipse 100% 80% at 50% 0%, ${c.glow} 0%, transparent 75%)`, zIndex:1 }}/>

      <div style={{ position:'absolute', inset:0, zIndex:2, overflow:'auto', WebkitOverflowScrolling:'touch' }}>
        <div style={{ padding:'72px 22px 16px' }}>
          <div style={{ fontSize:12, color:c.hi, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:4 }}>{greeting}</div>
          <CanariSerif size={32} style={{ color:'#fff', display:'block', marginBottom:14 }}>
            Your world is<br/><span style={{ fontStyle:'italic', color:c.hi }}>{c.short.toLowerCase()}.</span>
          </CanariSerif>
          <ContextPill ctx={ctx}/>
        </div>

        {/* Hero "play this now" card */}
        <div style={{ padding:'18px 22px 14px' }}>
          <div onClick={() => onPlay(0)} style={{ cursor:'pointer', position:'relative', borderRadius:18, overflow:'hidden', background:c.bg, border:'1px solid '+c.hi+'30' }}>
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 80% 60% at 30% 30%, ${c.glow} 0%, transparent 65%)` }}/>
            <div style={{ position:'relative', padding:18, display:'flex', gap:14, alignItems:'center' }}>
              <CoverArt ctx={ctx} size={84} radius={12}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:4 }}>For this moment</div>
                <div style={{ fontSize:17, fontWeight:600, color:'#fff', marginBottom:2, letterSpacing:'-.01em' }}>Silver Lining</div>
                <div style={{ fontSize:12.5, color:'rgba(255,255,255,0.55)', marginBottom:8 }}>Emi Yano</div>
                <div style={{ fontSize:10.5, fontWeight:600, color:c.hi, display:'flex', alignItems:'center', gap:5 }}>
                  <span>{c.emoji}</span><span>{c.name} mix</span>
                </div>
              </div>
              <button style={{ width:44, height:44, borderRadius:'50%', background:c.hi, border:'none', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 10px 24px ${c.glow}` }}
                onClick={(e) => { e.stopPropagation(); onPlay(0); }} aria-label="Play">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3l8 5-8 5V3z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* For this context */}
        <div style={{ padding:'22px 0 6px' }}>
          <SectionHead title={`Made for ${c.short.toLowerCase()}`} accent={c.hi}/>
          <div style={{ display:'flex', gap:12, padding:'0 22px', overflowX:'auto' }}>
            {[
              { song:0, t:'Streetlights & rain', n:'24 songs', k:'rainy' },
              { song:2, t:'After hours', n:'18 songs', k:'night' },
              { song:4, t:'Quiet places', n:'31 songs', k:'rainy' },
              { song:3, t:'Listen as it falls', n:'12 songs', k:'golden' },
            ].map((p,i) => (
              <div key={i} style={{ flexShrink:0, width:148, cursor:'pointer' }} onClick={() => onPlay(p.song)}>
                <CoverArt ctx={p.k} size={148} radius={12}/>
                <div style={{ fontSize:13.5, fontWeight:600, color:'#fff', marginTop:10, letterSpacing:'-.01em' }}>{p.t}</div>
                <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.5)', marginTop:2 }}>{p.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently in your world */}
        <div style={{ padding:'22px 22px 8px' }}>
          <SectionHead title="Recently in your world" accent={c.hi} noPadding/>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:4 }}>
            {SONGS.map((s, i) => i !== 0 && (
              <SongRow key={s.id} song={s} onPlay={() => onPlay(i)} active={currentSongIdx === i}/>
            )).filter(Boolean)}
          </div>
        </div>

        <div style={{ height:200 }}/>
      </div>
    </>
  );
}

function SectionHead({ title, accent, noPadding }) {
  return (
    <div style={{ padding: noPadding ? '0' : '0 22px', display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:12 }}>
      <div style={{ fontSize:17, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>{title}</div>
      <span style={{ fontSize:11.5, color:accent, fontWeight:500 }}>See all</span>
    </div>
  );
}

function SongRow({ song, onPlay, active }) {
  const c = C[song.ctx];
  return (
    <div onClick={onPlay} style={{ display:'flex', alignItems:'center', gap:12, padding:'4px 0', cursor:'pointer' }}>
      <CoverArt ctx={song.ctx} size={48} radius={8}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:14, fontWeight:600, color: active ? c.hi : '#fff', letterSpacing:'-.01em' }}>{song.title}</div>
        <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.45)', display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
          <span>{song.artist}</span>
          <span style={{ color:c.hi }}>·</span>
          <span style={{ color:c.hi, fontWeight:500 }}>{c.emoji} {c.short}</span>
        </div>
      </div>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  );
}

// ─── SEARCH SCREEN ──────────────────────────────────────────────
function SearchScreen({ ctx, onPlay }) {
  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', inset:0, background:C.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', inset:0, zIndex:5, overflow:'auto', padding:'68px 22px 200px' }}>
        <CanariSerif size={36} style={{ color:'#fff', display:'block', marginBottom:18 }}>Search</CanariSerif>

        <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 14px', marginBottom:24 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8"/><path d="M16 16l4 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span style={{ fontSize:14, color:'rgba(255,255,255,0.4)', fontWeight:400 }}>Songs, artists, moments…</span>
        </div>

        <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Browse by moment</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
          {[
            { k:'rainy', t:'Rainy', n:'1,240 songs', s:0 },
            { k:'morning', t:'Morning', n:'2,180 songs', s:1 },
            { k:'night', t:'Late night', n:'1,890 songs', s:2 },
            { k:'golden', t:'Golden hour', n:'940 songs', s:3 },
          ].map((m,i) => {
            const cc = C[m.k];
            return (
              <div key={i} onClick={() => onPlay(m.s)} style={{ aspectRatio:'1', borderRadius:14, background:cc.bg, border:'1px solid '+cc.hi+'22', padding:16, position:'relative', overflow:'hidden', cursor:'pointer' }}>
                <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 100% 80% at 30% 80%, ${cc.glow} 0%, transparent 70%)` }}/>
                <div style={{ position:'relative', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div style={{ fontSize:30 }}>{cc.emoji}</div>
                  <div>
                    <CanariSerif size={20} style={{ color:'#fff', display:'block' }}>{m.t}</CanariSerif>
                    <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.45)', marginTop:3 }}>{m.n}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Recent</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {['Emi Yano','rainy walks','Joren Vale','Slow piano','Glasshouse'].map(t => (
            <div key={t} style={{ padding:'7px 13px', borderRadius:100, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', fontSize:12, color:'rgba(255,255,255,0.7)' }}>{t}</div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── LIBRARY SCREEN ─────────────────────────────────────────────
function LibraryScreen({ ctx, onPlay, currentSongIdx }) {
  const c = C[ctx];
  const [tab, setTab] = React.useState('versions');
  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', inset:0, background:C.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:280, background:`radial-gradient(ellipse 60% 80% at 50% 0%, ${c.glow} 0%, transparent 75%)`, zIndex:2 }}/>
      <div style={{ position:'absolute', inset:0, zIndex:5, overflow:'auto', padding:'68px 22px 200px' }}>
        <CanariSerif size={36} style={{ color:'#fff', display:'block', marginBottom:18 }}>Library</CanariSerif>

        <div style={{ display:'flex', gap:8, marginBottom:22 }}>
          {[['versions','Versions'],['songs','Songs'],['playlists','Playlists'],['artists','Artists']].map(([k,label]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding:'7px 14px', borderRadius:100, fontSize:12, fontWeight:600,
              background: k===tab ? c.hi+'1f' : 'rgba(255,255,255,0.04)',
              color: k===tab ? c.hi : 'rgba(255,255,255,0.5)',
              border:'1px solid '+(k===tab ? c.hi+'44' : 'rgba(255,255,255,0.06)'),
              fontFamily:'-apple-system,system-ui', cursor:'pointer',
            }}>{label}</button>
          ))}
        </div>

        <div style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:14 }}>Versions you've collected</div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {SONGS.map((s, i) => (
            <SongRow key={s.id} song={s} onPlay={() => onPlay(i)} active={currentSongIdx === i}/>
          ))}
        </div>

        <div style={{ marginTop:30, marginBottom:14 }}>
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
    </>
  );
}

// ─── PROFILE SCREEN ─────────────────────────────────────────────
function ProfileScreen({ ctx }) {
  const c = C[ctx];
  return (
    <>
      <CanariStatusBar/>
      <div style={{ position:'absolute', inset:0, background:C.bg, zIndex:1 }}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:340, background:`radial-gradient(ellipse 90% 60% at 50% 0%, ${c.glow} 0%, transparent 70%)`, zIndex:2 }}/>
      <div style={{ position:'absolute', inset:0, zIndex:5, overflow:'auto', padding:'68px 22px 200px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:c.bg, border:'1px solid '+c.hi+'55', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"DM Serif Display"', fontSize:24, color:c.hi }}>LJ</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:600, color:'#fff', letterSpacing:'-.01em' }}>Luke J.</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:2 }}>Listening since May 2026</div>
          </div>
        </div>

        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:16, marginBottom:22 }}>
          <div style={{ fontSize:10, fontWeight:700, color:c.hi, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Your year so far</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            <ProfStat n="847" l="songs"/>
            <ProfStat n="62" l="versions"/>
            <ProfStat n="14" l="moments"/>
          </div>
          <div style={{ marginTop:14, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.05)', fontSize:11.5, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>
            You hear <span style={{ color:c.hi, fontWeight:600 }}>{c.emoji} {c.short}</span> versions most. Your peak listening hours are 9–11pm.
          </div>
        </div>

        <ProfGroup label="Context engine">
          <ProfRow icon="📍" title="Location" detail="On · Approximate"/>
          <ProfRow icon="🌤" title="Weather" detail="Live · OpenWeather"/>
          <ProfRow icon="🕐" title="Time & season" detail="Auto"/>
          <ProfRow icon="🌱" title="Mood signals" detail="Learning" last/>
        </ProfGroup>

        <ProfGroup label="Account">
          <ProfRow icon="👤" title="Account"/>
          <ProfRow icon="🔒" title="Privacy & data"/>
          <ProfRow icon="📜" title="About Canari" detail="v0.4 · Private beta" last/>
        </ProfGroup>
      </div>
    </>
  );
}
function ProfStat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily:'"DM Serif Display",serif', fontSize:28, color:'#fff', lineHeight:1 }}>{n}</div>
      <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.4)', marginTop:4, fontWeight:500 }}>{l}</div>
    </div>
  );
}
function ProfGroup({ label, children }) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ fontSize:10.5, fontWeight:600, color:'rgba(255,255,255,0.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8, paddingLeft:6 }}>{label}</div>
      <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden' }}>
        {children}
      </div>
    </div>
  );
}
function ProfRow({ icon, title, detail, last }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px', borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ width:30, height:30, borderRadius:8, background:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>{icon}</div>
      <div style={{ flex:1, fontSize:14, fontWeight:500, color:'#fff', letterSpacing:'-.01em' }}>{title}</div>
      {detail && <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.4)' }}>{detail}</div>}
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  );
}

Object.assign(window, { SONGS, FeedScreen, SearchScreen, LibraryScreen, ProfileScreen, SongRow, SectionHead });
