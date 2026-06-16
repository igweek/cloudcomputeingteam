import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: ReactNode;
  tag?: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, tag, className, delay = 0 }: FeatureCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reducedMotion ? undefined : { y: -9, scale: 1.012 }}
      className={cn("group relative h-full perspective-dramatic", className)}
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-300/35 via-blue-500/20 to-violet-400/25 opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#07111f]/82 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-500 group-hover:border-blue-300/30 group-hover:bg-[#09182d]/88 group-hover:shadow-[0_34px_90px_rgba(15,23,42,0.38),0_0_60px_rgba(37,99,235,0.13),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-300/20" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.08)_45%,transparent_65%)] transition-transform duration-1000 group-hover:translate-x-[120%]" />

        <div className="flex items-start justify-between mb-5">
          {Icon && (
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-blue-200 shadow-[0_0_28px_rgba(59,130,246,0.14)] transition duration-500 group-hover:scale-105 group-hover:border-cyan-200/30 group-hover:bg-cyan-300/10">
              <Icon className="h-5 w-5" strokeWidth={1.55} />
            </div>
          )}
          {tag && (
            <span className="rounded-full border border-blue-300/15 bg-blue-300/[0.06] px-2.5 py-1 text-[11px] font-medium tracking-wide text-blue-200/70">
              {tag}
            </span>
          )}
        </div>

        <h3 className="relative mb-3 text-[17px] font-semibold leading-snug tracking-tight text-white">
          {title}
        </h3>

        <div className="relative flex-1 text-sm leading-7 text-slate-400">
          {description}
        </div>

        <div className="relative mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200/0 transition duration-500 group-hover:text-blue-200/70">
          <span className="h-px flex-1 origin-left scale-x-0 bg-gradient-to-r from-cyan-300/80 via-blue-400/50 to-transparent transition duration-700 group-hover:scale-x-100" />
          <span>Explore</span>
        </div>
      </div>
    </motion.div>
  );
}
