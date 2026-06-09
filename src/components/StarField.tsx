import { useEffect, useRef } from "react";

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  alpha: number;
  dalpha: number;
  size: number;
}

function spawnFirefly(W: number, H: number, startVisible = false): Firefly {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.18,
    phase: Math.random() * Math.PI * 2,
    alpha: startVisible ? Math.random() * 0.65 + 0.1 : 0,
    dalpha: Math.random() * 0.007 + 0.003,
    size: Math.random() * 5 + 4,
  };
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const fireflies: Firefly[] = Array.from({ length: 16 }, () =>
      spawnFirefly(canvas.width, canvas.height, true)
    );

    let animId: number;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const f of fireflies) {
        f.phase += 0.011;
        f.x += f.vx + Math.sin(f.phase) * 0.22;
        f.y += f.vy + Math.cos(f.phase * 0.73) * 0.12;

        if (f.x < -30) f.x = W + 30;
        if (f.x > W + 30) f.x = -30;
        if (f.y < -30) f.y = H + 30;
        if (f.y > H + 30) f.y = -30;

        f.alpha += f.dalpha;
        if (f.alpha >= 0.88 || f.alpha <= 0.04) f.dalpha *= -1;

        const r = f.size * 3.5;
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
        grad.addColorStop(0,    `rgba(230, 240, 255, ${f.alpha})`);
        grad.addColorStop(0.25, `rgba(180, 210, 255, ${f.alpha * 0.6})`);
        grad.addColorStop(0.6,  `rgba(120, 160, 230, ${f.alpha * 0.2})`);
        grad.addColorStop(1,    `rgba(60, 100, 180, 0)`);

        ctx.beginPath();
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // pixel-art bright core
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = "#eef4ff";
        ctx.fillRect(f.x - 1, f.y - 1, 3, 3);
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
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
