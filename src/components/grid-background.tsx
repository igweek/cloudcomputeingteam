export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_8%_22%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(139,92,246,0.14),transparent_30%)]" />

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(to bottom, transparent, black 16%, black 72%, transparent)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] animate-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34,211,238,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34,211,238,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "144px 144px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 68%)",
        }}
      />

      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-[90px] animate-aurora-float" />
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-violet-500/12 blur-[110px] animate-aurora-float-delayed" />
      <div className="absolute bottom-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,8,16,0.18)_42%,rgba(3,7,18,0.86)_100%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.055]" />
    </div>
  );
}
