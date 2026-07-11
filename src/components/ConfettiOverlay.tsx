const COLORS = ['#FF6B00', '#2D5FFF', '#FF3B30', '#00A651', '#8B2FE0', '#FFD400'];

export default function ConfettiOverlay() {
  const pieces = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const color = COLORS[i % COLORS.length];
        const size = 8 + Math.random() * 10;
        const rotate = Math.random() * 360;
        return (
          <span
            key={i}
            className="absolute top-0 animate-confetti-fall"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 0.6,
              backgroundColor: color,
              border: '2px solid #1A1A1A',
              animationDelay: `${delay}s`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
