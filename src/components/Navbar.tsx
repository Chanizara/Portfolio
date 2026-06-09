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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-['Inter'] font-medium ${
        scrolled ? "bg-black/60 backdrop-blur-xl py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
        
        <div className="text-white text-xs tracking-[0.2em] opacity-60">
          SYS.v2.0.4
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm tracking-widest">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`transition-all duration-200 ${
                active === item.id 
                  ? "text-white" 
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {item.label.replace("// ", "")}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}
