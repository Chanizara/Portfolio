import { useEffect, useState } from "react";

interface HeroProps {
  onStart: () => void;
}

const TYPEWRITER_TEXT = "Frontend Developer & UX/UI Designer";

export function Hero({ onStart }: HeroProps) {
  const [glitch, setGlitch] = useState(false);
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter loop: type → pause 3s → clear → type again
  useEffect(() => {
    if (typed.length < TYPEWRITER_TEXT.length) {
      const t = setTimeout(() => setTyped(TYPEWRITER_TEXT.slice(0, typed.length + 1)), 150);
      return () => clearTimeout(t);
    }
    // Finished typing — wait 3s then reset to empty
    const t = setTimeout(() => setTyped(""), 3000);
    return () => clearTimeout(t);
  }, [typed]);

  // Blinking cursor always on
  useEffect(() => {
    const t = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(t);
  }, []);

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
        <h1 
          className={`font-['Inter'] font-bold text-7xl md:text-8xl text-white tracking-widest ${glitch ? 'opacity-80 translate-x-1' : ''}`}
          style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.4)" }}
        >
          CHANIZARA
        </h1>

        <p className="font-['Inter'] text-xl md:text-2xl text-gray-300 tracking-widest" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}>
          {typed}
          <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </p>

        <div className="mt-5 flex gap-4">
          <button onClick={onStart} className="pixel-button">
            VIEW PROJECTS
          </button>
          <button className="pixel-button inline-flex items-center gap-2">
            <img src="/public/icon-Download.png" alt="" className="w-5 h-5" />
            DOWNLOAD CV
          </button>
        </div>
      </div>
    </div>
  );
}
