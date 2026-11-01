import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

/**
 * 全站插画。全部是手绘 SVG，无位图、无外部依赖。
 * 配色来自 site.css 里的 --il-* 变量，统一调整一处即可。
 *
 * 画法约定：等距（2:1）视角，面分三档明暗（上/左/右），琥珀色只用作"设备指示灯"。
 */

const c = {
  deep: "var(--il-deep)",
  blue: "var(--il-blue)",
  mid: "var(--il-mid)",
  light: "var(--il-light)",
  mist: "var(--il-mist)",
  amber: "var(--il-amber)",
  ink: "var(--il-ink)",
};

type Faces = { top: string; left: string; right: string };

/** 六层技术栈的配色：自下而上由深到浅。首页塔、课程图标共用。 */
export const layerFaces: (Faces & { onTop: string })[] = [
  { top: "#2B4FB8", left: "#1D3A8F", right: "#162E73", onTop: "#FFFFFF" },
  { top: "#2F5FDB", left: "#2249B0", right: "#1B3C93", onTop: "#FFFFFF" },
  { top: "#3C73F5", left: "#2C5ED0", right: "#234FB0", onTop: "#FFFFFF" },
  { top: "#5A8CFF", left: "#4272E0", right: "#3361C4", onTop: "#0D1B34" },
  { top: "#86AEFF", left: "#6C96EE", right: "#5882D6", onTop: "#0D1B34" },
  { top: "#B5CFFF", left: "#9DBBF5", right: "#86A8E6", onTop: "#0D1B34" },
];

/** 等距板块：cx,cy 为顶面中心，w 为顶面半宽，t 为厚度。 */
function Iso({ cx, cy, w, t, faces }: { cx: number; cy: number; w: number; t: number; faces: Faces }) {
  const h = w / 2;
  return (
    <g>
      <path d={`M${cx - w} ${cy}L${cx} ${cy + h}L${cx} ${cy + h + t}L${cx - w} ${cy + t}Z`} fill={faces.left} />
      <path d={`M${cx} ${cy + h}L${cx + w} ${cy}L${cx + w} ${cy + t}L${cx} ${cy + h + t}Z`} fill={faces.right} />
      <path d={`M${cx - w} ${cy}L${cx} ${cy - h}L${cx + w} ${cy}L${cx} ${cy + h}Z`} fill={faces.top} />
    </g>
  );
}

const blueFaces: Faces = { top: c.mid, left: c.blue, right: c.deep };
const deepFaces: Faces = { top: c.blue, left: c.deep, right: "#0E2260" };
const mistFaces: Faces = { top: "#F2F7FF", left: c.mist, right: c.light };

/** 云：以 (x,y) 为原点，s=1 时约 186×98。 */
function Cloud({ x = 0, y = 0, s = 1, fill }: { x?: number; y?: number; s?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <circle cx={-62} cy={12} r={30} />
      <circle cx={-22} cy={-14} r={42} />
      <circle cx={30} cy={-6} r={36} />
      <circle cx={68} cy={16} r={26} />
      <rect x={-62} y={12} width={130} height={30} />
    </g>
  );
}

/* ───────────── 首页：六层技术栈 ───────────── */

