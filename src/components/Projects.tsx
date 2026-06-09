import React from 'react';

const PROJECTS = [
  { id: "01", title: "PORTFOLIO", status: "ONLINE", tech: "React / TS", year: "2024", highlight: "#e0e0e0" },
  { id: "02", title: "E-COMMERCE", status: "ARCHIVED", tech: "Next.js / Node", year: "2023", highlight: "#aaaaaa" },
  { id: "03", title: "DATALINK API", status: "ONLINE", tech: "Python / FastAPI", year: "2023", highlight: "#cccccc" },
];

export function Projects() {
  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Inter'] font-semibold text-lg md:text-xl text-white tracking-[0.3em]">
          PROJECTS
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-white/20 to-white/0" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 font-['Inter']">
        {PROJECTS.map(p => (
          <div key={p.id} className="pixel-panel p-6 group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl font-bold text-gray-500 group-hover:text-white transition-colors">
                {p.id}
              </span>
              <span className="text-sm px-2 py-1 border" style={{ color: p.highlight, borderColor: p.highlight }}>
                {p.status}
              </span>
            </div>
            
            <h3 className="text-3xl text-white mb-2 font-['Press_Start_2P'] tracking-wide group-hover:translate-x-2 transition-transform duration-300" style={{textShadow: `0 0 10px ${p.highlight}`}}>
              {p.title}
            </h3>
            
            <div className="text-xl text-gray-400 mt-6 border-t border-[#321d5c] pt-4 flex justify-between">
              <span>{p.tech}</span>
              <span>{p.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
