export function Certifications() {
  const placeholders = Array.from({ length: 3 });

  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-16 w-full max-w-5xl">
        <h2 className="font-['Inter'] font-semibold text-lg md:text-xl text-white tracking-[0.3em]">
          CERTIFICATIONS
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-white/20 to-white/0" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {placeholders.map((_, i) => (
          <div
            key={i}
            className="pixel-panel p-6 flex flex-col gap-4 min-h-48 opacity-40"
          >
            <div className="h-4 w-2/3 rounded-full bg-white/20" />
            <div className="h-3 w-1/3 rounded-full bg-white/10" />
            <div className="flex-1" />
            <div className="h-3 w-1/2 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
