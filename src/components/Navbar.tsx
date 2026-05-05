import { useEffect, useState } from "react";

const NAV = [
  { id: "hero", label: "// INTRO" },
  { id: "about", label: "// PROFILE" },
  { id: "skills", label: "// TECH" },
  { id: "projects", label: "// MISSIONS" },
  { id: "contact", label: "// NETWORK" },
];

interface NavbarProps {
  active: string;
  onNav: (id: string) => void;
}

export function Navbar({ active, onNav }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-['VT323'] border-b border-[#321d5c] ${
        scrolled ? "bg-[#090414]/90 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
        
        <div className="text-[#00f0ff] font-['Press_Start_2P'] text-[10px] tracking-widest opacity-80">
          SYS.v2.0.4
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xl">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`transition-colors tracking-wide ${
                active === item.id 
                  ? "text-[#ff007f] text-glow-pink" 
                  : "text-gray-500 hover:text-[#00f0ff]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}
