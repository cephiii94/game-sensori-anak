import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HeaderNav } from '../common/HeaderNav';
import { sound } from '../../audio/soundManager';

export type AnimalCategory = 'ocean' | 'dino' | 'sky';

export interface BubbleCharacter {
  name: string;
  imageUrl?: string;
  emoji: string;
  category?: AnimalCategory;
}

export type GameTheme = 'sky' | 'ocean' | 'dino' | 'night';

export interface ThemeConfig {
  id: GameTheme;
  name: string;
  icon: string;
  bgGradient: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'sky',
    name: 'Langit Ceria',
    icon: '☁️',
    bgGradient: 'from-sky-300 via-sky-100 to-teal-50'
  },
  {
    id: 'ocean',
    name: 'Bawah Laut',
    icon: '🌊',
    bgGradient: 'from-cyan-700 via-sky-600 to-teal-800'
  },
  {
    id: 'dino',
    name: 'Rimba Dino',
    icon: '🌴',
    bgGradient: 'from-emerald-700 via-teal-600 to-lime-800'
  },
  {
    id: 'night',
    name: 'Malam Ajaib',
    icon: '🌙',
    bgGradient: 'from-slate-950 via-indigo-950 to-purple-950'
  }
];

// Helper untuk optimasi otomatis Cloudinary (format webp/avif, kualitas auto, ukuran 200x200)
const optimizeCloudinary = (url: string) => {
  return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_200,h_200,c_fill/');
};

// Koleksi karakter hewan & dino di dalam gelembung terkelompok sesuai habitatnya
export const BUBBLE_CHARACTERS: BubbleCharacter[] = [
  {
    name: 'Sapi',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792883856/Chibbi_Cow_ixjedt.jpg'),
    emoji: '🐮',
    category: 'sky'
  },
  {
    name: 'Kura-kura',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792887796/Chibbi_Turtle_c1bfdn.jpg'),
    emoji: '🐢',
    category: 'ocean'
  },
  {
    name: 'Paus',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792887277/Chibbi_Whale_ctplbt.jpg'),
    emoji: '🐳',
    category: 'ocean'
  },
  {
    name: 'Kepiting',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792887277/Chibbi_Crab_dzifmu.jpg'),
    emoji: '🦀',
    category: 'ocean'
  },
  {
    name: 'Hiu',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792887277/Chibbi_Shark_vznhop.jpg'),
    emoji: '🦈',
    category: 'ocean'
  },
  {
    name: 'Kelinci',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792885027/Chibbi_Bunny_zkclah.jpg'),
    emoji: '🐰',
    category: 'sky'
  },
  {
    name: 'Monyet',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792885026/Chiibi_Monkey_fm22we.jpg'),
    emoji: '🐵',
    category: 'sky'
  },
  {
    name: 'Bebek',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792885027/Chibbi_Duck_mjdjfc.jpg'),
    emoji: '🦆',
    category: 'sky'
  },
  {
    name: 'Jerapah',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792885027/Chibbi_Giraffe_r2gcho.jpg'),
    emoji: '🦒',
    category: 'sky'
  },
  {
    name: 'Bintang Laut',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792887796/Chibbi_Starfish_fra8af.jpg'),
    emoji: '⭐',
    category: 'ocean'
  },
  {
    name: 'T-Rex',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792887796/Chibbi_TRex_snhsnv.jpg'),
    emoji: '🦖',
    category: 'dino'
  },
  {
    name: 'Triceratops',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792888192/Chibbi_Triceratops_kifzca.jpg'),
    emoji: '🦕',
    category: 'dino'
  },
  {
    name: 'Brachiosaurus',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792888191/Chibbi_Brachiosaurus_ysiui7.jpg'),
    emoji: '🦕',
    category: 'dino'
  },
  {
    name: 'Stegosaurus',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792888192/Chibbi_Stegosaurus_kgd5mf.jpg'),
    emoji: '🦕',
    category: 'dino'
  },
  {
    name: 'Pterodactyl',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792888193/Chibbi_Pterodactyl_brtrzs.jpg'),
    emoji: '🦅',
    category: 'dino'
  },
  {
    name: 'Ankylosaurus',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792888194/Chibbi_Ankylosaurus_kbrfxn.jpg'),
    emoji: '🦕',
    category: 'dino'
  },
  {
    name: 'Parasaurolophus',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792888390/Chibbi_Parasaurolophus_jxglog.jpg'),
    emoji: '🦕',
    category: 'dino'
  },
  {
    name: 'Spinosaurus',
    imageUrl: optimizeCloudinary('https://res.cloudinary.com/dx4pxe7ji/image/upload/v1792888393/Chibbi_Spinosaurus_xbjcyx.jpg'),
    emoji: '🦖',
    category: 'dino'
  }
];