export function HeroStack({
  layers,
  onSelect,
}: {
  layers: { id: string; name: string }[];
  onSelect: (id: string) => void;
}) {
  const cx = 290;
  const w = 150;
  const t = 24;
  const step = 52;
  const base = 520;
  const h = w / 2;
  const topCy = base - (layers.length - 1) * step;

  return (
    <svg
      viewBox="0 0 620 660"
      className="hero-stack"
      role="group"
      aria-label="云计算六层技术栈示意图，自下而上依次为：虚拟化技术、私有云架构、云网络技术、容器编排、云安全、云运维与监控。点击任一层可查看对应课程。"
    >
      <defs>
        <radialGradient id="hsShadow">
          <stop offset="0" stopColor="#0D1B34" stopOpacity="0.26" />
          <stop offset="1" stopColor="#0D1B34" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hsCloud" gradientUnits="userSpaceOnUse" x1="0" y1="-56" x2="0" y2="42">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DDE9FF" />
        </linearGradient>
      </defs>

      <ellipse cx={cx} cy={base + h + t + 16} rx={206} ry={46} fill="url(#hsShadow)" />

      {layers.map((layer, i) => {
        const cy = base - i * step;
        const f = layerFaces[i];
        const edgeLeft = (k: number, v: number) => ({ x: cx - w + k * w, y: cy + k * h + v });
        const edgeRight = (k: number) => ({ x: cx + k * w, y: cy + h - k * h });
        const stripeA = edgeLeft(0.3, t / 2);
        const stripeB = edgeLeft(0.9, t / 2);
        const led1 = edgeLeft(0.1, t / 2);
        const led2 = edgeLeft(0.18, t / 2);
        const inset = 0.8;
        return (
          <g
            key={layer.id}
            className="hs-layer"
            style={{ "--i": i } as CSSProperties}
            tabIndex={0}
            role="link"
            aria-label={`${layer.name}，查看对应课程`}
            onClick={() => onSelect(layer.id)}
            onKeyDown={(e: KeyboardEvent<SVGGElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(layer.id);
              }
            }}
          >
            <g className="hs-lift">
              <Iso cx={cx} cy={cy} w={w} t={t} faces={f} />
              {/* 顶面玻璃板内框 */}
              <path
                d={`M${cx - w * inset} ${cy}L${cx} ${cy - h * inset}L${cx + w * inset} ${cy}L${cx} ${cy + h * inset}Z`}
                fill="none"
                stroke="#fff"
                strokeOpacity="0.38"
                strokeWidth="1.5"
              />
              {/* 左面：硬盘槽 + 指示灯 */}
              <line x1={stripeA.x} y1={stripeA.y} x2={stripeB.x} y2={stripeB.y} stroke="#fff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
              <circle cx={led1.x} cy={led1.y} r="2.6" fill={c.amber} />
              <circle cx={led2.x} cy={led2.y} r="2.2" fill="#fff" fillOpacity="0.7" />
              {/* 右面：散热孔 */}
              {[0.28, 0.42, 0.56].map((k) => {
                const p = edgeRight(k);
                return <line key={k} x1={p.x} y1={p.y + 6} x2={p.x} y2={p.y + t - 6} stroke="#000" strokeOpacity="0.2" strokeWidth="2.4" strokeLinecap="round" />;
              })}
              {/* 引线与标签 */}
              <circle cx={cx + w + 10} cy={cy + t / 2} r="3.6" fill={f.top} />
              <line x1={cx + w + 14} y1={cy + t / 2} x2={cx + w + 36} y2={cy + t / 2} stroke={c.ink} strokeOpacity="0.28" strokeWidth="1.5" />
              <text className="hs-label" x={cx + w + 44} y={cy + t / 2 + 6}>
                {layer.name}
              </text>
            </g>
          </g>
        );
      })}

      {/* 云端向底座传输数据 */}
      <g className="hs-cloud-wrap">
        {[250, 290, 330].map((x) => (
          <line key={x} className="hs-beam" x1={x} y1={168} x2={x} y2={topCy - 12} stroke={c.amber} strokeWidth="2.6" strokeLinecap="round" />
        ))}
        <g transform="translate(290 116)">
          <g className="hs-cloud">
            <g className="hs-cloud-shadow">
              <Cloud fill="url(#hsCloud)" />
              <g stroke={c.mid} strokeWidth="2.2" strokeLinecap="round" fill="none">
                <path d="M-30 12L0 -10L30 14M-30 12L30 14" />
              </g>
              <circle cx={-30} cy={12} r="5" fill={c.blue} />
              <circle cx={30} cy={14} r="5" fill={c.blue} />
              <circle cx={0} cy={-10} r="6" fill={c.amber} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ───────────── 课程：「你在栈的第几层」图标 ───────────── */

export function LayerIcon({ index, total }: { index: number; total: number }) {
  const w = 30;
  const t = 6;
  const step = 9;
  const base = 60;
  return (
    <svg viewBox="0 -2 80 86" className="layer-icon" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const cy = base - i * step;
        const active = i === index;
        return <Iso key={i} cx={40} cy={cy} w={w} t={t} faces={active ? layerFaces[i] : { top: "#E8F0FD", left: "#D3DFF3", right: "#C2D1EA" }} />;
      })}
      {(() => {
        const cy = base - index * step;
        return <circle cx={40 - w + 0.1 * w} cy={cy + 0.1 * (w / 2) + t / 2} r="1.8" fill={c.amber} />;
      })()}
    </svg>
  );
}

