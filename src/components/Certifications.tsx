import { useState } from 'react';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}

const certs: Cert[] = [
  {
    title: 'Introducing Generative AI in Academic Research for Students',
    issuer: 'Chula MOOC · AI Series',
    date: '22 May 2025',
    image: '/public/1747881153050.jpg',
  },
  {
    title: 'Introducing Generative AI in Academic Research for Students',
    issuer: 'Chula MOOC · AI Series',
    date: '22 May 2025',
    image: '/public/1747881153050.jpg',
  },
];

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="w-full rounded-lg shadow-2xl" />
      </div>
    </div>
  );
}

function CertCard({ cert }: { cert: Cert }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      {lightbox && (
        <Lightbox src={cert.image} alt={cert.title} onClose={() => setLightbox(false)} />
      )}

      <div className="relative group cursor-pointer">
        {/* Front card */}
        <div className="relative pixel-panel overflow-hidden flex flex-col">
          {/* Certificate image */}
          <div
            className="relative overflow-hidden cursor-zoom-in"
            onClick={() => setLightbox(true)}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full object-cover aspect-4/2.5 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[rgba(10,30,20,0.85)] via-transparent to-transparent" />
            {/* Zoom hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 rounded-full p-3">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Certificate badge */}
          <div className="px-5 pt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-['Inter'] tracking-[0.15em] text-white/60 uppercase">
              <svg className="w-3 h-3 text-green-400" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Certificate
            </span>
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col gap-2">
            <p className="text-[10px] font-['Inter'] tracking-[0.2em] text-green-400/70 uppercase">
              {cert.issuer}
            </p>
            <h3 className="font-['Inter'] font-semibold text-sm text-white leading-snug">
              {cert.title}
            </h3>
            <p className="text-xs text-white/35 font-['Inter'] mt-1">{cert.date}</p>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-4xl bg-linear-to-bl from-green-500/10 to-transparent pointer-events-none" />
        </div>
      </div>

      {cert.link && (
        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hidden" />
      )}
    </>
  );
}

export function Certifications() {
  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Inter'] font-semibold text-lg md:text-xl text-white tracking-[0.3em]">
          CERTIFICATIONS
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-white/20 to-white/0" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {certs.map((c) => (
          <CertCard key={c.title} cert={c} />
        ))}
      </div>
    </div>
  );
}
