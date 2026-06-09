import { useEffect, useRef } from "react";

const LEAF_SRCS: Record<"day" | "evening", string[]> = {
  day:     Array.from({ length: 12 }, (_, i) => `/public/${i + 1}.png`),
  evening: ["/public/evening-1.png", "/public/evening-2.png", "/public/evening-3.png"],
};

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
    if (r > 238 && g > 238 && b > 238) {
      d[i + 3] = 0;
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
  hovered: boolean;
  dragging: boolean;
  exiting: boolean;
  exitVx: number;
  exitVy: number;
}

interface Mote {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; dalpha: number;
}

interface DragState {
  leaf: Leaf;
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
  hist: Array<{ x: number; y: number; t: number }>;
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
    alpha: startY != null ? Math.random() * 0.7 + 0.3 : 0,
    windPhase: Math.random() * Math.PI * 2,
    imgIdx: Math.floor(Math.random() * count),
    drawSize: Math.random() * 30 + 55,
    hovered: false,
    dragging: false,
    exiting: false,
    exitVx: 0,
    exitVy: 0,
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

const HOVER_GLOW: Record<"day" | "evening", string> = {
  day:     "#88ff44",
  evening: "#ffaa44",
};

interface ForestParticlesProps {
  timeOfDay: "day" | "evening";
}

export function ForestParticles({ timeOfDay }: ForestParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    const moteColor = MOTE_COLORS[timeOfDay];
    const glowColor = HOVER_GLOW[timeOfDay];
    const srcs = LEAF_SRCS[timeOfDay];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const processed: HTMLCanvasElement[] = [];
    srcs.forEach((src, i) => {
      const img = new Image();
      img.onload = () => { processed[i] = removeWhiteBg(img); };
      img.src = src;
    });

    const seedCount = timeOfDay === "evening" ? 20 : 4;
    const maxLeaves = timeOfDay === "evening" ? 35 : 8;

    const leaves: Leaf[] = Array.from({ length: seedCount }, () =>
      spawnLeaf(canvas.width, srcs.length, Math.random() * canvas.height)
    );

    const motes: Mote[] = Array.from({ length: 14 }, () => {
      const m = spawnMote(canvas.width, canvas.height);
      m.alpha = Math.random() * 0.5;
      return m;
    });

    let spawnTimer = 0;
    let animId: number;

    const hitTest = (l: Leaf, x: number, y: number): boolean => {
      const dx = x - l.x;
      const dy = y - l.y;
      const r = l.drawSize * l.scale * 0.55;
      return dx * dx + dy * dy < r * r;
    };

    const grabLeaf = (cx: number, cy: number): Leaf | null => {
      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i]!;
        if (l.exiting || l.dragging) continue;
        if (hitTest(l, cx, cy)) return l;
      }
      return null;
    };

    const startDrag = (leaf: Leaf, cx: number, cy: number) => {
      leaf.dragging = true;
      leaf.hovered = false;
      dragRef.current = {
        leaf,
        offsetX: leaf.x - cx,
        offsetY: leaf.y - cy,
        startX: cx,
        startY: cy,
        hist: [{ x: cx, y: cy, t: performance.now() }],
      };
    };

    const updateDrag = (cx: number, cy: number) => {
      const drag = dragRef.current;
      if (!drag) return;
      drag.leaf.x = cx + drag.offsetX;
      drag.leaf.y = cy + drag.offsetY;
      const now = performance.now();
      drag.hist.push({ x: cx, y: cy, t: now });
      while (drag.hist.length > 1 && now - drag.hist[0]!.t > 80) drag.hist.shift();
    };

    const endDrag = (cx: number, cy: number) => {
      const drag = dragRef.current;
      if (!drag) return;
      const leaf = drag.leaf;
      leaf.dragging = false;
      dragRef.current = null;

      const dist = Math.hypot(cx - drag.startX, cy - drag.startY);

      if (dist < 6) {
        // short tap/click → dismiss
        leaf.exiting = true;
        const dx = leaf.x - cx;
        const dy = leaf.y - cy;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const spd = Math.random() * 4 + 7;
        leaf.exitVx = (dx / len) * spd + (Math.random() - 0.5) * 3;
        leaf.exitVy = (dy / len) * spd - Math.random() * 3;
      } else {
        // throw — compute velocity from position history
        const h = drag.hist;
        if (h.length >= 2) {
          const newest = h[h.length - 1]!;
          const oldest = h[0]!;
          const dt = newest.t - oldest.t;
          if (dt > 0) {
            leaf.vx = ((newest.x - oldest.x) / dt) * 16.7;
            leaf.vy = ((newest.y - oldest.y) / dt) * 16.7;
          }
        }
        // clamp throw speed
        const spd = Math.sqrt(leaf.vx * leaf.vx + leaf.vy * leaf.vy);
        if (spd > 22) { leaf.vx = (leaf.vx / spd) * 22; leaf.vy = (leaf.vy / spd) * 22; }
      }
    };

    // ── mouse events ────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      const leaf = grabLeaf(e.clientX, e.clientY);
      if (leaf) startDrag(leaf, e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      updateDrag(e.clientX, e.clientY);
    };

    const onMouseUp = (e: MouseEvent) => {
      endDrag(e.clientX, e.clientY);
    };

    // ── touch events ────────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = { x: t.clientX, y: t.clientY };
      const leaf = grabLeaf(t.clientX, t.clientY);
      if (leaf) { e.preventDefault(); startDrag(leaf, t.clientX, t.clientY); }
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = { x: t.clientX, y: t.clientY };
      if (dragRef.current) { e.preventDefault(); updateDrag(t.clientX, t.clientY); }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t) endDrag(t.clientX, t.clientY);
    };

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isDragging = dragRef.current !== null;

      if (++spawnTimer >= 120 && leaves.length < maxLeaves) {
        leaves.push(spawnLeaf(W, srcs.length));
        spawnTimer = 0;
      }

      // ── update leaves ───────────────────────────────────────────────
      let anyHovered = false;
      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i]!;

        if (l.exiting) {
          l.x += l.exitVx;
          l.y += l.exitVy;
          l.exitVy += 0.18;
          l.exitVx *= 0.98;
          l.angle += l.exitVx * 0.04;
          l.alpha = Math.max(0, l.alpha - 0.035);
          if (l.alpha <= 0 || l.y > H + 120 || l.x < -200 || l.x > W + 200) {
            leaves.splice(i, 1);
          }
          continue;
        }

        if (l.dragging) {
          // lean toward upright while held
          l.angle += (0 - l.angle) * 0.1;
          l.alpha = Math.min(1, l.alpha + 0.04);
          anyHovered = true;
          continue;
        }

        // decay throw velocity back toward natural leaf fall
        const throwSpd = Math.sqrt(l.vx * l.vx + l.vy * l.vy);
        if (throwSpd > 1.2) {
          l.vx *= 0.93;
          l.vy = l.vy * 0.93 + (Math.random() * 0.55 + 0.25) * 0.07;
        }

        l.hovered = hitTest(l, mx, my);
        if (l.hovered) anyHovered = true;

        l.windPhase += 0.013;

        if (l.hovered) {
          l.x += Math.sin(l.windPhase) * 0.15;
          l.angle += Math.sin(l.windPhase * 1.7) * 0.004;
          l.alpha = Math.min(1, l.alpha + 0.04);
        } else {
          l.x += l.vx + Math.sin(l.windPhase) * 0.48;
          l.y += l.vy;
          l.angle += l.vangle;

          if (l.y < 120)          l.alpha = Math.min(1, l.alpha + 0.04);
          else if (l.y > H - 100) l.alpha = Math.max(0, l.alpha - 0.022);
          else                    l.alpha = Math.min(1, l.alpha + 0.04);

          if (l.y > H + 60) leaves.splice(i, 1);
        }
      }

      if (isDragging)      document.body.style.cursor = "grabbing";
      else if (anyHovered) document.body.style.cursor = "grab";
      else                 document.body.style.cursor = "";

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

      for (const l of leaves) {
        const img = processed[l.imgIdx];
        if (!img) continue;

        const w = l.drawSize * l.scale;
        const h = w * (img.height / img.width);

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        ctx.globalAlpha = l.alpha;
        ctx.imageSmoothingEnabled = false;

        if (l.hovered || l.dragging) {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = l.dragging ? 30 : 20;
        }

        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.body.style.cursor = "";
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
