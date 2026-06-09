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
    <nav className="fixed top-5 left-0 w-full z-50 flex justify-center font-['Inter'] font-medium">
      <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={`px-5 py-2 rounded-full text-sm tracking-widest transition-all duration-200 ${
              active === item.id
                ? "bg-white/20 text-white shadow-sm"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {item.label.replace("// ", "")}
          </button>
        ))}
      </div>
    </nav>
  );
}
