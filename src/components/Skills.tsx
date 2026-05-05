import React from 'react';

const TECH_STACK = [
  { name: "TypeScript", color: "#00f0ff" },
  { name: "React", color: "#00f0ff" },
  { name: "Next.js", color: "#e2e8f0" },
  { name: "Node.js", color: "#ff007f" },
  { name: "Python", color: "#ff007f" },
  { name: "PostgreSQL", color: "#8a2be2" },
  { name: "TailwindCSS", color: "#00f0ff" },
  { name: "Docker", color: "#8a2be2" },
  { name: "AWS", color: "#e2e8f0" },
];

export function Skills() {
  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Press_Start_2P'] text-xl md:text-2xl text-[#ff007f] opacity-90 tracking-widest">
          &gt; TECH_STACK
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#ff007f] to-transparent opacity-30" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="flex flex-wrap gap-4 font-['VT323'] text-2xl">
          {TECH_STACK.map((tech, idx) => (
            <div 
              key={tech.name} 
              className="px-6 py-3 border border-[#321d5c] bg-[#120824]/50 hover:bg-[#1a0b36] transition-colors cursor-default"
              style={{
                borderLeft: `4px solid ${tech.color}`,
                boxShadow: `inset 0 0 10px ${tech.color}11`
              }}
            >
              <span className="opacity-50 mr-3">[{String(idx + 1).padStart(2, '0')}]</span>
              <span className="text-white tracking-wide">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
