import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { HeaderNav } from '../common/HeaderNav';
import { sound } from '../../audio/soundManager';
import { useGameStore } from '../../store/useGameStore';

interface ShapeItem {
  id: string;
  type: 'circle' | 'star' | 'square' | 'triangle' | 'heart' | 'cloud';
  name: string;
}

const ALL_SHAPES: ShapeItem[] = [
  { id: 'star', type: 'star', name: 'Bintang' },
  { id: 'circle', type: 'circle', name: 'Lingkaran' },
  { id: 'triangle', type: 'triangle', name: 'Segitiga' },
  { id: 'square', type: 'square', name: 'Kotak' },
  { id: 'heart', type: 'heart', name: 'Hati' },
  { id: 'cloud', type: 'cloud', name: 'Awan' }
];

const getShapeCountForLevel = (lvl: number): number => {
  if (lvl === 1) return 1;
  if (lvl === 2) return 2;
  if (lvl === 3) return 3;
  return 4; // Level 4 and above
};

interface ShapeSvgProps {
  type: ShapeItem['type'];
  isSilhouette?: boolean;
  className?: string;
}

const ShapeSvg: React.FC<ShapeSvgProps> = ({ type, isSilhouette = false, className = '' }) => {
  if (isSilhouette) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        {type === 'circle' && (
          <circle cx="50" cy="50" r="44" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3.5" strokeDasharray="6 4" />
        )}
        {type === 'star' && (
          <path
            d="M 50 8 L 62 36 L 93 38 L 68 60 L 76 90 L 50 73 L 24 90 L 32 60 L 7 38 L 38 36 Z"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            strokeLinejoin="round"
          />
        )}
        {type === 'square' && (
          <rect
            x="12"
            y="12"
            width="76"
            height="76"
            rx="20"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="3.5"
            strokeDasharray="6 4"
          />
        )}
        {type === 'triangle' && (
          <path
            d="M 44 14 C 47 9 53 9 56 14 L 92 78 C 95 83 92 88 86 88 L 14 88 C 8 88 5 83 8 78 Z"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            strokeLinejoin="round"
          />
        )}
        {type === 'heart' && (
          <path
            d="M 50 88 C 22 66 8 48 8 30 C 8 14 20 8 34 8 C 42 8 47 12 50 18 C 53 12 58 8 66 8 C 80 8 92 14 92 30 C 92 48 78 66 50 88 Z"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            strokeLinejoin="round"
          />
        )}
        {type === 'cloud' && (
          <path
            d="M 26 72 L 74 72 A 16 16 0 0 0 74 42 A 22 22 0 0 0 36 34 A 18 18 0 0 0 26 72 Z"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }

  // Full Colorful Shape Piece with Cute Eyes & Smile
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id="grad-circle" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
        <linearGradient id="grad-star" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
        <linearGradient id="grad-square" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="grad-triangle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="grad-heart" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id="grad-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
      </defs>

      {/* Circle Shape */}
      {type === 'circle' && (
        <g>
          <circle cx="50" cy="50" r="44" fill="url(#grad-circle)" stroke="#FBBF24" strokeWidth="3" />
          <path d="M 24 34 A 32 32 0 0 1 50 18" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="48" r="4.5" fill="#1E293B" />
          <circle cx="37.5" cy="46.5" r="1.5" fill="white" />
          <circle cx="64" cy="48" r="4.5" fill="#1E293B" />
          <circle cx="65.5" cy="46.5" r="1.5" fill="white" />
          <circle cx="28" cy="54" r="4" fill="#F43F5E" opacity="0.3" />
          <circle cx="72" cy="54" r="4" fill="#F43F5E" opacity="0.3" />
          <path d="M 38 58 Q 50 68 62 58" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Star Shape */}
      {type === 'star' && (
        <g>
          <path
            d="M 50 8 L 62 36 L 93 38 L 68 60 L 76 90 L 50 73 L 24 90 L 32 60 L 7 38 L 38 36 Z"
            fill="url(#grad-star)"
            stroke="#FBCFE8"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 46 16 L 38 34" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="41" cy="52" r="4" fill="#1E293B" />
          <circle cx="42" cy="50.5" r="1.3" fill="white" />
          <circle cx="59" cy="52" r="4" fill="#1E293B" />
          <circle cx="60" cy="50.5" r="1.3" fill="white" />
          <circle cx="34" cy="57" r="3.5" fill="#BE185D" opacity="0.3" />
          <circle cx="66" cy="57" r="3.5" fill="#BE185D" opacity="0.3" />
          <path d="M 43 60 Q 50 67 57 60" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Square Shape */}
      {type === 'square' && (
        <g>
          <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#grad-square)" stroke="#BAE6FD" strokeWidth="3" />
          <path d="M 22 24 L 56 24" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="36" cy="44" r="4.5" fill="#1E293B" />
          <circle cx="37.5" cy="42.5" r="1.5" fill="white" />
          <circle cx="64" cy="44" r="4.5" fill="#1E293B" />
          <circle cx="65.5" cy="42.5" r="1.5" fill="white" />
          <circle cx="28" cy="50" r="4" fill="#1D4ED8" opacity="0.3" />
          <circle cx="72" cy="50" r="4" fill="#1D4ED8" opacity="0.3" />
          <path d="M 37 54 Q 50 72 63 54 Z" fill="#F43F5E" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      )}

      {/* Triangle Shape */}
      {type === 'triangle' && (
        <g>
          <path
            d="M 44 14 C 47 9 53 9 56 14 L 92 78 C 95 83 92 88 86 88 L 14 88 C 8 88 5 83 8 78 Z"
            fill="url(#grad-triangle)"
            stroke="#A7F3D0"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 42 24 L 20 68" stroke="rgba(255,255,255,0.7)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="40" cy="56" r="4.5" fill="#064E3B" />
          <circle cx="41.5" cy="54.5" r="1.5" fill="white" />
          <circle cx="60" cy="56" r="4.5" fill="#064E3B" />
          <circle cx="61.5" cy="54.5" r="1.5" fill="white" />
          <circle cx="32" cy="62" r="3.5" fill="#047857" opacity="0.4" />
          <circle cx="68" cy="62" r="3.5" fill="#047857" opacity="0.4" />
          <path d="M 43 67 Q 50 74 57 67" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Heart Shape */}
      {type === 'heart' && (
        <g>
          <path
            d="M 50 88 C 22 66 8 48 8 30 C 8 14 20 8 34 8 C 42 8 47 12 50 18 C 53 12 58 8 66 8 C 80 8 92 14 92 30 C 92 48 78 66 50 88 Z"
            fill="url(#grad-heart)"
            stroke="#FECDD3"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 22 24 C 28 16 38 16 42 20" stroke="rgba(255,255,255,0.7)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="42" r="4.5" fill="#881337" />
          <circle cx="37.5" cy="40.5" r="1.5" fill="white" />
          <circle cx="64" cy="42" r="4.5" fill="#881337" />
          <circle cx="65.5" cy="40.5" r="1.5" fill="white" />
          <circle cx="28" cy="48" r="4" fill="#9F1239" opacity="0.3" />
          <circle cx="72" cy="48" r="4" fill="#9F1239" opacity="0.3" />
          <path d="M 40 54 Q 50 63 60 54" stroke="#881337" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Cloud Shape */}
      {type === 'cloud' && (
        <g>
          <path
            d="M 26 72 L 74 72 A 16 16 0 0 0 74 42 A 22 22 0 0 0 36 34 A 18 18 0 0 0 26 72 Z"
            fill="url(#grad-cloud)"
            stroke="#E9D5FF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="43" cy="50" r="4" fill="#581C87" />
          <circle cx="44" cy="48.5" r="1.3" fill="white" />
          <circle cx="61" cy="50" r="4" fill="#581C87" />
          <circle cx="62" cy="48.5" r="1.3" fill="white" />
          <circle cx="36" cy="55" r="3.5" fill="#6B21A8" opacity="0.3" />
          <circle cx="68" cy="55" r="3.5" fill="#6B21A8" opacity="0.3" />
          <path d="M 46 58 Q 52 65 58 58" stroke="#581C87" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
};

export const ShapeMatchGame: React.FC = () => {
  const { addStars } = useGameStore();

  // Level Progression: starts at Level 1 (1 shape) -> Level 2 (2 shapes) -> Level 3 (3 shapes) -> Level 4 (4 shapes)
  const [level, setLevel] = useState<number>(1);

  // Shapes for current level
  const [currentRoundShapes, setCurrentRoundShapes] = useState<ShapeItem[]>(() => {
    return [...ALL_SHAPES].sort(() => 0.5 - Math.random()).slice(0, 1);
  });

  // Tray shapes in shuffled order
  const [trayShapes, setTrayShapes] = useState<ShapeItem[]>(() => {
    return [...currentRoundShapes];
  });

  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  // References to silhouette drop targets
  const targetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const startLevel = (targetLvl: number) => {
    setLevel(targetLvl);
    const count = getShapeCountForLevel(targetLvl);
    const nextShapes = [...ALL_SHAPES].sort(() => 0.5 - Math.random()).slice(0, count);
    setCurrentRoundShapes(nextShapes);
    setTrayShapes([...nextShapes].sort(() => 0.5 - Math.random()));
    setMatchedIds([]);
    setSelectedId(null);
    setCelebrating(false);
  };

  const handleLevelComplete = () => {
    setCelebrating(true);
    sound.playCelebration();
    const starReward = Math.min(30, 5 + level * 5);
    addStars(starReward);

    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      startLevel(level + 1);
    }, 2400);
  };

  const checkDrop = (shapeId: string, dropX: number, dropY: number) => {
    const targetEl = targetRefs.current[shapeId];
    if (!targetEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const distance = Math.hypot(dropX - targetCenterX, dropY - targetCenterY);

    // Generous toddler tolerance: target radius + 60px
    const targetRadius = Math.max(targetRect.width, targetRect.height) / 2;
    const maxSnapDist = targetRadius + 60;

    if (distance <= maxSnapDist) {
      // Match success!
      sound.playPentatonicChime(matchedIds.length + 2);
      sound.triggerHaptic(40);
      const newMatched = [...matchedIds, shapeId];
      setMatchedIds(newMatched);
      setSelectedId(null);

      // Check if all shapes matched in this level
      if (newMatched.length === currentRoundShapes.length) {
        handleLevelComplete();
      }
    } else {
      // Gentle bounce back sound
      sound.playBoing();
    }
  };

  // Tap-to-match support (alternative to drag for toddlers)
  const handlePieceClick = (shapeId: string) => {
    sound.playTap();
    setSelectedId((prev) => (prev === shapeId ? null : shapeId));
  };

  const handleTargetClick = (targetShapeId: string) => {
    if (selectedId) {
      if (selectedId === targetShapeId) {
        sound.playPentatonicChime(matchedIds.length + 2);
        sound.triggerHaptic(40);
        const newMatched = [...matchedIds, selectedId];
        setMatchedIds(newMatched);
        setSelectedId(null);

        if (newMatched.length === currentRoundShapes.length) {
          handleLevelComplete();
        }
      } else {
        sound.playBoing();
      }
    }
  };

  // Dynamic responsive sizing based on number of shapes
  const shapeCount = currentRoundShapes.length;
  const targetSlotSizeClass =
    shapeCount === 1
      ? 'w-36 h-36 sm:w-52 sm:h-52 md:w-60 md:h-60'
      : shapeCount === 2
      ? 'w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48'
      : shapeCount === 3
      ? 'w-22 h-22 sm:w-36 sm:h-36 md:w-44 md:h-44'
      : 'w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36';

  const trayPieceSizeClass =
    shapeCount === 1
      ? 'w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56'
      : shapeCount === 2
      ? 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'
      : shapeCount === 3
      ? 'w-22 h-22 sm:w-32 sm:h-32 md:w-40 md:h-40'
      : 'w-22 h-22 sm:w-28 sm:h-28 md:w-34 md:h-34';

  // Dynamic layout grid for Board and Tray (switches to 2x2 on mobile for 4 shapes)
  const boardGridClass =
    shapeCount === 1
      ? 'flex justify-center items-center'
      : shapeCount === 2
      ? 'grid grid-cols-2 justify-items-center max-w-md mx-auto gap-4 sm:gap-8'
      : shapeCount === 3
      ? 'grid grid-cols-3 justify-items-center gap-2 sm:gap-6 max-w-2xl mx-auto'
      : 'grid grid-cols-2 sm:grid-cols-4 justify-items-center gap-3 sm:gap-6 max-w-3xl mx-auto';

  const trayGridClass =
    shapeCount === 1
      ? 'flex justify-center items-center'
      : shapeCount === 2
      ? 'grid grid-cols-2 justify-items-center max-w-md mx-auto gap-4 sm:gap-8'
      : shapeCount === 3
      ? 'grid grid-cols-3 justify-items-center gap-2 sm:gap-6 max-w-2xl mx-auto'
      : 'grid grid-cols-2 sm:grid-cols-4 justify-items-center gap-3 sm:gap-6 max-w-3xl mx-auto';

  const levelTitle =
    level === 1
      ? 'Level 1: Pengenalan 🌟'
      : level === 2
      ? 'Level 2: Dua Bentuk 🌟🌟'
      : level === 3
      ? 'Level 3: Tiga Bentuk 🌟🌟🌟'
      : `Level ${level}: Ahli Bentuk 🏆`;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-amber-50 via-rose-50 to-orange-100 select-none touch-none p-3 pt-4 pb-4 sm:p-6 sm:pb-6">
      <HeaderNav title="🧩 Cocokkan Bentuk" />

      {/* Celebration Banner Upon Level Completion */}
      <AnimatePresence>
        {celebrating && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-md pointer-events-none p-4"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center animate-bounce-slow max-w-xs sm:max-w-md">
              <span className="text-5xl sm:text-6xl">🎉🌟</span>
              <h2 className="text-2xl sm:text-4xl font-black text-amber-600 mt-2">Hebat Sekali!</h2>
              <p className="text-slate-700 text-sm sm:text-xl font-bold mt-1">
                Level {level} Selesai!
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-sm">
                <span>⭐ +{Math.min(30, 5 + level * 5)} Bintang</span>
              </div>
              <p className="text-xs text-slate-400 font-semibold mt-2">
                Menuju Level {level + 1}... 🚀
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Level Bar & Friendly Helper */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between px-2 pt-1 pb-1 pr-14 sm:pr-16">
        <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-200/80 shadow-sm text-amber-900 font-extrabold text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{levelTitle}</span>
        </div>

        {/* Quick Restart Level 1 button */}
        {level > 1 && (
          <button
            onClick={() => {
              sound.playTap();
              startLevel(1);
            }}
            className="inline-flex items-center gap-1 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm transition-colors cursor-pointer"
            title="Ulangi dari Level 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang</span>
          </button>
        )}
      </div>

      {/* Target Silhouettes (Puzzle Board Cutouts) */}
      <div className={`w-full max-w-4xl mx-auto my-auto bg-white/85 backdrop-blur-md rounded-3xl p-4 sm:p-7 shadow-xl border-4 border-amber-200/80 min-h-[180px] sm:min-h-[250px] ${boardGridClass}`}>
        {currentRoundShapes.map((shape) => {
          const isMatched = matchedIds.includes(shape.id);
          const isTargetForSelected = selectedId === shape.id;

          return (
            <div
              key={`target-${shape.id}`}
              ref={(el) => { targetRefs.current[shape.id] = el; }}
              onClick={() => handleTargetClick(shape.id)}
              className="flex flex-col items-center gap-1.5 cursor-pointer w-full max-w-[140px] sm:max-w-[200px]"
            >
              <div className={`${targetSlotSizeClass} flex items-center justify-center relative`}>
                {isMatched ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="w-full h-full flex items-center justify-center relative"
                  >
                    <ShapeSvg type={shape.type} isSilhouette={false} className="w-full h-full drop-shadow-md" />
                    <div className="absolute -bottom-2 bg-amber-400 text-white font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md">
                      Pas! ⭐
                    </div>
                  </motion.div>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center transition-all ${
                    isTargetForSelected ? 'scale-110 drop-shadow-lg' : 'hover:scale-105'
                  }`}>
                    <ShapeSvg 
                      type={shape.type} 
                      isSilhouette={true} 
                      className={`w-full h-full drop-shadow-inner ${isTargetForSelected ? 'opacity-100' : 'opacity-85'}`} 
                    />
                  </div>
                )}
              </div>
              <span className="text-slate-600 font-extrabold text-xs sm:text-base tracking-wide mt-1">
                {shape.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Draggable Shape Pieces (Bottom Tray) */}
      <div className={`w-full max-w-4xl mx-auto bg-amber-100/75 backdrop-blur-md rounded-3xl p-3 sm:p-6 shadow-xl border-2 border-amber-200/90 min-h-[130px] sm:min-h-[190px] ${trayGridClass}`}>
        {trayShapes.map((shape) => {
          const isMatched = matchedIds.includes(shape.id);
          const isSelected = selectedId === shape.id;

          if (isMatched) {
            return (
              <div
                key={`empty-tray-${shape.id}`}
                className={`${trayPieceSizeClass} opacity-25 border-2 border-dashed border-amber-300 rounded-3xl flex items-center justify-center`}
              >
                <span className="text-2xl sm:text-3xl">✨</span>
              </div>
            );
          }

          return (
            <motion.div
              key={`piece-${shape.id}`}
              drag
              dragSnapToOrigin
              dragElastic={0}
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              whileDrag={{ scale: 1.15, zIndex: 50 }}
              onDragStart={() => {
                sound.playBoing();
                setSelectedId(shape.id);
              }}
              onDragEnd={(_, info) => {
                checkDrop(shape.id, info.point.x, info.point.y);
              }}
              onClick={() => handlePieceClick(shape.id)}
              className={`${trayPieceSizeClass} cursor-grab active:cursor-grabbing flex items-center justify-center select-none touch-none ${
                isSelected ? 'scale-110 drop-shadow-2xl' : 'hover:scale-105'
              }`}
            >
              <ShapeSvg type={shape.type} isSilhouette={false} className="w-full h-full drop-shadow-xl pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
