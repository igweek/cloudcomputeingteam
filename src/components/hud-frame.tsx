import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HudFrameProps {
  children: ReactNode;
  className?: string;
  title?: string;
  status?: "online" | "warning" | "offline";
  scanline?: boolean;
}

export function HudFrame({ 
  children, 
  className, 
  title,
  status,
  scanline = false
}: HudFrameProps) {
  return (
    <div className={cn(
      "relative bg-black/40 border border-primary/20 p-6 group transition-all duration-300",
      "hover:border-primary/50 terminal-shadow-hover",
      className
    )}>
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/60 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/60 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/60 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/60 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />

      {/* Optional Scanline Overlay */}
      {scanline && (
        <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)', backgroundSize: '100% 4px' }} />
      )}

      {/* Top Header Row */}
      {(title || status) && (
        <div className="absolute top-0 left-0 w-full px-3 py-1 flex justify-between items-center transform -translate-y-1/2">
          {title && (
            <div className="bg-background px-2 text-xs font-mono text-primary/70 font-bold tracking-widest uppercase">
              {title}
            </div>
          )}
          {status && (
            <div className="bg-background px-2 flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                SYS_STATUS
              </span>
              <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                status === "online" ? "bg-primary shadow-[0_0_8px_rgba(74,222,128,0.8)]" :
                status === "warning" ? "bg-secondary shadow-[0_0_8px_rgba(255,0,170,0.8)]" :
                "bg-destructive shadow-[0_0_8px_rgba(255,0,0,0.8)]"
              )} />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
