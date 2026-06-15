import React from 'react';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiVite, SiNextdotjs, SiFastapi } from 'react-icons/si';

const techIcons: Record<string, React.ReactNode> = {
  'React': <FaReact className="text-[#61DAFB]" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#38BDF8]" />,
  'Vite': <SiVite className="text-[#646CFF]" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'Node.js': <FaNodeJs className="text-[#68A063]" />,
  'Python': <FaPython className="text-[#3776AB]" />,
  'FastAPI': <SiFastapi className="text-[#009688]" />,
};

interface Project {
  title: string;
  date: string;
  tech: string[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Tastesiam Website',
    date: '???, 2026',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite' ],
    image: 'public/Tasatesiam.png',
  },
  
];

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (months < 1) return 'just now';
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="relative group cursor-pointer">
      {/* Back card - shows on hover */}
      <div className="absolute inset-0 pixel-panel opacity-0 group-hover:opacity-100 group-hover:-rotate-6 group-hover:-translate-x-3 transition-all duration-300 pointer-events-none" />

      {/* Front card */}
    <div className="pixel-panel p-6 flex flex-col gap-5 relative">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-['Inter'] font-bold text-base md:text-lg text-white leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-white/40 font-['Inter']">
            {project.date}&nbsp;
            <span className="text-white/25">({timeAgo(project.date)})</span>
          </p>
        </div>

        {/* Arrow */}
        <div className="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mt-1 opacity-50 group-hover:opacity-100 group-hover:border-white/50 transition-all duration-300">
          <span className="text-white text-sm">→</span>
        </div>
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="flex items-center gap-1.5 text-xs font-['Inter'] text-white/80 bg-white/8 border border-white/12 rounded-full px-3 py-1"
          >
            {techIcons[t] && <span className="text-sm">{techIcons[t]}</span>}
            {t}
          </span>
        ))}
      </div>

      {/* Preview image */}
      {project.image && (
        <div className="rounded-2xl overflow-hidden border border-white/10 mt-1">
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover max-h-52 blur-[5px]"
          />
        </div>
      )}
    </div>
    </div>
  );
}

export function Projects() {
  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Inter'] font-semibold text-lg md:text-xl text-white tracking-[0.3em]">
          PROJECTS
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-white/20 to-white/0" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  );
}