interface Bubble {
  id: number;
  x: number; // percentage from left (6% to 88%)
  size: number; // diameter in px
  speed: number; // seconds to float from bottom to top
  color: string;
  character: BubbleCharacter;
  createdAt: number;
  initialY?: string; // used for initial staggered bubbles
  isGiant?: boolean;
  isBaby?: boolean;
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

const MAX_ACTIVE_BUBBLES = 9;

export const BubblePopGame: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [popCount, setPopCount] = useState<number>(0);
  const [lastPopped, setLastPopped] = useState<BubbleCharacter | null>(null);
  const [currentTheme, setCurrentTheme] = useState<GameTheme>('sky');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const bubbleIdCounter = useRef(1);
  const poppedSetRef = useRef<Set<number>>(new Set());
  const bubblesRef = useRef<Bubble[]>([]);
  const themeRef = useRef<GameTheme>('sky');

  // Keep bubblesRef and themeRef synchronized for spawn calculations
  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  useEffect(() => {
    themeRef.current = currentTheme;
  }, [currentTheme]);

  // Preload Cloudinary images on mount so they appear instantly without flickering
  useEffect(() => {
    BUBBLE_CHARACTERS.forEach((char) => {
      if (char.imageUrl) {
        const img = new Image();
        img.src = char.imageUrl;
      }
    });
  }, []);

