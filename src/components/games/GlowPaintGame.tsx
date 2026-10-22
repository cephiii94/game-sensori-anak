import React, { useRef, useEffect, useState } from 'react';
import { HeaderNav } from '../common/HeaderNav';
import { sound } from '../../audio/soundManager';
import { Eraser, Sparkles } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  color: string;
  size: number;
  alpha: number;
}

const PALETTES = [
  { name: 'Pelangi', color: 'rainbow', preview: '🌈' },
  { name: 'Kuning Bintang', color: '#facc15', preview: '⭐' },
  { name: 'Pink Permen', color: '#f472b6', preview: '🍭' },
  { name: 'Biru Laut', color: '#38bdf8', preview: '🌊' },
  { name: 'Hijau Daun', color: '#4ade80', preview: '🍀' },
  { name: 'Ungu Sihir', color: '#c084fc', preview: '🔮' }
];

export const GlowPaintGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('rainbow');
  const isDrawingRef = useRef(false);
  const hueRef = useRef(0);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    const render = () => {
      // Gentle dark-ish or pastel background glow fade
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)'; // slow trail fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all glowing points
      for (let i = pointsRef.current.length - 1; i >= 0; i--) {
        const p = pointsRef.current[i];
        p.alpha -= 0.004;

        if (p.alpha <= 0) {
          pointsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 18;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const addPoint = (clientX: number, clientY: number) => {
    let colorToUse = selectedColor;
    if (selectedColor === 'rainbow') {
      hueRef.current = (hueRef.current + 6) % 360;
      colorToUse = `hsl(${hueRef.current}, 95%, 65%)`;
    }

    pointsRef.current.push({
      x: clientX,
      y: clientY,
      color: colorToUse,
      size: 16 + Math.random() * 8,
      alpha: 1
    });

    // Melodious audio on movement (throttled)
    if (Math.random() > 0.65) {
      sound.playPentatonicChime();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    sound.playTap();
    addPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    addPoint(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handleClear = () => {
    sound.playCelebration();
    pointsRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900 select-none touch-none">
      <HeaderNav title="✨ Cahaya Pelangi" />

      {/* Main Touch Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 cursor-crosshair z-10"
      />

      {/* Floating Instructions for toddler/parent */}
      <div className="absolute top-20 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className="bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-white/90 text-sm sm:text-base font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Usap layar dengan jari untuk membuat cahaya!</span>
        </div>
      </div>

      {/* Bottom Color Palette Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border-2 border-white/60 flex items-center gap-2 sm:gap-3">
        {PALETTES.map((item) => (
          <button
            key={item.color}
            onClick={() => {
              sound.playTap();
              setSelectedColor(item.color);
            }}
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all shadow-md active:scale-95 ${
              selectedColor === item.color
                ? 'scale-115 ring-4 ring-amber-400 font-bold'
                : 'hover:scale-105'
            }`}
            style={{
              background:
                item.color === 'rainbow'
                  ? 'linear-gradient(135deg, #f43f5e, #eab308, #10b981, #3b82f6)'
                  : item.color
            }}
          >
            <span className="drop-shadow">{item.preview}</span>
          </button>
        ))}

        <div className="w-[1px] h-8 bg-slate-300 mx-1" />

        {/* Clear Canvas Button */}
        <button
          onClick={handleClear}
          className="px-3.5 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <Eraser className="w-4 h-4" />
          <span className="hidden sm:inline">Bersihkan</span>
        </button>
      </div>
    </div>
  );
};
