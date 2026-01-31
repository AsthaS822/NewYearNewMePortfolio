import { useEffect, useRef } from "react";

export default function CinematicNoise({ opacity = 0.03 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let glitchTimer = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      // Generate noise
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;     // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        data[i + 3] = 255; // A
      }

      ctx.putImageData(imageData, 0, 0);

      // Random Glitch Effect
      glitchTimer++;
      if (glitchTimer > 180 + Math.random() * 120) { // Every 3-5 seconds (60fps)
        const offset = (Math.random() - 0.5) * 20;
        ctx.drawImage(canvas, offset, 0);
        if (glitchTimer > 200 + Math.random() * 120) glitchTimer = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999] mix-blend-screen"
      style={{ opacity }}
    />
  );
}
