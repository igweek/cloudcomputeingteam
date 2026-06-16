import React from 'react';
import { motion } from 'framer-motion';

export function GradientBlobs() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-40">
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/30 blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[-5%] w-[40%] h-[60%] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-fuchsia-600/20 blur-[120px]"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
      />
    </div>
  );
}