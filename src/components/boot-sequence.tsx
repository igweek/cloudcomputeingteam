import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete?: () => void;
}

const BOOT_LINES = [
  "> INITIALIZING CLOUD INFRASTRUCTURE...",
  "> LOADING NODE_TOPOLOGY [OK]",
  "> ESTABLISHING SECURE CHANNEL: AES-256",
  "> ALLOCATING VIRTUAL RESOURCES: 1024_CORES",
  "> SYSTEM_READY."
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (cancelled) return;
      if (lineIdx >= BOOT_LINES.length) {
        setDone(true);
        timer = setTimeout(() => {
          if (!cancelled) onCompleteRef.current?.();
        }, 250);
        return;
      }
      const currentLine = BOOT_LINES[lineIdx];
      if (charIdx < currentLine.length) {
        const partial = currentLine.substring(0, charIdx + 1);
        setLines(prev => {
          const next = [...prev];
          next[lineIdx] = partial;
          return next;
        });
        charIdx += 1;
        timer = setTimeout(tick, 12);
      } else {
        lineIdx += 1;
        charIdx = 0;
        timer = setTimeout(tick, 80);
      }
    };

    tick();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="font-mono text-primary/80 text-sm md:text-base text-left mb-8 min-h-[120px]">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-1"
        >
          {line}
          {!done && i === lines.length - 1 && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
