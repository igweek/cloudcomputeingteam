import React from 'react';

export function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
    </div>
  );
}