  // Auto-dismiss last popped animal toast after 2.5s so screen stays clean & focused on bubbles
  useEffect(() => {
    if (!lastPopped) return;
    const timer = setTimeout(() => {
      setLastPopped(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [lastPopped, popCount]);

  const getCharacterForTheme = (theme: GameTheme): BubbleCharacter => {
    if (theme === 'night') {
      return BUBBLE_CHARACTERS[Math.floor(Math.random() * BUBBLE_CHARACTERS.length)];
    }

    // 85% chance for category matching the theme, 15% surprise visitor
    if (Math.random() < 0.85) {
      const matching = BUBBLE_CHARACTERS.filter((c) => c.category === theme);
      if (matching.length > 0) {
        return matching[Math.floor(Math.random() * matching.length)];
      }
    }

    return BUBBLE_CHARACTERS[Math.floor(Math.random() * BUBBLE_CHARACTERS.length)];
  };

  const createBubbleData = (customY?: string, forceGiant?: boolean): Bubble => {
    const width = window.innerWidth;
    const hasGiantAlready = (bubblesRef.current || []).some((b) => b.isGiant);
    // At most 1 giant bubble on screen, ~16% chance if none present
    const isGiant = forceGiant !== undefined ? forceGiant : (!hasGiantAlready && Math.random() < 0.16);

    let size: number;
    let speed: number;

    if (isGiant) {
      if (width < 640) {
        size = 150 + Math.random() * 30; // Mobile Giant: 150px - 180px
      } else if (width < 1024) {
        size = 190 + Math.random() * 35; // Tablet Giant: 190px - 225px
      } else {
        size = 230 + Math.random() * 45; // Desktop Giant: 230px - 275px
      }
      speed = 10 + Math.random() * 3.5; // Floats gently & majestically
    } else {
      if (width < 640) {
        size = 70 + Math.random() * 35; // HP / Mobile: 70px - 105px
      } else if (width < 1024) {
        size = 95 + Math.random() * 45; // Tablet: 95px - 140px
      } else {
        size = 115 + Math.random() * 55; // Layar Lebar / Desktop: 115px - 170px
      }
      speed = 7 + Math.random() * 4;
    }

    const isMobile = width < 640;
    // Giant bubbles spawn more towards the center
    const x = isGiant 
      ? 15 + Math.random() * (isMobile ? 55 : 65) 
      : 5 + Math.random() * (isMobile ? 75 : 85);

    const randomChar = getCharacterForTheme(themeRef.current);
    const giantColors = [
      'from-amber-200/90 via-pink-300/85 to-purple-400/90 border-amber-300',
      'from-yellow-200/90 via-emerald-300/85 to-sky-400/90 border-yellow-300',
      'from-rose-200/90 via-violet-300/85 to-indigo-400/90 border-rose-300'
    ];

    return {
      id: bubbleIdCounter.current++,
      x,
      size,
      speed,
      color: isGiant
        ? giantColors[Math.floor(Math.random() * giantColors.length)]
        : BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      character: randomChar,
      createdAt: Date.now(),
      initialY: customY,
      isGiant
    };
  };

  // Continuous Spawner & Staggered Initialization
  useEffect(() => {
    // 1. Initial batch distributed across screen heights (4th bubble is guaranteed giant)
    const initialHeights = ['15vh', '35vh', '55vh', '75vh', '95vh', '105vh', '115vh'];
    const initialBubbles = initialHeights.map((h, idx) => createBubbleData(h, idx === 3));
    setBubbles(initialBubbles);

    // 2. Continuous interval to clean up old off-screen bubbles & spawn new ones
    const interval = setInterval(() => {
      const now = Date.now();
      setBubbles((prev) => {
        // Remove bubbles that have floated past the top screen
        const alive = prev.filter((b) => {
          const lifetime = (now - b.createdAt) / 1000;
          return lifetime < b.speed + 1.5;
        });

        // Maintain constant stream of bubbles
        if (alive.length < MAX_ACTIVE_BUBBLES) {
          const needed = MAX_ACTIVE_BUBBLES - alive.length;
          const toAdd = Math.min(2, needed);
          const newBubbles: Bubble[] = [];
          for (let i = 0; i < toAdd; i++) {
            newBubbles.push(createBubbleData('110vh'));
          }
          return [...alive, ...newBubbles];
        }

        return alive;
      });
    }, 700);

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

  const spawnParticles = (x: number, y: number, count = 18) => {
    const colors = ['#f472b6', '#38bdf8', '#facc15', '#4ade80', '#c084fc', '#ffffff', '#fb923c'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const speed = 3.5 + Math.random() * (count > 20 ? 8 : 6);
      particlesRef.current.push({
        id: Math.random(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: (count > 20 ? 5 : 4) + Math.random() * 6
      });
    }
  };

  const handlePop = (id: number, e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (poppedSetRef.current.has(id)) return;
    poppedSetRef.current.add(id);

    // Calculate coordinates for burst particles
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;

    const native = e.nativeEvent as PointerEvent | MouseEvent | TouchEvent;
    if (native && 'clientX' in native && typeof native.clientX === 'number') {
      clientX = native.clientX;
      clientY = native.clientY;
    } else if (e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      clientX = rect.left + rect.width / 2;
      clientY = rect.top + rect.height / 2;
    }

    const poppedBubble = bubbles.find((b) => b.id === id);

    if (poppedBubble?.isGiant) {
      // 🌟 GIANT BUBBLE POPPED!
      // 1. Celebratory sound & double vibration
      sound.playCelebration();

      // 2. Confetti burst centered at popping position
      try {
        confetti({
          particleCount: 42,
          spread: 75,
          origin: {
            x: Math.max(0.08, Math.min(0.92, clientX / window.innerWidth)),
            y: Math.max(0.08, Math.min(0.92, clientY / window.innerHeight))
          },
          colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#10b981', '#fbbf24']
        });
      } catch {
        // Safe fallback if canvas is not ready
      }

      // 3. Extra large particle burst
      spawnParticles(clientX, clientY, 34);

      // 4. Bonus +5 points for toddlers!
      setPopCount((prev) => prev + 5);

      // 5. Cheerful celebration toast
      setLastPopped({
        name: `⭐ ${poppedBubble.character.name} Raksasa!`,
        imageUrl: poppedBubble.character.imageUrl,
        emoji: poppedBubble.character.emoji,
        category: poppedBubble.character.category
      });

      // 6. SPLIT INTO 3-4 BABY BUBBLES floating upwards from pop location!
      const babyCount = 3 + Math.floor(Math.random() * 2); // 3 or 4
      const bubbleYPercent = Math.max(12, Math.min(88, (clientY / window.innerHeight) * 100));
      const babyBubbles: Bubble[] = [];

      for (let i = 0; i < babyCount; i++) {
        const xOffset = (i - (babyCount - 1) / 2) * 8 + (Math.random() * 4 - 2);
        const babyX = Math.max(6, Math.min(84, poppedBubble.x + xOffset));
        const isMobile = window.innerWidth < 640;
        const babySize = isMobile ? 55 + Math.random() * 15 : 70 + Math.random() * 20;
        const babySpeed = 5.2 + Math.random() * 2;

        babyBubbles.push({
          id: bubbleIdCounter.current++,
          x: babyX,
          size: babySize,
          speed: babySpeed,
          color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
          character: getCharacterForTheme(themeRef.current),
          createdAt: Date.now(),
          initialY: `${bubbleYPercent}vh`,
          isBaby: true
        });
      }

      // Replace giant with baby bubbles + 1 replacement from bottom
      setBubbles((prev) => {
        const filtered = prev.filter((b) => b.id !== id);
        const replacement = createBubbleData('110vh');
        return [...filtered, ...babyBubbles, replacement];
      });
    } else {
      // Regular bubble pop
      sound.playBubblePop();
      sound.playPentatonicChime();
      sound.triggerHaptic(30);

      // Visual burst
      spawnParticles(clientX, clientY, 18);
      setPopCount((prev) => prev + 1);

      if (poppedBubble) {
        setLastPopped(poppedBubble.character);
      }

      // Remove popped bubble immediately and spawn fresh one from bottom
      setBubbles((prev) => {
        const filtered = prev.filter((b) => b.id !== id);
        const replacement = createBubbleData('110vh');
        return [...filtered, replacement];
      });
    }

    // Cleanup set
    setTimeout(() => {
      poppedSetRef.current.delete(id);
    }, 1000);
  };

  // Touching empty screen triggers gentle ripple chime & particle
  const handleScreenTouch = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    sound.playBubblePop();
    spawnParticles(e.clientX, e.clientY);
  };

  const activeTheme = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div
      onPointerDown={handleScreenTouch}
      className={`relative w-full h-full overflow-hidden bg-gradient-to-b ${activeTheme.bgGradient} select-none touch-none transition-all duration-700`}
    >
      <HeaderNav title="🫧 Gelembung Ajaib" />

      {/* Theme Atmosphere Selector (Top Left Capsule) */}
      <div className="fixed top-3 left-3 sm:top-5 sm:left-5 z-40 bg-white/80 hover:bg-white/95 backdrop-blur-md p-1 sm:p-1.5 rounded-full shadow-lg border-2 border-white/80 flex items-center gap-1 sm:gap-1.5 transition-all">
        {THEMES.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <motion.button
              key={theme.id}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                sound.playPentatonicChime();
                setCurrentTheme(theme.id);
              }}
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-base transition-all cursor-pointer pointer-events-auto ${
                isActive
                  ? 'bg-white shadow-md scale-110 ring-2 ring-sky-300'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
              title={theme.name}
              aria-label={theme.name}
            >
              {theme.icon}
            </motion.button>
          );
        })}
      </div>

      {/* Confetti & Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

      {/* Minimalist Floating Bubble Counter (Responsive: Mini on mobile, gracefully scaled on wide screens) */}
      <motion.div
        key={popCount}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 450, damping: 20 }}
        className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 md:bottom-6 md:left-6 z-20 bg-white/75 hover:bg-white/90 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border border-white/80 flex items-center gap-1.5 sm:gap-2.5 pointer-events-none select-none transition-all"
      >
        <span className="text-sm sm:text-lg md:text-xl leading-none">🫧</span>
        <span className="text-xs sm:text-base md:text-lg font-bold text-slate-800 tabular-nums leading-none">{popCount}</span>
      </motion.div>

