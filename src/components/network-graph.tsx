import { motion } from 'framer-motion';

export function NetworkGraph() {
  const nodes = [
    { id: 0, x: 50, y: 50 },
    { id: 1, x: 20, y: 20 },
    { id: 2, x: 80, y: 20 },
    { id: 3, x: 20, y: 80 },
    { id: 4, x: 80, y: 80 },
  ];

  const edges = [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
  ];

  return (
    <div className="w-full aspect-square max-w-[400px] mx-auto relative">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Draw edges first so they are behind nodes */}
        {edges.map((edge, i) => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          return (
            <g key={`edge-${i}`}>
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/30"
                strokeDasharray="2,2"
              />
              <motion.circle
                r="1"
                fill="currentColor"
                className="text-primary"
                initial={{ cx: sourceNode.x, cy: sourceNode.y }}
                animate={{ cx: targetNode.x, cy: targetNode.y }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5
                }}
              />
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.id === 0 ? "4" : "3"}
              className="fill-background stroke-primary stroke-[1.5px]"
            />
            {node.id === 0 && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="6"
                className="fill-transparent stroke-primary"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </g>
        ))}
      </svg>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />
    </div>
  );
}
