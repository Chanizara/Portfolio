import React from 'react';

export function About() {
  return (
    <div className="min-h-screen py-24 px-4 flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Inter'] font-semibold text-lg md:text-xl text-white tracking-[0.3em]">
          ABOUT ME
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-white/50 to-white/0" />
      </div>

      <div className="flex flex-col gap-6 w-full max-w-5xl">
        <div className="pixel-panel p-5 w-full text-gray-300 font-['Inter']">
          <div className="flex flex-col gap-6">
            {/* Education card */}
            <div className="flex justify-end">
              <div className="bg-[rgba(10,20,15,0.7)] border border-[rgba(100,200,130,0.12)] rounded-3xl p-7 flex flex-col gap-4 w-3/7">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-[rgba(20,35,25,0.9)] border border-[rgba(100,200,130,0.15)] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src="/public/logo-bu.png" alt="Bangkok University" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[20px] mt-0.5">Bangkok University</p>
                    <p className="text-gray-400 text-[15px] mt-0.5">School of Information Technology and Innovation</p>
                  </div>
                </div>
                <div className="h-px bg-[rgba(100,200,130,0.1)]" />
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(160,130,220,0.8)] shrink-0" />
                  <p className="text-gray-300 text-[14px]">CS — Computer Science </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="flex items-center gap-4 mt-4 w-full">
          <h2 className="font-['Inter'] font-semibold text-lg md:text-xl text-white tracking-[0.3em]">
            WORK EXPERIENCE
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-white/50 to-white/0" />
        </div>

        <div className="pixel-panel p-5 w-full text-gray-300 font-['Inter']">
          <div className="flex justify-start">
            <div className="bg-[rgba(10,20,15,0.7)] border border-[rgba(100,200,130,0.12)] rounded-3xl p-7 flex flex-col gap-4 w-3/7">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-[rgba(20,35,25,0.9)] border border-[rgba(100,200,130,0.15)] flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/public/logo-drite.jpg" alt="DriteStudio" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white font-semibold text-[20px] mt-0.5">IT Support</p>
                  <p className="text-gray-400 text-[15px] mt-0.5">DriteStudio</p>
                </div>
              </div>
              <div className="h-px bg-[rgba(100,200,130,0.1)]" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgba(160,130,220,0.8)] shrink-0" />
                <p className="text-gray-300 text-[14px]">Position — Role</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pixel-panel p-5 w-full text-gray-300 font-['Inter']">
          <div className="flex justify-end">
            <div className="bg-[rgba(10,20,15,0.7)] border border-[rgba(100,200,130,0.12)] rounded-3xl p-7 flex flex-col gap-4 w-3/7">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-[rgba(20,35,25,0.9)] border border-[rgba(100,200,130,0.15)] flex items-center justify-center shrink-0">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-[20px] mt-0.5">Frontend Developer</p>
                  <p className="text-gray-400 text-[15px] mt-0.5">Center of Specialty Innovation (CoSI)</p>
                </div>
              </div>
              <div className="h-px bg-[rgba(100,200,130,0.1)]" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgba(160,130,220,0.8)] shrink-0" />
                <p className="text-gray-300 text-[14px]">Position — Role</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
