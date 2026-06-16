import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TelemetryStrip() {
  const [metrics, setMetrics] = useState({
    uptime: 99.998,
    nodes: 4096,
    throughput: 1.2,
    latency: 12.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        uptime: Math.min(99.999, prev.uptime + (Math.random() * 0.001 - 0.0005)),
        nodes: Math.max(4000, Math.floor(prev.nodes + (Math.random() * 10 - 4))),
        throughput: Math.max(0.5, prev.throughput + (Math.random() * 0.2 - 0.1)),
        latency: Math.max(5, prev.latency + (Math.random() * 2 - 1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "SYS_UPTIME", value: `${metrics.uptime.toFixed(3)}%` },
    { label: "ACTIVE_NODES", value: metrics.nodes.toString() },
    { label: "NET_THROUGHPUT", value: `${metrics.throughput.toFixed(2)} TB/s` },
    { label: "AVG_LATENCY", value: `${metrics.latency.toFixed(1)} ms` }
  ];

  return (
    <div className="w-full flex flex-wrap justify-between items-center border-y border-primary/20 bg-primary/5 py-3 px-6 font-mono text-xs overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 z-10 mx-2">
          <span className="text-muted-foreground uppercase tracking-widest">{item.label}:</span>
          <motion.span 
            key={item.value}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold"
          >
            {item.value}
          </motion.span>
        </div>
      ))}
      
      <div className="hidden md:flex items-center gap-2 z-10 mx-2">
        <span className="text-muted-foreground uppercase tracking-widest">STATUS:</span>
        <span className="text-primary font-bold flex items-center gap-2">
          OPTIMAL <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </span>
      </div>
    </div>
  );
}