/* ───────────── 专业定位：四幅小插画 ───────────── */

export function IlluCloudNative() {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <ellipse cx="80" cy="104" rx="52" ry="7" fill={c.ink} fillOpacity="0.08" />
      <Cloud x={80} y={52} s={0.78} fill="#fff" />
      <Iso cx={62} cy={66} w={15} t={14} faces={deepFaces} />
      <Iso cx={92} cy={66} w={15} t={14} faces={blueFaces} />
      <Iso cx={77} cy={52} w={15} t={14} faces={{ top: c.amber, left: "#E9792A", right: "#C8611B" }} />
    </svg>
  );
}

export function IlluPlatform() {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <ellipse cx="80" cy="110" rx="56" ry="7" fill={c.ink} fillOpacity="0.08" />
      {[0, 1, 2].map((i) => {
        const cy = 76 - i * 22;
        const f = layerFaces[i + 1];
        return (
          <g key={i}>
            <Iso cx={80} cy={cy} w={46} t={14} faces={f} />
            <circle cx={80 - 46 + 5} cy={cy + 2.5 + 7} r="2.2" fill={c.amber} />
            <line x1={80 - 46 + 15} y1={cy + 7.5 + 7} x2={80 - 12} y2={cy + 17 + 7} stroke="#fff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

export function IlluDistributed() {
  const nodes = [
    [80, 24],
    [128, 58],
    [112, 100],
    [48, 100],
    [32, 58],
  ];
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <g stroke={c.light} strokeWidth="2.2" strokeLinecap="round">
        {nodes.map(([x, y]) => (
          <line key={`${x}-${y}`} x1={80} y1={62} x2={x} y2={y} />
        ))}
      </g>
      <g stroke={c.light} strokeOpacity="0.7" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <polygon points={nodes.map((n) => n.join(",")).join(" ")} />
      </g>
      <circle cx={104} cy={43} r="3.6" fill={c.amber} />
      <circle cx={64} cy={81} r="3.6" fill={c.amber} />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill={i % 2 ? c.mid : c.blue} stroke="#fff" strokeWidth="3" />
      ))}
      <circle cx={80} cy={62} r="17" fill={c.deep} />
      <circle cx={80} cy={62} r="25" fill="none" stroke={c.mid} strokeOpacity="0.5" strokeDasharray="3 5" strokeWidth="2" />
      <circle cx={80} cy={62} r="6" fill="#fff" />
    </svg>
  );
}

export function IlluSecurityAuto() {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <circle cx="80" cy="62" r="50" fill="none" stroke={c.light} strokeWidth="3" strokeDasharray="70 22" strokeLinecap="round" />
      <circle cx="80" cy="12" r="5" fill={c.amber} />
      <path d="M80 24L110 35V62C110 80 97 92 80 100C63 92 50 80 50 62V35Z" fill={c.blue} />
      <path d="M80 24L110 35V62C110 80 97 92 80 100Z" fill={c.deep} />
      <path d="M66 62L76 72L96 50" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────── 就业方向：四幅插画 ───────────── */

export function IlluOps() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <rect x="30" y="12" width="74" height="98" rx="7" fill={c.deep} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="39" y={22 + i * 22} width="56" height="15" rx="3.5" fill={i % 2 ? c.mid : c.blue} />
          <circle cx="48" cy={29.5 + i * 22} r="2.6" fill={i === 0 || i === 2 ? c.amber : "#fff"} fillOpacity={i === 0 || i === 2 ? 1 : 0.6} />
          <line x1="58" y1={29.5 + i * 22} x2="86" y2={29.5 + i * 22} stroke="#fff" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <rect x="116" y="22" width="68" height="48" rx="7" fill="#fff" />
      <polyline points="126,58 140,46 152,52 166,34 176,40" fill="none" stroke={c.blue} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M130 100A18 18 0 0 1 166 100" fill="none" stroke={c.light} strokeWidth="7" strokeLinecap="round" />
      <path d="M130 100A18 18 0 0 1 157 84.5" fill="none" stroke={c.blue} strokeWidth="7" strokeLinecap="round" />
      <circle cx="157" cy="84.5" r="3.4" fill={c.amber} />
    </svg>
  );
}

