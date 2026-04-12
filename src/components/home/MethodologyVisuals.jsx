// Color interpolation: Accent (#1EC4F7) → Primary (#0A348A) as phases advance
export function sc(i, n) {
  const t = i / (n - 1);
  const r = Math.round(30  + (10  - 30)  * t);
  const g = Math.round(196 + (52  - 196) * t);
  const b = Math.round(247 + (138 - 247) * t);
  return `rgb(${r},${g},${b})`;
}
export function sca(i, n, a) {
  const t = i / (n - 1);
  const r = Math.round(30  + (10  - 30)  * t);
  const g = Math.round(196 + (52  - 196) * t);
  const b = Math.round(247 + (138 - 247) * t);
  return `rgba(${r},${g},${b},${a})`;
}

// Phase 01 — Target (Understand Goals)
export function V01({ color }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {[72, 54, 36, 18].map((r, i) => (
        <circle key={r} cx="90" cy="90" r={r}
          stroke={color} strokeWidth={i === 3 ? 1.8 : 0.9}
          strokeOpacity={0.18 + i * 0.12}
          style={i === 0 ? {
            transformBox: 'fill-box', transformOrigin: '50% 50%',
            animation: 'meth-outer-pulse 3.2s ease-in-out infinite',
          } : undefined}
        />
      ))}
      <circle cx="90" cy="90" r="5" fill={color}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      {/* Crosshair */}
      {[[90,8,90,68],[90,112,90,172],[8,90,68,90],[112,90,172,90]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />
      ))}
      {/* Corner ticks */}
      {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy],i) => (
        <g key={i} transform={`translate(${90+sx*72},${90+sy*72})`}>
          <line x1="0" y1="0" x2={sx*-10} y2="0" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="0" y1="0" x2="0" y2={sy*-10} stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

// Phase 02 — Radar Sweep (Understand Current State)
export function V02({ color }) {
  const cx = 90, cy = 90, r = 70;
  const wedgePath = `M${cx},${cy} L${cx+r*Math.cos(-Math.PI/5)},${cy+r*Math.sin(-Math.PI/5)} A${r},${r} 0 0,1 ${cx+r*Math.cos(Math.PI/5)},${cy+r*Math.sin(Math.PI/5)} Z`;
  return (
    <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {[25, 46, 68].map((ri, i) => (
        <circle key={ri} cx={cx} cy={cy} r={ri}
          stroke={color} strokeWidth="0.75" strokeOpacity={0.15 + i * 0.08}
          strokeDasharray={i === 0 ? '3 5' : undefined} />
      ))}
      <line x1={cx} y1={cy-70} x2={cx} y2={cy+70} stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1={cx-70} y1={cy} x2={cx+70} y2={cy} stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1={cx-50} y1={cy-50} x2={cx+50} y2={cy+50} stroke={color} strokeWidth="0.5" strokeOpacity="0.08" />
      <line x1={cx+50} y1={cy-50} x2={cx-50} y2={cy+50} stroke={color} strokeWidth="0.5" strokeOpacity="0.08" />
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'meth-spin-slow 4s linear infinite' }}>
        <path d={wedgePath} fill={color} fillOpacity="0.10" />
        <line x1={cx} y1={cy} x2={cx+r} y2={cy} stroke={color} strokeWidth="1.5" strokeOpacity="0.55"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      </g>
      <circle cx={cx} cy={cy} r="4" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      {/* Scattered ping dots */}
      {[[55,52],[130,70],[105,125],[45,115],[120,48]].map(([px,py],i) => (
        <circle key={i} cx={px} cy={py} r="2.5" fill={color} fillOpacity="0.6"
          style={{ animation: `meth-node-light 3s ${i*0.55}s ease-in-out infinite` }} />
      ))}
    </svg>
  );
}

// Phase 03 — Architecture Nodes (Design Visions)
export function V03({ color }) {
  const cx = 90, cy = 90, r = 62;
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    x: cx + r * Math.cos((i * Math.PI * 2) / 6 - Math.PI / 2),
    y: cy + r * Math.sin((i * Math.PI * 2) / 6 - Math.PI / 2),
  }));
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4],[2,5]];
  return (
    <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={color} strokeWidth="0.85" strokeOpacity="0.28"
          strokeDasharray="3 4"
          style={{ animation: `meth-draw-in 0.5s ${i * 0.18}s ease-out both` }}
        />
      ))}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r="7"
          fill={color} fillOpacity="0.08"
          stroke={color} strokeWidth="1.4" strokeOpacity="0.55"
          style={{ animation: `meth-node-light 3.5s ${i * 0.45}s ease-in-out infinite` }} />
      ))}
      <circle cx={cx} cy={cy} r="9" fill={color} fillOpacity="0.15"
        stroke={color} strokeWidth="2" strokeOpacity="0.7"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
}

