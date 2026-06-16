export function Scanlines() {
  return (
    <div 
      className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 50%,
          rgba(0, 0, 0, 0.2) 50%,
          rgba(0, 0, 0, 0.2)
        )`,
        backgroundSize: '100% 4px'
      }}
      aria-hidden="true"
    />
  );
}
