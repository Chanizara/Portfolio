import React from 'react';

const TECH_STACK = [
  { name: "TypeScript", color: "#e0e0e0" },
  { name: "React", color: "#cccccc" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#aaaaaa" },
  { name: "Python", color: "#999999" },
  { name: "PostgreSQL", color: "#bbbbbb" },
  { name: "TailwindCSS", color: "#dddddd" },
  { name: "Docker", color: "#eeeeee" },
  { name: "AWS", color: "#ffffff" },
];

export function Skills() {
  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Inter'] font-semibold text-lg md:text-xl text-white tracking-[0.3em]">
          TECH STACK
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-white/20 to-white/0" />
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
