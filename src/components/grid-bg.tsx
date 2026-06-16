export function GridBg() {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-grid pointer-events-none opacity-30" />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ 
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)' 
      }} />
    </>
  );
}