export function IlluDeploy() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <ellipse cx="62" cy="104" rx="40" ry="6" fill={c.ink} fillOpacity="0.08" />
      <Iso cx={62} cy={66} w={30} t={30} faces={deepFaces} />
      <circle cx={36} cy={86} r="2.6" fill={c.amber} />
      <Cloud x={146} y={46} s={0.62} fill="#fff" />
      <path d="M76 44C88 18 116 14 126 30" fill="none" stroke={c.amber} strokeWidth="3.2" strokeDasharray="1 7" strokeLinecap="round" />
      <path d="M119 22L131 33L116 36Z" fill={c.amber} />
      <rect x="132" y="82" width="52" height="8" rx="4" fill={c.light} />
      <rect x="132" y="82" width="34" height="8" rx="4" fill={c.blue} />
      <rect x="132" y="98" width="52" height="8" rx="4" fill={c.light} />
      <rect x="132" y="98" width="46" height="8" rx="4" fill={c.mid} />
    </svg>
  );
}

export function IlluNetSec() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <ellipse cx="68" cy="104" rx="46" ry="6" fill={c.ink} fillOpacity="0.08" />
      <line x1="46" y1="76" x2="40" y2="40" stroke={c.deep} strokeWidth="3.4" strokeLinecap="round" />
      <line x1="92" y1="76" x2="100" y2="40" stroke={c.deep} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="40" cy="38" r="4" fill={c.amber} />
      <circle cx="100" cy="38" r="4" fill={c.amber} />
      <path d="M52 22A22 22 0 0 1 88 22" fill="none" stroke={c.mid} strokeWidth="3" strokeLinecap="round" />
      <path d="M58 30A12 12 0 0 1 82 30" fill="none" stroke={c.blue} strokeWidth="3" strokeLinecap="round" />
      <Iso cx={70} cy={80} w={46} t={14} faces={deepFaces} />
      <circle cx={70 - 46 + 8} cy={80 + 4 + 7} r="2.2" fill={c.amber} />
      <line x1="120" y1="88" x2="140" y2="82" stroke={c.mid} strokeWidth="3" strokeDasharray="1 6" strokeLinecap="round" />
      <path d="M148 58V50A13 13 0 0 1 174 50V58" fill="none" stroke={c.deep} strokeWidth="6" />
      <rect x="140" y="58" width="42" height="36" rx="8" fill={c.blue} />
      <rect x="161" y="58" width="21" height="36" rx="8" fill={c.deep} />
      <circle cx="161" cy="73" r="5" fill="#fff" />
      <rect x="159" y="75" width="4" height="9" rx="2" fill="#fff" />
    </svg>
  );
}

export function IlluSupport() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <rect x="30" y="16" width="100" height="66" rx="9" fill={c.deep} />
      <rect x="38" y="24" width="84" height="46" rx="4" fill="#fff" />
      <rect x="46" y="33" width="34" height="6" rx="3" fill={c.mid} />
      <rect x="46" y="46" width="56" height="6" rx="3" fill={c.light} />
      <rect x="46" y="58" width="26" height="6" rx="3" fill={c.light} />
      <circle cx="108" cy="36" r="5" fill={c.amber} />
      <rect x="72" y="82" width="16" height="12" fill={c.deep} />
      <rect x="56" y="94" width="48" height="7" rx="3.5" fill={c.deep} />
      <path d="M146 66A22 22 0 0 1 190 66" fill="none" stroke={c.deep} strokeWidth="5.5" strokeLinecap="round" />
      <rect x="140" y="60" width="13" height="24" rx="6.5" fill={c.blue} />
      <rect x="183" y="60" width="13" height="24" rx="6.5" fill={c.blue} />
      <path d="M190 84Q190 102 170 102" fill="none" stroke={c.deep} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="167" cy="102" r="4.2" fill={c.amber} />
    </svg>
  );
}

