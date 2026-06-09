import { useEffect, useRef } from "react";

const LEAF_SRCS = Array.from({ length: 12 }, (_, i) => `/public/${i + 1}.png`);

// Strip white/near-white background from a loaded image → returns an OffscreenCanvas
function removeWhiteBg(img: HTMLImageElement): HTMLCanvasElement {
  const oc = document.createElement("canvas");
  oc.width = img.naturalWidth;
  oc.height = img.naturalHeight;
  const cx = oc.getContext("2d")!;
  cx.drawImage(img, 0, 0);

  const id = cx.getImageData(0, 0, oc.width, oc.height);
  const d = id.data;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i]!, g = d[i + 1]!, b = d[i + 2]!;
    // Hard-transparent: very close to white
    if (r > 238 && g > 238 && b > 238) {
      d[i + 3] = 0;
    // Soft edge: semi-transparent near-white pixels
    } else if (r > 210 && g > 210 && b > 210) {
      const t = (Math.min(r, g, b) - 210) / 28;
      d[i + 3] = Math.round(d[i + 3]! * (1 - t));
    }
  }

  cx.putImageData(id, 0, 0);
  return oc;
}

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vangle: number;
  scale: number;
  alpha: number;
  windPhase: number;
  imgIdx: number;
  drawSize: number;
}

interface Mote {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; dalpha: number;
}

function spawnLeaf(W: number, count: number, startY?: number): Leaf {
  return {
    x: Math.random() * W,
    y: startY ?? -70,
    vx: (Math.random() - 0.35) * 0.6,
    vy: Math.random() * 0.55 + 0.25,
    angle: Math.random() * Math.PI * 2,
    vangle: (Math.random() - 0.5) * 0.022,
    scale: Math.random() * 0.5 + 0.85,
    alpha: startY != null ? Math.random() * 0.7 + 0.3 : 0, // pre-seeded leaves start visible
    windPhase: Math.random() * Math.PI * 2,
    imgIdx: Math.floor(Math.random() * count),
    drawSize: Math.random() * 30 + 55, // 55–85 px
  };
}

function spawnMote(W: number, H: number): Mote {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -(Math.random() * 0.13 + 0.04),
    alpha: 0,
    dalpha: Math.random() * 0.006 + 0.002,
  };
}

const MOTE_COLORS: Record<"day" | "evening", { outer: string; mid: string; inner: string }> = {
  day:     { outer: "#80e860", mid: "#a8ff78", inner: "#d8ffb0" },
  evening: { outer: "#e08020", mid: "#ffaa44", inner: "#ffe0a0" },
};

interface ForestParticlesProps {
  timeOfDay: "day" | "evening";
}

export function ForestParticles({ timeOfDay }: ForestParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const moteColor = MOTE_COLORS[timeOfDay];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Load + strip background for all 12 images
    const processed: HTMLCanvasElement[] = [];
    LEAF_SRCS.forEach((src, i) => {
      const img = new Image();
      img.onload = () => { processed[i] = removeWhiteBg(img); };
      img.src = src;
    });

    // Pre-seed leaves scattered across the screen so they're visible immediately
    const leaves: Leaf[] = Array.from({ length: 4 }, () =>
      spawnLeaf(canvas.width, LEAF_SRCS.length, Math.random() * canvas.height)
    );

    const motes: Mote[] = Array.from({ length: 14 }, () => {
      const m = spawnMote(canvas.width, canvas.height);
      m.alpha = Math.random() * 0.5;
      return m;
    });

    let spawnTimer = 0;
    let animId: number;

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Spawn a new leaf every ~120 frames, cap at 8
      if (++spawnTimer >= 120 && leaves.length < 8) {
        leaves.push(spawnLeaf(W, LEAF_SRCS.length));
        spawnTimer = 0;
      }

      // ── update leaves ───────────────────────────────────────────────
      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i]!;
        l.windPhase += 0.013;
        // gentle horizontal sway + slight rightward drift (breeze)
        l.x += l.vx + Math.sin(l.windPhase) * 0.48;
        l.y += l.vy;
        l.angle += l.vangle;

        if (l.y < 120)        l.alpha = Math.min(1, l.alpha + 0.04);
        else if (l.y > H - 100) l.alpha = Math.max(0, l.alpha - 0.022);
        else                  l.alpha = Math.min(1, l.alpha + 0.04);

        if (l.y > H + 60) leaves.splice(i, 1);
      }

      // ── update motes ────────────────────────────────────────────────
      for (const m of motes) {
        m.x += m.vx + (Math.random() - 0.5) * 0.1;
        m.y += m.vy;
        m.alpha += m.dalpha;
        if (m.alpha >= 0.68) m.dalpha = -Math.abs(m.dalpha);
        if (m.alpha <= 0 || m.y < -10) Object.assign(m, spawnMote(W, H));
      }

      // ── draw ────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // motes (fireflies / light dust)
      for (const m of motes) {
        ctx.save();
        ctx.globalAlpha = m.alpha * 0.22;
        ctx.fillStyle = moteColor.outer;
        ctx.fillRect(m.x - 5, m.y - 5, 10, 10);
        ctx.globalAlpha = m.alpha * 0.5;
        ctx.fillStyle = moteColor.mid;
        ctx.fillRect(m.x - 2, m.y - 2, 5, 5);
        ctx.globalAlpha = m.alpha;
        ctx.fillStyle = moteColor.inner;
        ctx.fillRect(m.x - 1, m.y - 1, 3, 3);
        ctx.restore();
      }

      // leaves
      for (const l of leaves) {
        const img = processed[l.imgIdx];
        if (!img) continue;

        const w = l.drawSize * l.scale;
        const h = w * (img.height / img.width);

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        ctx.globalAlpha = l.alpha;
        ctx.imageSmoothingEnabled = false; // keep pixel-art crispness
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
