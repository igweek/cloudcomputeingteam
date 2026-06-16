import { useEffect, useRef } from 'react';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Characters: Katakana + Latin + Numerals
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン'.split('');
    const fontSize = 14;
    const columns = width / fontSize;
    
    // Array of drops - one per column
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start at random positions above the screen
    }

    let animationFrameId: number;

    const draw = () => {
      // Semi-transparent black background creates trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0f0'; // Phosphor green
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // x coordinate
        const x = i * fontSize;
        // y coordinate
        const y = drops[i] * fontSize;

        // Add a glow effect occasionally
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#fff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#0f0';
        } else {
          ctx.fillStyle = '#4ade80';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly after it crosses screen
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
