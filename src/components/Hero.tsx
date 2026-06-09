import { useEffect, useState } from "react";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, Math.random() * 5000 + 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)"
        }}
      />
      
      <div className="z-10 flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 text-white font-['Press_Start_2P'] text-[10px] tracking-widest opacity-70">
          <div className="w-8 h-[1px] bg-white" />
          <span>SYSTEM.INITIALIZED</span>
          <div className="w-8 h-[1px] bg-white" />
        </div>

        <h1 
          className={`font-['Inter'] font-bold text-5xl md:text-7xl text-white tracking-widest ${glitch ? 'opacity-80 translate-x-1' : ''}`}
          style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.4)" }}
        >
          CHANIZARA
        </h1>

        <p className="font-['Inter'] text-xl md:text-2xl text-gray-300 tracking-widest" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}>
          SOFTWARE ENGINEER
        </p>

        <p className="font-['Inter'] text-lg text-gray-400 max-w-xl leading-relaxed mt-4 bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
          Forging scalable web applications and digital experiences with precision and creativity.
        </p>

        <div className="mt-8">
          <button onClick={onStart} className="pixel-button">
            BEGIN SEQUENCE
          </button>
        </div>
      </div>
    </div>
  );
}
