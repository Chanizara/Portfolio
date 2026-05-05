import React from 'react';

const LINKS = [
  { label: "GITHUB", value: "github.com/chanizara", href: "https://github.com/chanizara", highlight: "#00f0ff" },
  { label: "LINKEDIN", value: "linkedin.com/in/chanizara", href: "https://linkedin.com/in/chanizara", highlight: "#8a2be2" },
  { label: "EMAIL", value: "chanizara@email.com", href: "mailto:chanizara@email.com", highlight: "#ff007f" },
];

export function Contact() {
  return (
    <div className="min-h-[70vh] py-24 px-4 flex flex-col items-center border-t border-[#321d5c] bg-gradient-to-b from-[#090414] to-[#120824]">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-16 justify-between items-center">
        
        <div className="flex-1">
          <h2 className="font-['Press_Start_2P'] text-2xl md:text-4xl text-white mb-6">
            INITIATE <br/>CONNECTION
          </h2>
          <p className="font-['VT323'] text-2xl text-gray-400 max-w-sm leading-relaxed">
            Ready to start a new project or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="flex-1 w-full space-y-4">
          {LINKS.map(link => (
            <a 
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center justify-between p-6 border border-[#321d5c] bg-[#05020a] hover:bg-[#1a0b36] transition-all group"
            >
              <div className="flex flex-col">
                <span className="font-['Press_Start_2P'] text-[10px] tracking-widest mb-2" style={{color: link.highlight}}>
                  {link.label}
                </span>
                <span className="font-['VT323'] text-xl text-gray-300 group-hover:text-white transition-colors">
                  {link.value}
                </span>
              </div>
              <span className="font-['Press_Start_2P'] text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                +
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full max-w-5xl mt-32 pt-8 border-t border-[#321d5c] flex justify-between items-center font-['VT323'] text-lg text-gray-500">
        <span>© 2024 CHANIZARA</span>
        <span>SYSTEM VERSION 2.0</span>
      </div>
    </div>
  );
}
