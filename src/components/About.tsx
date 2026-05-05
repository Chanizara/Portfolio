import React from 'react';

const STATS = [
  { label: "FRONTEND", val: 95, color: "#ff007f" },
  { label: "BACKEND", val: 85, color: "#00f0ff" },
  { label: "ARCHITECTURE", val: 80, color: "#8a2be2" },
];

export function About() {
  return (
    <div className="min-h-screen py-24 px-4 flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Press_Start_2P'] text-xl md:text-2xl text-[#00f0ff] opacity-90 tracking-widest">
          &gt; PROFILE_DATA
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00f0ff] to-transparent opacity-30" />
      </div>
      
      <div className="pixel-panel p-8 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 text-gray-300 font-['VT323']">
        
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h3 className="text-3xl text-white mb-2 tracking-wide font-['Press_Start_2P'] text-glow-pink">CHANIZARA</h3>
          
          <div className="bg-[#05020a] border border-[#321d5c] p-6 text-xl leading-relaxed">
            <p className="mb-4">
              Passionate Software Engineer specialized in building robust and scalable web applications. 
              My expertise lies in TypeScript, React, and Node.js ecosystems.
            </p>
            <p>
              I bridge the gap between design and intricate backend logic, focusing on performance, 
              clean architecture, and exceptional user experiences.
            </p>
          </div>

          <div className="flex gap-4 text-sm font-['Press_Start_2P'] opacity-70 mt-4">
             <span className="border border-[#ff007f] text-[#ff007f] px-3 py-1">STATUS: ACTIVE</span>
             <span className="border border-[#8a2be2] text-[#8a2be2] px-3 py-1">LOC: THAILAND</span>
          </div>
        </div>

        {/* Right Column / Stats */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="text-[#00f0ff] font-['Press_Start_2P'] text-sm tracking-widest border-b border-[#321d5c] pb-2">
            ATTRIBUTES
          </div>
          
          <div className="space-y-6">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-lg mb-2" style={{color: s.color}}>
                  <span>{s.label}</span>
                  <span>{s.val}%</span>
                </div>
                <div className="h-2 bg-[#05020a] border border-[#321d5c]">
                  <div className="h-full transition-all duration-1000" style={{ width: `${s.val}%`, backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
