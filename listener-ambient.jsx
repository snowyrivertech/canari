// listener-ambient.jsx — context-aware ambient animation layer inside the phone
// Rain streaks, sun dust, late-night stars, golden motes — each tuned to the live trigger.

function AmbientLayer({ ctx, width = 402, height = 872 }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    const cx = canvas.getContext('2d');
    cx.scale(dpr, dpr);

    // Build particles for the active context
    let particles = makeParticles(ctx, width, height);
    let t = 0;
    let raf;

    function tick() {
      cx.clearRect(0, 0, width, height);
      t += 0.012;
      drawParticles(cx, particles, ctx, t, width, height);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ctx, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:'absolute', top:0, left:0,
        width:width+'px', height:height+'px',
        zIndex:0, pointerEvents:'none',
        opacity:0, animation:'canariAmbientIn 1.2s .15s ease both',
      }}
    />
  );
}

function makeParticles(mode, W, H) {
  if (mode === 'rainy') {
    return Array.from({length:90}, () => ({
      x: Math.random()*W,
      y: Math.random()*H - 100,
      len: 10 + Math.random()*22,
      speed: 2.2 + Math.random()*4.2,
      opacity: 0.08 + Math.random()*0.28,
    }));
  }
  if (mode === 'morning') {
    return Array.from({length:42}, () => ({
      x: Math.random()*W,
      y: Math.random()*H,
      r: 1 + Math.random()*2.6,
      baseOpacity: 0.18 + Math.random()*0.35,
      vx: -0.04 + Math.random()*0.08,
      vy: -0.02 - Math.random()*0.05,
      phase: Math.random()*Math.PI*2,
      gold: Math.random() > 0.35,
    }));
  }
  if (mode === 'night') {
    return Array.from({length:22}, () => ({
      x: Math.random()*W,
      y: Math.random()*H,
      r: 0.6 + Math.random()*1.7,
      baseOpacity: 0.22 + Math.random()*0.45,
      phase: Math.random()*Math.PI*2,
      twinkle: 0.35 + Math.random()*0.7,
      bright: Math.random() > 0.7,
    }));
  }
  // golden
  return Array.from({length:36}, () => ({
    x: Math.random()*W,
    y: Math.random()*H,
    r: 1 + Math.random()*2.2,
    baseOpacity: 0.18 + Math.random()*0.38,
    vx: 0.08 + Math.random()*0.18,
    vy: -0.015 + Math.random()*0.05,
    phase: Math.random()*Math.PI*2,
    gold: Math.random() > 0.3,
  }));
}

function drawParticles(cx, particles, mode, t, W, H) {
  if (mode === 'rainy') {
    cx.lineWidth = 0.9;
    particles.forEach(p => {
      cx.strokeStyle = `rgba(180,205,235,${p.opacity})`;
      cx.beginPath();
      // slight diagonal — like wind-blown rain
      cx.moveTo(p.x, p.y);
      cx.lineTo(p.x + 2, p.y + p.len);
      cx.stroke();
      p.y += p.speed;
      p.x += 0.25;
      if (p.y > H + 12) {
        p.y = -18 - Math.random()*30;
        p.x = Math.random()*W;
      }
      if (p.x > W + 4) p.x -= W + 8;
    });
    // Occasional splash blip near bottom
    cx.fillStyle = 'rgba(180,205,235,0.10)';
    for (let i = 0; i < 4; i++) {
      const sx = (Math.sin(t*0.9 + i*1.3) * 0.5 + 0.5) * W;
      const sy = H - 30 + Math.sin(t*1.6 + i)*8;
      cx.beginPath();
      cx.arc(sx, sy, 1.2 + Math.abs(Math.sin(t*2 + i))*0.8, 0, Math.PI*2);
      cx.fill();
    }
    return;
  }
  if (mode === 'morning') {
    particles.forEach(p => {
      const op = p.baseOpacity * (0.65 + 0.35*Math.sin(t*1.4 + p.phase));
      cx.fillStyle = p.gold ? `rgba(245,166,35,${op})` : `rgba(255,235,185,${op*0.75})`;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      cx.fill();
      // soft glow for brighter ones
      if (p.gold && p.r > 1.8) {
        cx.fillStyle = `rgba(245,166,35,${op*0.18})`;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r*3.2, 0, Math.PI*2);
        cx.fill();
      }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -8) p.x = W + 8;
      if (p.x > W + 8) p.x = -8;
      if (p.y < -8) p.y = H + 8;
    });
    return;
  }
  if (mode === 'night') {
    particles.forEach(p => {
      const op = p.baseOpacity * (0.35 + 0.65*Math.abs(Math.sin(t*p.twinkle + p.phase)));
      cx.fillStyle = `rgba(225,215,245,${op})`;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      cx.fill();
      if (p.bright) {
        // Soft halo
        cx.fillStyle = `rgba(157,123,212,${op*0.22})`;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r*3.5, 0, Math.PI*2);
        cx.fill();
        // 4-point sparkle on the brightest moments
        if (op > 0.55) {
          cx.strokeStyle = `rgba(255,255,255,${op*0.4})`;
          cx.lineWidth = 0.6;
          cx.beginPath();
          cx.moveTo(p.x - p.r*3, p.y); cx.lineTo(p.x + p.r*3, p.y);
          cx.moveTo(p.x, p.y - p.r*3); cx.lineTo(p.x, p.y + p.r*3);
          cx.stroke();
        }
      }
    });
    return;
  }
  // golden — warm motes drifting right with subtle vertical wobble
  particles.forEach(p => {
    const op = p.baseOpacity * (0.65 + 0.35*Math.sin(t*1.1 + p.phase));
    cx.fillStyle = p.gold ? `rgba(216,128,96,${op})` : `rgba(245,166,35,${op*0.85})`;
    cx.beginPath();
    cx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    cx.fill();
    if (p.r > 1.8) {
      cx.fillStyle = `rgba(216,128,96,${op*0.18})`;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r*3.2, 0, Math.PI*2);
      cx.fill();
    }
    p.x += p.vx;
    p.y += p.vy + Math.sin(t*0.8 + p.phase)*0.03;
    if (p.x > W + 8) p.x = -8;
    if (p.y > H + 8) p.y = -8;
    if (p.y < -8) p.y = H + 8;
  });
}

Object.assign(window, { AmbientLayer });