// Phase 04 — Gantt Bars (Build Recommendations)
export function V04({ color }) {
  const bars = [0.78, 0.52, 0.88, 0.44];
  return (
    <svg viewBox="0 0 180 140" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {bars.map((fill, i) => (
        <g key={i} transform={`translate(10,${16 + i * 30})`}>
          <rect width="158" height="7" rx="3.5" fill={color} fillOpacity="0.07" />
          <rect width={158 * fill} height="7" rx="3.5" fill={color} fillOpacity="0.48"
            style={{ animation: `meth-bar-breathe 2.8s ${i * 0.22}s ease-in-out infinite` }} />
          <circle cx={158 * fill} cy="3.5" r="5" fill={color}
            style={{
              animation: `meth-bar-breathe 2.8s ${i * 0.22}s ease-in-out infinite`,
              filter: `drop-shadow(0 0 4px ${color})`,
            }} />
          <text x="0" y="20" fontSize="7" fill={color} fillOpacity="0.35"
            fontFamily="'Roboto Mono', monospace">
            {['DISCOVERY','ARCHITECTURE','ROADMAP','ROI MODEL'][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Phase 05 — Pipeline (Execute the Roadmap)
export function V05({ color }) {
  const nodeX = [15, 52, 90, 128, 165];
  return (
    <svg viewBox="0 0 180 100" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {/* Connection lines */}
      {nodeX.slice(0, -1).map((x, i) => (
        <line key={i} x1={x + 9} y1="42" x2={nodeX[i + 1] - 9} y2="42"
          stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      ))}
      {/* Nodes */}
      {nodeX.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="42" r="9" fill={color} fillOpacity="0.08"
            stroke={color} strokeWidth="1.4" strokeOpacity="0.45"
            style={{ animation: `meth-node-light 3s ${i * 0.55}s ease-in-out infinite` }} />
          <circle cx={x} cy="42" r="4" fill={color}
            style={{
              animation: `meth-node-light 3s ${i * 0.55}s ease-in-out infinite`,
              filter: `drop-shadow(0 0 5px ${color})`,
            }} />
          <text x={x} y="65" fontSize="6.5" fill={color} fillOpacity="0.38"
            textAnchor="middle" fontFamily="'Roboto Mono', monospace">
            {['PLAN','BUILD','TEST','DEPLOY','ADOPT'][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Phase 06 — Cycle (Governance & Improvement)
export function V06({ color }) {
  const cx = 90, cy = 85, pr = 58;
  const pts = Array.from({ length: 3 }, (_, i) => ({
    x: cx + pr * Math.cos((i * Math.PI * 2) / 3 - Math.PI / 2),
    y: cy + pr * Math.sin((i * Math.PI * 2) / 3 - Math.PI / 2),
  }));
  return (
    <svg viewBox="0 0 180 170" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      <defs>
        <marker id="mArrow" viewBox="0 0 7 7" refX="6" refY="3.5"
          markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill={color} fillOpacity="0.65" />
        </marker>
      </defs>
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'meth-spin-slow 7s linear infinite' }}>
        {pts.map((from, i) => {
          const to = pts[(i + 1) % 3];
          const dx = to.x - from.x, dy = to.y - from.y;
          const len = Math.hypot(dx, dy);
          const ux = dx / len, uy = dy / len;
          const off = 15;
          const mx = (from.x + to.x) / 2 + uy * 18;
          const my = (from.y + to.y) / 2 - ux * 18;
          return (
            <path key={i}
              d={`M${from.x + ux * off},${from.y + uy * off} Q${mx},${my} ${to.x - ux * off},${to.y - uy * off}`}
              stroke={color} strokeWidth="1.6" strokeOpacity="0.55"
              markerEnd="url(#mArrow)"
              style={{ animation: `meth-bar-breathe 2.5s ${i * 0.8}s ease-in-out infinite` }}
            />
          );
        })}
        {pts.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="12"
            fill={color} fillOpacity="0.08"
            stroke={color} strokeWidth="1.4" strokeOpacity="0.55"
            style={{ animation: `meth-node-light 2.5s ${i * 0.8}s ease-in-out infinite` }} />
        ))}
      </g>
      {/* Center cycle icon text */}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="8.5"
        fill={color} fillOpacity="0.4" fontFamily="'Roboto Mono', monospace" letterSpacing="2">
        CONTINUOUS
      </text>
    </svg>
  );
}

export const Visuals = [V01, V02, V03, V04, V05, V06];
