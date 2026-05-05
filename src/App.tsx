import { useEffect, useState } from "react";
import "./index.css";

import { StarField }  from "./components/StarField";
import { Navbar }     from "./components/Navbar";
import { Hero }       from "./components/Hero";
import { About }      from "./components/About";
import { Skills }     from "./components/Skills";
import { Projects }   from "./components/Projects";
import { Contact }    from "./components/Contact";

const SECTIONS = ["hero", "about", "skills", "projects", "contact"];

export function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { threshold: 0.35 },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="scanlines dot-grid relative min-h-screen text-[#e2e8f0]">
      {/* HUD navigation */}
      <Navbar active={active} onNav={scrollTo} />

      {/* Sections */}
      <main style={{ position: "relative", zIndex: 1 }} className="flex flex-col gap-32 pb-32">
        <section id="hero"><Hero onStart={() => scrollTo("about")} /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}

export default App;
