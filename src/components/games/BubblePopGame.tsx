import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderNav } from '../common/HeaderNav';
import { sound } from '../../audio/soundManager';

interface Bubble {
  id: number;
  x: number; // percentage from left (5% to 90%)
  size: number; // pixel diameter (80 to 140px for easy toddler touch)
  speed: number; // vertical animation duration
  color: string;
  emoji: string;
  popped: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

const BUBBLE_COLORS = [
  'from-pink-300/80 to-rose-400/80 border-rose-300',
  'from-sky-300/80 to-blue-400/80 border-sky-300',
  'from-amber-200/80 to-yellow-400/80 border-yellow-300',
  'from-emerald-300/80 to-teal-400/80 border-emerald-300',
  'from-purple-300/80 to-violet-400/80 border-purple-300',
  'from-orange-300/80 to-amber-400/80 border-orange-300'
];

const EMOJIS = ['⭐', '🌸', '🍓', '🎈', '🐣', '🦋', '🍭', '💖', '🐠', '🌈'];

export const BubblePopGame: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [popCount, setPopCount] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const bubbleIdCounter = useRef(1);

  // Spawn bubbles periodically to maintain a cheerful sensory screen
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const getRandomSize = () => isMobile ? 65 + Math.random() * 35 : 85 + Math.random() * 45;
    const getRandomX = () => 6 + Math.random() * (isMobile ? 74 : 84);

    // Initial batch
    const initialList: Bubble[] = Array.from({ length: 7 }).map(() => ({
      id: bubbleIdCounter.current++,
      x: getRandomX(),
      size: getRandomSize(),
      speed: 7 + Math.random() * 4,
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      popped: false
    }));
    setBubbles(initialList);

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.filter((b) => !b.popped).length < 8) {
          const newBubble: Bubble = {
            id: bubbleIdCounter.current++,
            x: getRandomX(),
            size: getRandomSize(),
            speed: 7 + Math.random() * 4,
            color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            popped: false
          };
          return [...prev, newBubble];
        }
        return prev;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  // Particle explosion loop for popped bubbles
  useEffect(() => {
    let animId: number;
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gentle gravity
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const spawnParticles = (x: number, y: number) => {
    const colors = ['#f472b6', '#38bdf8', '#facc15', '#4ade80', '#c084fc', '#ffffff'];
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16 + (Math.random() * 0.4 - 0.2);
      const speed = 3 + Math.random() * 6;
      particlesRef.current.push({
        id: Math.random(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: 4 + Math.random() * 5
      });
    }
  };

  const handlePop = (id: number, e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    sound.playBubblePop();
    sound.playPentatonicChime();

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    spawnParticles(centerX, centerY);

    setPopCount((prev) => prev + 1);
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  // Touching empty screen triggers gentle ripple chime
  const handleScreenTouch = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only if touching background, not bubble
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    sound.playBubblePop();
    spawnParticles(e.clientX, e.clientY);
  };

  return (
    <div
      onPointerDown={handleScreenTouch}
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-200 via-blue-100 to-teal-100 select-none touch-none"
    >
      <HeaderNav title="🫧 Gelembung Ajaib" />

      {/* Confetti & Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

      {/* Cheerful Counter */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full shadow-md border-2 border-white flex items-center gap-2 sm:gap-3">
        <span className="text-2xl sm:text-3xl">🎈</span>
        <div>
          <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase leading-tight">Letusan Ceria</p>
          <p className="text-lg sm:text-2xl font-bold text-sky-600 leading-tight">{popCount}</p>
        </div>
      </div>

      {/* Gentle Floating Clouds Background */}
      <div className="absolute top-16 left-10 w-48 h-20 bg-white/40 rounded-full blur-xl pointer-events-none animate-pulse-gentle" />
      <div className="absolute top-36 right-16 w-64 h-24 bg-white/50 rounded-full blur-2xl pointer-events-none animate-pulse-gentle" />

      {/* Bubbles Floating */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ y: '110vh', opacity: 0.9, scale: 0.8 }}
            animate={{
              y: '-25vh',
              x: [0, 18, -18, 0],
              opacity: 1,
              scale: [1, 1.05, 0.96, 1]
            }}
            transition={{
              y: {
                duration: bubble.speed,
                ease: 'linear'
              },
              x: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            onAnimationComplete={() => {
              setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
            }}
            onPointerDown={(e) => handlePop(bubble.id, e)}
            style={{
              left: `${bubble.x}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`
            }}
            className={`absolute z-10 cursor-pointer rounded-full bg-gradient-to-br ${bubble.color} border-2 backdrop-blur-sm shadow-inner flex items-center justify-center transform active:scale-125 transition-transform`}
          >
            {/* Gloss reflection highlight */}
            <div className="absolute top-2 left-3 w-5 h-2.5 rounded-full bg-white/70 rotate-[-30deg]" />
            <div className="absolute top-4 left-2 w-2 h-2 rounded-full bg-white/60" />

            {/* Toddler-friendly icon inside */}
            <span className="text-3xl sm:text-4xl filter drop-shadow select-none pointer-events-none">
              {bubble.emoji}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
