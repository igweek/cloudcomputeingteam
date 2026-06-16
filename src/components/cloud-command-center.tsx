import { Activity, Cloud, Container, Database, Lock, Network, Server, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const orbitNodes = [
  { label: "K8S", icon: Container, angle: -102 },
  { label: "SDN", icon: Network, angle: -18 },
  { label: "DB", icon: Database, angle: 58 },
  { label: "IAM", icon: Lock, angle: 140 },
];

const logLines = [
  "provision cluster --zone cn-east",
  "attach vpc / subnet-blue",
  "rollout k8s workload: success",
  "observability pipeline online",
];

export function CloudCommandCenter() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-[600px] w-full max-w-[620px]" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 54, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-300/15"
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[70px]" />

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[2rem] border border-cyan-100/30 bg-[#081425]/92 shadow-[0_34px_100px_rgba(37,99,235,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl"
        animate={reducedMotion ? undefined : { y: [0, -10, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.22),transparent_34%)]" />
        <Cloud className="relative h-14 w-14 text-cyan-100 drop-shadow-[0_0_24px_rgba(125,211,252,0.7)]" strokeWidth={1.35} />
      </motion.div>

      {orbitNodes.map((node, index) => {
        const radius = 206;
        const angle = (node.angle * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const Icon = node.icon;

        return (
          <motion.div
            key={node.label}
            className="absolute left-1/2 top-1/2 z-10"
            style={{ marginLeft: x - 34, marginTop: y - 34 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: reducedMotion ? 0 : [0, index % 2 ? 10 : -10, 0],
            }}
            transition={{ duration: 4 + index * 0.35, delay: index * 0.16, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
          >
            <div className="flex h-[68px] w-[68px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/12 bg-white/[0.055] text-cyan-100 shadow-[0_18px_55px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-xl">
              <Icon className="h-5 w-5" strokeWidth={1.45} />
              <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-blue-100/65">{node.label}</span>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        className="absolute left-0 top-12 z-30 w-[255px] rounded-[1.6rem] border border-white/12 bg-[#07111f]/78 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
        initial={{ opacity: 0, x: -28, y: 16 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.82, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/55">Cluster</span>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
            Healthy
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold tracking-tight text-white">99.98%</span>
          <span className="pb-1 text-xs text-slate-500">uptime</span>
        </div>
        <div className="mt-5 flex h-16 items-end gap-1.5">
          {[42, 58, 48, 72, 64, 86, 76, 92, 70, 84, 96, 88].map((height, index) => (
            <motion.span
              key={index}
              className="flex-1 rounded-t-full bg-gradient-to-t from-blue-500/35 to-cyan-200/85"
              style={{ height: `${height}%` }}
              animate={reducedMotion ? undefined : { opacity: [0.45, 1, 0.65] }}
              transition={{ duration: 2.4, delay: index * 0.08, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 z-30 w-[270px] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#07111f]/82 shadow-[0_28px_80px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
        initial={{ opacity: 0, x: 28, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.82, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <Terminal className="h-4 w-4 text-cyan-200" />
          <span className="font-mono text-xs text-slate-400">infra.run</span>
        </div>
        <div className="space-y-3 p-4 font-mono text-[11px] leading-5 text-slate-400">
          {logLines.map((line, index) => (
            <motion.div
              key={line}
              className="flex gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.62 + index * 0.14 }}
            >
              <span className="text-cyan-300">$</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-10 z-30 w-[225px] rounded-[1.6rem] border border-white/12 bg-white/[0.055] p-4 shadow-[0_26px_70px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
        initial={{ opacity: 0, x: -16, y: 28 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.82, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-200" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Latency</span>
          </div>
          <span className="text-sm font-semibold text-white">18ms</span>
        </div>
        <svg className="mt-4 h-16 w-full" viewBox="0 0 190 64" fill="none">
          <motion.path
            d="M2 48 C22 30, 34 34, 48 42 S77 57, 94 31 S122 4, 142 24 S166 55, 188 20"
            stroke="url(#latency-line)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="latency-line" x1="0" x2="190" y1="0" y2="0">
              <stop stopColor="#67e8f9" />
              <stop offset="0.55" stopColor="#60a5fa" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-8 z-30 flex items-center gap-3 rounded-full border border-white/12 bg-[#07111f]/80 px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.82, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400/10 text-blue-100">
          <Server className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">128 nodes</p>
          <p className="text-xs text-slate-500">auto-scaled lab cloud</p>
        </div>
      </motion.div>
    </div>
  );
}
