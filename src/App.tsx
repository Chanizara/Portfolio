import { useEffect, useState } from "react";
import "./index.css";

import { ForestParticles } from "./components/ForestParticles";
import { StarField }       from "./components/StarField";
import { Navbar }     from "./components/Navbar";
import { Hero }       from "./components/Hero";
import { About }      from "./components/About";
import { Projects }   from "./components/Projects";
import { Contact }    from "./components/Contact";

type TimeOfDay = "day" | "evening" | "night";

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 6 && h < 18) return "day";
  if (h >= 18 && h < 21) return "evening";
  return "night";
}

const BG_CONFIG: Record<TimeOfDay, { image: string; overlay: string }> = {
  day: {
    image: "/public/bg.jpg",
    overlay: "linear-gradient(to bottom, rgba(10, 30, 20, 0.55), rgba(5, 20, 15, 0.75))",
  },
  evening: {
    image: "/public/bg-evening.png",
    overlay: "linear-gradient(to bottom, rgba(30, 15, 5, 0.5), rgba(20, 8, 5, 0.72))",
  },
  night: {
    image: "/public/bg-night.png",
    overlay: "linear-gradient(to bottom, rgba(5, 10, 30, 0.45), rgba(2, 5, 20, 0.68))",
  },
};

const SECTIONS = ["hero", "about", "projects", "contact"];

export function App() {
  const [active, setActive] = useState("hero");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");

  useEffect(() => {
    const id = setInterval(() => setTimeOfDay(getTimeOfDay()), 60_000);
    return () => clearInterval(id);
  }, []);

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

  const { image, overlay } = BG_CONFIG[timeOfDay];
  const bgStyle = {
    backgroundImage: `${overlay}, url('${image}')`,
  };

  return (
    <div className="scanlines pixel-art-bg relative min-h-screen text-text" style={bgStyle}>
      {timeOfDay === "night" ? <StarField /> : <ForestParticles timeOfDay={timeOfDay} />}
      {/* HUD navigation */}
      <Navbar active={active} onNav={scrollTo} />

      {/* Sections */}
      <main style={{ position: "relative", zIndex: 1 }} className="flex flex-col gap-32 pb-32">
        <section id="hero"><Hero onStart={() => scrollTo("projects")} /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}

export default App;
