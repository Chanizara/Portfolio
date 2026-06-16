import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const LINKS = [
   {
    label: "GitHub",
    value: "github.com/chanizara",
    href: "https://github.com/chanizara",
    icon: <FaGithub size={38} color="#e8e8e8" />,
    borderColor: "rgba(232, 232, 232, 0.25)",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/chanizara Thamma",
    href: "https://www.linkedin.com/in/chanizara-thamma-93850b367/",
    icon: <FaLinkedin size={38} color="#5aabdd" />,
    borderColor: "rgba(90, 171, 221, 0.35)",
  },
  {
    label: "Email",
    value: "chanizara.tham@gmail.com",
    href: "mailto:chanizara.tham@gmail.com",
    icon: <MdEmail size={40} color="#e85555" />,
    borderColor: "rgba(232, 85, 85, 0.35)",
  },
];

export function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-6 pt-28 pb-10">
      <div className="w-full max-w-6xl flex flex-col items-center gap-20 flex-1 justify-center">
        <h2 className="font-['Inter'] font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-wide text-center">
          Get in Touch!
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-6 px-8 py-8 group rounded-3xl transition-all duration-300"
              style={{
                background: 'rgba(10, 30, 20, 0.65)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${link.borderColor}`,
                boxShadow: '0 8px 32px rgba(0, 20, 10, 0.5)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = `0 16px 40px rgba(0, 20, 10, 0.6), 0 0 20px ${link.borderColor}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 8px 32px rgba(0, 20, 10, 0.5)';
              }}
            >
              <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {link.icon}
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="font-['Inter'] font-bold text-lg text-text group-hover:text-accent transition-colors">
                  {link.label}
                </span>
                <span className="font-['Inter'] text-sm text-text-muted truncate group-hover:text-text/80 transition-colors">
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center mt-4">
          <p className="font-['Inter'] text-xl text-text/45 leading-relaxed">
            Keep going. Every expert was once a beginner.
          </p>
          <p className="font-['Inter'] text-base text-text-muted/40 mt-2">
            — Someone who believes in you
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-6xl border-t border-[#2a4a35]/50 pt-6 mt-16 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="font-['Inter'] text-sm text-[#7ea88a]/50 tracking-widest">
          © 2025 CHANIZARA · All rights reserved.
        </span>
        <span className="font-['Press_Start_2P'] text-[8px] text-[#7ea88a]/30 tracking-widest">
          v2.0
        </span>
      </div>
    </div>
  );
}