      {/* Ephemeral Compact Animal Badge (Responsive on wide screens) */}
      <AnimatePresence>
        {lastPopped && (
          <motion.div
            key={`${lastPopped.name}-${popCount}`}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-20 bg-white/80 backdrop-blur-md px-2.5 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border border-white/80 flex items-center gap-1.5 sm:gap-2.5 pointer-events-none select-none transition-all"
          >
            {lastPopped.imageUrl ? (
              <img
                src={lastPopped.imageUrl}
                alt={lastPopped.name}
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full object-cover border border-white/80"
              />
            ) : (
              <span className="text-sm sm:text-lg md:text-xl leading-none">{lastPopped.emoji}</span>
            )}
            <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 leading-none">{lastPopped.name}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Theme Atmosphere Decorations */}
      {currentTheme === 'sky' && (
        <>
          <div className="absolute top-12 left-10 w-48 h-20 bg-white/40 rounded-full blur-xl pointer-events-none animate-pulse-gentle" />
          <div className="absolute top-28 right-16 w-64 h-24 bg-white/50 rounded-full blur-2xl pointer-events-none animate-pulse-gentle" />
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-200/35 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {currentTheme === 'ocean' && (
        <>
          {/* Underwater Sunlight Caustics & Seaweed */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-cyan-200/20 via-sky-300/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-8 text-3xl opacity-40 pointer-events-none animate-pulse select-none">🌿</div>
          <div className="absolute bottom-4 right-12 text-3xl opacity-40 pointer-events-none animate-pulse select-none">🪸</div>
          <div className="absolute bottom-6 left-1/3 text-2xl opacity-35 pointer-events-none animate-pulse select-none">🌿</div>
        </>
      )}

      {currentTheme === 'dino' && (
        <>
          {/* Prehistoric Jungle Canopy Foliage */}
          <div className="absolute top-4 left-6 text-3xl sm:text-4xl opacity-50 pointer-events-none select-none">🌿</div>
          <div className="absolute top-6 right-8 text-3xl sm:text-4xl opacity-50 pointer-events-none select-none">🌴</div>
          <div className="absolute bottom-3 left-10 text-3xl opacity-40 pointer-events-none select-none">🌾</div>
          <div className="absolute bottom-4 right-14 text-3xl opacity-40 pointer-events-none select-none">🌿</div>
        </>
      )}

      {currentTheme === 'night' && (
        <>
          {/* Peaceful Smiling Moon & Twinkling Stars (Night-Sensory Calm) */}
          <div className="absolute top-12 right-8 sm:top-14 sm:right-16 text-3xl sm:text-4xl pointer-events-none select-none drop-shadow-[0_0_12px_rgba(253,224,71,0.6)] animate-pulse">
            🌙
          </div>
          <div className="absolute top-20 left-16 text-yellow-200/80 text-sm sm:text-base pointer-events-none select-none animate-ping">✨</div>
          <div className="absolute top-36 right-36 text-yellow-100/70 text-xs sm:text-sm pointer-events-none select-none animate-pulse">⭐</div>
          <div className="absolute top-52 left-1/4 text-yellow-200/70 text-base pointer-events-none select-none animate-ping">✨</div>
          <div className="absolute bottom-32 right-1/4 text-yellow-100/60 text-xs pointer-events-none select-none animate-pulse">⭐</div>
        </>
      )}

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ y: bubble.initialY || '110vh', opacity: 0.95 }}
          animate={{ y: '-25vh', opacity: 1 }}
          transition={{
            duration: bubble.speed,
            ease: 'linear'
          }}
          onPointerDown={(e) => handlePop(bubble.id, e)}
          onTouchStart={(e) => handlePop(bubble.id, e)}
          onClick={(e) => handlePop(bubble.id, e)}
          onPointerEnter={(e) => {
            // Swipe-to-pop support when finger or mouse button is held down
            if (e.buttons > 0) handlePop(bubble.id, e);
          }}
          style={{
            left: `${bubble.x}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`
          }}
          className="absolute z-10 cursor-pointer pointer-events-auto touch-manipulation select-none"
        >
          {/* Inner Wobble with smooth oscillation (pointer-events-none so hits register on outer target) */}
          <motion.div
            animate={{
              x: bubble.isGiant ? [-15, 15, -15] : [-10, 10, -10],
              scale: bubble.isGiant ? [1, 1.08, 0.94, 1] : [1, 1.05, 0.96, 1]
            }}
            transition={{
              x: { duration: bubble.isGiant ? 4.2 : 3.2, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: bubble.isGiant ? 3.0 : 2.4, repeat: Infinity, ease: 'easeInOut' }
            }}
            className={`w-full h-full rounded-full bg-gradient-to-br ${bubble.color} ${
              bubble.isGiant
                ? 'border-4 border-amber-300 ring-4 ring-amber-300/60 shadow-[0_0_30px_rgba(251,191,36,0.6)]'
                : 'border-2 shadow-inner'
            } backdrop-blur-sm flex items-center justify-center transform active:scale-95 transition-transform pointer-events-none relative`}
          >
            {/* Shimmering Badge for Giant Bubble */}
            {bubble.isGiant && (
              <div className="absolute -top-3.5 sm:-top-4.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-950 font-black text-[9px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md border-2 border-white animate-bounce flex items-center gap-1 z-20 whitespace-nowrap">
                <span>⭐</span>
                <span>RAKSASA!</span>
              </div>
            )}

            {/* Inset 3D Glass & Reflection Layer (Terkunci rapi 100% di dalam lingkaran gelembung) */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10">
              {/* Kilauan Lengkung Utama di Kiri Atas */}
              <div className="absolute top-[9%] left-[12%] w-[28%] h-[16%] rounded-[50%] bg-gradient-to-b from-white/90 via-white/70 to-white/20 rotate-[-35deg]" />
              {/* Titik Kilau Kedua */}
              <div className="absolute top-[20%] left-[9%] w-[9%] h-[9%] rounded-full bg-white/70" />
              {/* Pantulan Cahaya Lembut di Kanan Bawah */}
              <div className="absolute bottom-[9%] right-[12%] w-[26%] h-[14%] rounded-[50%] bg-white/20 rotate-[-35deg]" />
            </div>

            {/* Toddler-friendly character inside */}
            {bubble.character.imageUrl ? (
              <div className="w-[72%] h-[72%] rounded-full overflow-hidden bg-white/90 p-0.5 shadow-sm border border-white/70 flex items-center justify-center pointer-events-none">
                <img
                  src={bubble.character.imageUrl}
                  alt={bubble.character.name}
                  loading="eager"
                  className="w-full h-full object-contain rounded-full select-none pointer-events-none"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-emoji') as HTMLElement;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <span className="fallback-emoji hidden text-3xl sm:text-4xl filter drop-shadow select-none pointer-events-none">
                  {bubble.character.emoji}
                </span>
              </div>
            ) : (
              <span className={`${bubble.isGiant ? 'text-5xl sm:text-6xl' : 'text-3xl sm:text-4xl'} filter drop-shadow select-none pointer-events-none`}>
                {bubble.character.emoji}
              </span>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
