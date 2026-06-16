import { Cloud, Code, Database, Globe, Server, Shield } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Center of the 500x480 container, radius of icon ring
const CX = 240;
const CY = 245;
const R = 168;
const TILE = 44; // icon tile size (w-11)

// 5 icons evenly at 72° apart, starting from top (-90°)
const ICONS = [Globe, Code, Database, Shield, Server];
const NODES = ICONS.map((Icon, i) => {
  const angle = (-110 + i * 72) * (Math.PI / 180);
  return {
    Icon,
    x: Math.round(CX + R * Math.cos(angle) - TILE / 2),
    y: Math.round(CY + R * Math.sin(angle) - TILE / 2),
    tileDur:  3.2 + i * 0.3,
    tileDelay: i * 0.45,
    iconDur:  2.7 + i * 0.25,
    iconDelay: i * 0.35 + 0.2,
  };
});

export function OrbitalViz() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-[480px] w-[500px]" aria-hidden="true">
      <motion.div
        className="absolute rounded-full border border-cyan-200/[0.08]"
        style={{
          left: CX - R - 52,
          top: CY - R - 52,
          width: (R + 52) * 2,
          height: (R + 52) * 2,
        }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(125,211,252,0.95)]" />
      </motion.div>

      {/* Connection lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="orbit-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.02)" />
            <stop offset="55%" stopColor="rgba(96,165,250,0.28)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0.04)" />
          </linearGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(147,197,253,0.4)" />
            <stop offset="72%" stopColor="rgba(37,99,235,0.05)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r={R + 10} fill="none" stroke="rgba(96,165,250,0.12)" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={R - 42} fill="none" stroke="rgba(34,211,238,0.06)" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx={CX} cy={CY} r="118" fill="url(#core-glow)" />
        {NODES.map(({ x, y }, i) => (
          <motion.line
            key={i}
            x1={CX} y1={CY}
            x2={x + TILE / 2} y2={y + TILE / 2}
            stroke="url(#orbit-line)"
            strokeWidth="1"
            strokeDasharray="5 9"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.24 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {/* Decorative rings */}
      <motion.div
        className="absolute rounded-full border border-blue-400/15 shadow-[inset_0_0_30px_rgba(59,130,246,0.05)]"
        style={{
          left: CX - R - 10, top: CY - R - 10,
          width: (R + 10) * 2, height: (R + 10) * 2,
        }}
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute rounded-full border border-dashed border-cyan-300/[0.08]"
        style={{
          left: CX - R - 40, top: CY - R - 40,
          width: (R + 40) * 2, height: (R + 40) * 2,
        }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* Central glow */}
      <div
        className="pointer-events-none absolute rounded-full bg-blue-400/20 blur-3xl"
        style={{ left: CX - 92, top: CY - 92, width: 184, height: 184 }}
      />

      {/* Central cloud */}
      <motion.div
        className="absolute z-10 flex items-center justify-center overflow-hidden rounded-full border border-blue-200/35 bg-[#07111f] shadow-[0_0_55px_rgba(37,99,235,0.42),inset_0_1px_0_rgba(255,255,255,0.11)]"
        style={{ left: CX - 70, top: CY - 70, width: 140, height: 140 }}
        animate={reducedMotion ? undefined : { scale: [1, 1.045, 1] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(255,255,255,0.18),transparent_30%)]" />
        <motion.div
          className="absolute inset-x-8 top-0 h-px bg-cyan-200/70"
          animate={reducedMotion ? undefined : { opacity: [0.2, 1, 0.2], x: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <Cloud className="relative h-[52px] w-[52px] text-blue-100 drop-shadow-[0_0_18px_rgba(147,197,253,0.65)]" strokeWidth={1.45} />
      </motion.div>

      {/* Floating icon nodes */}
      {NODES.map(({ Icon, x, y, tileDur, tileDelay, iconDur, iconDelay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          animate={reducedMotion ? undefined : { y: [0, -12, 0], x: [0, i % 2 ? 5 : -5, 0] }}
          transition={{ duration: tileDur, delay: tileDelay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-blue-200/20 bg-[#0a1628]/95 shadow-[0_0_20px_rgba(37,99,235,0.23),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_34%)]" />
            <motion.div
              animate={reducedMotion ? undefined : { rotate: [-7, 7, -7], scale: [1, 1.08, 1] }}
              transition={{ duration: iconDur, delay: iconDelay, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="relative h-5 w-5 text-cyan-100" strokeWidth={1.55} />
            </motion.div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
        Cloud infra online
      </div>
    </div>
  );
}