/* ───────────── 校企合作：中心辐射图 ───────────── */

export function PartnerHub() {
  const cx = 240;
  const cy = 210;
  const sats = [
    { x: 134, y: 104, label: "科研院所", kind: "chip" },
    { x: 346, y: 104, label: "通信运营商", kind: "tower" },
    { x: 134, y: 316, label: "通信运营商", kind: "tower" },
    { x: 346, y: 316, label: "智能物联网", kind: "camera" },
  ] as const;

  const icon = (kind: (typeof sats)[number]["kind"]): ReactNode => {
    if (kind === "chip")
      return (
        <g>
          {[-10, 0, 10].map((o) => (
            <g key={o} stroke={c.blue} strokeWidth="2.6" strokeLinecap="round">
              <line x1={o} y1={-18} x2={o} y2={-13} />
              <line x1={o} y1={13} x2={o} y2={18} />
              <line x1={-18} y1={o} x2={-13} y2={o} />
              <line x1={13} y1={o} x2={18} y2={o} />
            </g>
          ))}
          <rect x="-14" y="-14" width="28" height="28" rx="6" fill={c.blue} />
          <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#fff" />
        </g>
      );
    if (kind === "tower")
      return (
        <g>
          <path d="M0 -8L-11 17M0 -8L11 17M-6 5H6M-9 12H9" fill="none" stroke={c.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="0" cy="-12" r="4" fill={c.amber} />
          <path d="M-12 -18A14 14 0 0 0 -12 -6M12 -18A14 14 0 0 1 12 -6" fill="none" stroke={c.mid} strokeWidth="2.6" strokeLinecap="round" />
        </g>
      );
    return (
      <g>
        <rect x="-16" y="-9" width="32" height="20" rx="6" fill={c.blue} />
        <rect x="-7" y="-14" width="14" height="6" rx="2" fill={c.deep} />
        <circle cx="0" cy="1" r="7.5" fill="#fff" />
        <circle cx="0" cy="1" r="3.6" fill={c.deep} />
        <circle cx="11" cy="-3" r="1.8" fill={c.amber} />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 480 420" className="hub" role="img" aria-label="校企合作示意图：云计算专业与科研院所、两家通信运营商和一家智能物联网企业相连">
      <defs>
        <radialGradient id="hubGlow">
          <stop offset="0" stopColor="#2456F0" stopOpacity="0.2" />
          <stop offset="1" stopColor="#2456F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="200" fill="url(#hubGlow)" />
      <circle cx={cx} cy={cy} r="150" fill="none" stroke={c.light} strokeOpacity="0.8" strokeDasharray="2 8" strokeWidth="2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="92" fill="none" stroke={c.light} strokeOpacity="0.5" strokeWidth="1.5" />
      {sats.map((s) => (
        <line key={`${s.x}${s.y}`} className="hub-link" x1={cx} y1={cy} x2={s.x} y2={s.y} stroke={c.mid} strokeWidth="2.4" strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={cy} r="56" fill={c.deep} />
      <circle cx={cx} cy={cy} r="47" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.5" />
      <Cloud x={cx} y={cy - 10} s={0.3} fill="#fff" />
      <text x={cx} y={cy + 28} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800" style={{ fontFamily: "var(--font-body)" }}>
        云计算专业
      </text>
      {sats.map((s) => (
        <g key={`${s.x}-${s.y}-sat`}>
          <circle cx={s.x} cy={s.y} r="38" fill="#fff" stroke={c.light} strokeWidth="1.5" />
          <g transform={`translate(${s.x} ${s.y})`}>{icon(s.kind)}</g>
          <text x={s.x} y={s.y + 62} textAnchor="middle" fill="var(--ink-2)" fontSize="15" fontWeight="700" style={{ fontFamily: "var(--font-body)" }}>
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ───────────── 常见问题：对话气泡 ───────────── */

export function IlluFaq() {
  return (
    <svg viewBox="0 0 240 170" className="faq-illu" aria-hidden="true">
      <path d="M54 98L40 128L84 98Z" fill={c.blue} />
      <rect x="18" y="12" width="138" height="90" rx="24" fill={c.blue} />
      <rect x="86" y="12" width="70" height="90" rx="24" fill={c.deep} fillOpacity="0.28" />
      <text x="87" y="84" textAnchor="middle" fill="#fff" fontSize="62" fontWeight="900" style={{ fontFamily: "var(--font-display)" }}>
        ?
      </text>
      <circle cx="166" cy="26" r="6" fill={c.amber} />
      <path d="M200 150L214 168L178 150Z" fill={c.mist} />
      <rect x="112" y="86" width="108" height="64" rx="20" fill={c.mist} />
      <rect x="128" y="102" width="62" height="7" rx="3.5" fill={c.mid} />
      <rect x="128" y="116" width="46" height="7" rx="3.5" fill={c.light} />
      <rect x="128" y="130" width="56" height="7" rx="3.5" fill={c.light} />
    </svg>
  );
}

/* ───────────── 氛围：天空与云边 ───────────── */

/** 背景云层。tone 控制不透明度，深色板块用很低的值。 */
export function Skyline({ opacity = 0.7 }: { opacity?: number }) {
  return (
    <svg className="skyline" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g opacity={opacity}>
        <Cloud x={170} y={660} s={1.7} fill="#fff" />
        <Cloud x={1210} y={170} s={1.15} fill="#fff" />
        <Cloud x={760} y={800} s={2.3} fill="#fff" />
        <Cloud x={420} y={140} s={0.8} fill="#fff" />
      </g>
    </svg>
  );
}

/** 板块顶部的云朵边缘，用于从浅色板块过渡到深色板块。 */
export function CloudEdge({ fill }: { fill: string }) {
  const bumps: [number, number][] = [
    [30, 24], [118, 17], [212, 29], [302, 19], [392, 27], [476, 16], [566, 30], [656, 21],
    [744, 28], [832, 17], [924, 30], [1012, 22], [1100, 28], [1190, 18], [1282, 30], [1374, 22],
  ];
  return (
    <svg className="cloud-edge" viewBox="0 0 1440 60" aria-hidden="true">
      <g fill={fill}>
        <rect x="0" y="46" width="1440" height="14" />
        {bumps.map(([x, r]) => (
          <circle key={x} cx={x} cy={48} r={r} />
        ))}
      </g>
    </svg>
  );
}

/* ───────────── 实训控制台里的监控小图 ───────────── */

export function Spark({ points, tone }: { points: number[]; tone: "blue" | "amber" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const xs = 120 / (points.length - 1);
  const ys = points.map((p, i) => [i * xs, 6 + (1 - (p - min) / (max - min || 1)) * 28]);
  const line = ys.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const color = tone === "amber" ? "var(--il-amber)" : "#7FA6FF";
  return (
    <svg viewBox="0 0 120 40" className="spark" preserveAspectRatio="none" aria-hidden="true">
      <polygon points={`0,40 ${line} 120,40`} fill={color} fillOpacity="0.16" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ───────────── 品牌标识 & 图标 ───────────── */

export function LogoMark() {
  return (
    <svg viewBox="0 0 36 36" className="logo-mark" aria-hidden="true">
      <rect width="36" height="36" rx="11" fill={c.ink} />
      <Iso cx={18} cy={24} w={11} t={3.4} faces={{ top: "#4F86FF", left: "#2456F0", right: "#1B3FBF" }} />
      <Iso cx={18} cy={19} w={11} t={3.4} faces={{ top: "#9CC0FF", left: "#6C96EE", right: "#5882D6" }} />
      <Cloud x={18} y={11} s={0.1} fill="#fff" />
      <circle cx="9.6" cy="25.2" r="1" fill={c.amber} />
    </svg>
  );
}

type IconProps = { className?: string };
const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconMenu = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconClose = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const IconChevron = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}><path d="M9 6l6 6-6 6" /></svg>
);
export const IconUp = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const IconMail = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7l8 6 8-6" /></svg>
);
export const IconPin = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const IconPhone = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
);
