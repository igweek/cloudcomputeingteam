import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string | React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  delay?: number;
}

export function GlitchText({ text, className, as: Component = "div", delay = 0 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGlitching(true);
      const stopTimer = setTimeout(() => setIsGlitching(false), 800);
      return () => clearTimeout(stopTimer);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const ComponentTag = motion[Component as keyof typeof motion] as any;

  return (
    <ComponentTag className={cn("relative inline-block", className)}>
      <span className={cn("relative z-10", isGlitching && "opacity-80")}>
        {text}
      </span>
      
      {isGlitching && (
        <>
          <motion.span 
            className="absolute top-0 left-[2px] -z-10 text-secondary mix-blend-screen"
            animate={{ 
              x: [-2, 2, -1, 3, 0],
              y: [1, -1, 2, -2, 0],
              opacity: [0.8, 0.4, 0.9, 0.2, 0]
            }}
            transition={{ duration: 0.4, ease: "linear", times: [0, 0.2, 0.5, 0.8, 1] }}
          >
            {text}
          </motion.span>
          <motion.span 
            className="absolute top-0 -left-[2px] -z-10 text-accent mix-blend-screen"
            animate={{ 
              x: [2, -2, 1, -3, 0],
              y: [-1, 1, -2, 2, 0],
              opacity: [0.8, 0.4, 0.9, 0.2, 0]
            }}
            transition={{ duration: 0.4, ease: "linear", times: [0, 0.2, 0.5, 0.8, 1] }}
          >
            {text}
          </motion.span>
        </>
      )}
    </ComponentTag>
  );
}
