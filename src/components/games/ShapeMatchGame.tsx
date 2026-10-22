import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HeaderNav } from '../common/HeaderNav';
import { sound } from '../../audio/soundManager';

interface ShapeItem {
  id: string;
  type: 'circle' | 'square' | 'star' | 'heart';
  name: string;
  colorName: string;
  bgClass: string;
  borderClass: string;
  shadowClass: string;
  face: string;
}

const ALL_SHAPES: ShapeItem[] = [
  {
    id: 'circle-yellow',
    type: 'circle',
    name: 'Lingkaran',
    colorName: 'Kuning',
    bgClass: 'bg-amber-400',
    borderClass: 'border-amber-300',
    shadowClass: 'shadow-amber-500/40',
    face: '😄'
  },
  {
    id: 'star-pink',
    type: 'star',
    name: 'Bintang',
    colorName: 'Merah Muda',
    bgClass: 'bg-pink-400',
    borderClass: 'border-pink-300',
    shadowClass: 'shadow-pink-500/40',
    face: '⭐'
  },
  {
    id: 'square-blue',
    type: 'square',
    name: 'Kotak',
    colorName: 'Biru',
    bgClass: 'bg-sky-400',
    borderClass: 'border-sky-300',
    shadowClass: 'shadow-sky-500/40',
    face: '😃'
  },
  {
    id: 'heart-red',
    type: 'heart',
    name: 'Hati',
    colorName: 'Merah',
    bgClass: 'bg-rose-400',
    borderClass: 'border-rose-300',
    shadowClass: 'shadow-rose-500/40',
    face: '💖'
  }
];

export const ShapeMatchGame: React.FC = () => {
  // We pick 3 random shapes per round for toddlers (not overwhelming)
  const [currentRoundShapes, setCurrentRoundShapes] = useState<ShapeItem[]>(() => {
    return [...ALL_SHAPES].sort(() => 0.5 - Math.random()).slice(0, 3);
  });
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [celebrating, setCelebrating] = useState(false);

  // References to silhouette drop targets
  const targetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleNextRound = () => {
    setCelebrating(true);
    sound.playCelebration();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      // Pick next batch of shapes
      const nextShapes = [...ALL_SHAPES].sort(() => 0.5 - Math.random()).slice(0, 3);
      setCurrentRoundShapes(nextShapes);
      setMatchedIds([]);
      setCelebrating(false);
    }, 2200);
  };

  const checkDrop = (shapeId: string, event: PointerEvent | MouseEvent | TouchEvent) => {
    const targetEl = targetRefs.current[shapeId];
    if (!targetEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    // Get pointer coordinates
    let clientX = 0;
    let clientY = 0;
    if ('clientX' in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if ('changedTouches' in event && event.changedTouches.length > 0) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    }

    const distance = Math.hypot(clientX - targetCenterX, clientY - targetCenterY);

    // Tolerance range for toddler fingers (fluid for mobile screens)
    const isMobile = window.innerWidth < 640;
    const maxSnapDist = isMobile ? 100 : 130;

    if (distance < maxSnapDist) {
      // Match success!
      sound.playPentatonicChime(matchedIds.length + 2);
      sound.triggerHaptic(40);
      const newMatched = [...matchedIds, shapeId];
      setMatchedIds(newMatched);

      // Check if all matched
      if (newMatched.length === currentRoundShapes.length) {
        handleNextRound();
      }
    } else {
      // Gentle bounce back sound
      sound.playBoing();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-amber-50 via-rose-50 to-orange-100 select-none touch-none p-3 pt-16 pb-4 sm:p-4 sm:pt-20 sm:pb-8">
      <HeaderNav title="🧩 Cocokkan Bentuk" />

      {/* Celebration Banner */}
      {celebrating && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-none p-4"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center animate-bounce-slow max-w-xs sm:max-w-md">
            <span className="text-5xl sm:text-6xl">🎉🌟</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-amber-600 mt-2">Hebat Sekali!</h2>
            <p className="text-slate-600 text-sm sm:text-xl font-semibold mt-1">Semua bentuk pas!</p>
          </div>
        </motion.div>
      )}

      {/* Target Silhouettes (Drop Zones) */}
      <div className="w-full flex justify-around items-center max-w-4xl mx-auto my-auto gap-2 sm:gap-4 px-1">
        {currentRoundShapes.map((shape) => {
          const isMatched = matchedIds.includes(shape.id);

          return (
            <div
              key={`target-${shape.id}`}
              ref={(el) => { targetRefs.current[shape.id] = el; }}
              className="flex flex-col items-center gap-1.5 sm:gap-3"
            >
              <div
                className={`w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-dashed transition-all flex items-center justify-center ${
                  isMatched
                    ? `${shape.bgClass} ${shape.borderClass} border-solid shadow-lg sm:shadow-xl scale-105`
                    : 'border-slate-300/80 bg-slate-200/50'
                }`}
              >
                {isMatched ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="flex flex-col items-center text-white"
                  >
                    <span className="text-3xl sm:text-5xl">{shape.face}</span>
                    <span className="font-bold text-xs sm:text-base mt-0.5 sm:mt-1 drop-shadow">Pas!</span>
                  </motion.div>
                ) : (
                  <span className="text-2xl sm:text-4xl opacity-30">{shape.face}</span>
                )}
              </div>
              <span className="text-slate-500 font-bold text-xs sm:text-base">{shape.name}</span>
            </div>
          );
        })}
      </div>

      {/* Draggable Shape Pieces (Bottom Tray) */}
      <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl border-2 border-white/80 flex justify-around items-center min-h-[110px] sm:min-h-[180px] gap-2">
        {currentRoundShapes.map((shape) => {
          const isMatched = matchedIds.includes(shape.id);
          if (isMatched) {
            return (
              <div
                key={`empty-tray-${shape.id}`}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 opacity-20 border-2 border-dashed border-slate-300 rounded-2xl sm:rounded-3xl flex items-center justify-center"
              >
                <span className="text-xl sm:text-2xl">✨</span>
              </div>
            );
          }

          return (
            <motion.div
              key={`piece-${shape.id}`}
              drag
              dragSnapToOrigin
              dragElastic={0.35}
              whileDrag={{ scale: 1.25, zIndex: 40 }}
              onDragStart={() => sound.playBoing()}
              onDragEnd={(_, info) => {
                checkDrop(shape.id, info.point as unknown as PointerEvent);
              }}
              className={`w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl sm:rounded-3xl cursor-grab active:cursor-grabbing flex flex-col items-center justify-center text-white font-bold shadow-lg sm:shadow-xl border-3 sm:border-4 ${shape.bgClass} ${shape.borderClass} ${shape.shadowClass} select-none active:scale-105 transition-shadow`}
            >
              <span className="text-3xl sm:text-5xl drop-shadow pointer-events-none">{shape.face}</span>
              <span className="text-[10px] sm:text-xs mt-0.5 drop-shadow pointer-events-none">{shape.colorName}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
