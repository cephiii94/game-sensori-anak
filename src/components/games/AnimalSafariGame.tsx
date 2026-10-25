import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderNav } from '../common/HeaderNav';
import { sound } from '../../audio/soundManager';

interface HidingSpot {
  id: number;
  coverEmoji: string;
  coverName: string;
  coverColor: string;
  animalEmoji: string;
  animalName: string;
  animalSoundText: string;
  noteIndex: number;
}

const SPOTS: HidingSpot[] = [
  {
    id: 1,
    coverEmoji: '🌿',
    coverName: 'Semak Hijau',
    coverColor: 'bg-emerald-400 border-emerald-300',
    animalEmoji: '🦁',
    animalName: 'Singa Cilik',
    animalSoundText: 'Roaaar! 🐾',
    noteIndex: 0
  },
  {
    id: 2,
    coverEmoji: '☁️',
    coverName: 'Awan Putih',
    coverColor: 'bg-sky-200 border-sky-300',
    animalEmoji: '🐥',
    animalName: 'Anak Ayam',
    animalSoundText: 'Ciip Ciip! 🐣',
    noteIndex: 2
  },
  {
    id: 3,
    coverEmoji: '📦',
    coverName: 'Kotak Ajaib',
    coverColor: 'bg-amber-400 border-amber-300',
    animalEmoji: '🐱',
    animalName: 'Kucing Imut',
    animalSoundText: 'Meeoow! 🐾',
    noteIndex: 4
  },
  {
    id: 4,
    coverEmoji: '🎁',
    coverName: 'Kado Merah',
    coverColor: 'bg-rose-400 border-rose-300',
    animalEmoji: '🐶',
    animalName: 'Anjing Lucu',
    animalSoundText: 'Guk Guk! 🦴',
    noteIndex: 5
  },
  {
    id: 5,
    coverEmoji: '🌸',
    coverName: 'Bunga Indah',
    coverColor: 'bg-pink-300 border-pink-400',
    animalEmoji: '🐰',
    animalName: 'Kelinci Gemas',
    animalSoundText: 'Hop Hop! 🥕',
    noteIndex: 7
  },
  {
    id: 6,
    coverEmoji: '🌊',
    coverName: 'Ombak Biru',
    coverColor: 'bg-blue-400 border-blue-300',
    animalEmoji: '🐬',
    animalName: 'Lumba-Lumba',
    animalSoundText: 'Sploosh! 💦',
    noteIndex: 8
  }
];

export const AnimalSafariGame: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [activeAnimal, setActiveAnimal] = useState<HidingSpot | null>(null);

  const handleSpotTap = (spot: HidingSpot) => {
    const isAlreadyOpen = revealedIds.includes(spot.id);

    if (isAlreadyOpen) {
      // Animal dances when tapped again!
      sound.playBoing();
      sound.playPentatonicChime(spot.noteIndex + 3);
      setActiveAnimal(spot);
    } else {
      // Reveal peek-a-boo!
      sound.playPentatonicChime(spot.noteIndex);
      sound.playCelebration();
      setRevealedIds((prev) => [...prev, spot.id]);
      setActiveAnimal(spot);
    }
  };

  const handleReset = () => {
    sound.playTap();
    setRevealedIds([]);
    setActiveAnimal(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-green-100 via-emerald-50 to-teal-100 select-none touch-none p-3 pt-4 pb-4 sm:p-6 sm:pb-6">
      <HeaderNav title="🦁 Cilukba Hewan" />

      {/* Floating Active Announcement */}
      <div className="text-center h-12 sm:h-16 flex items-center justify-center px-2 mr-12 sm:mr-16">
        {activeAnimal ? (
          <motion.div
            key={activeAnimal.id + activeAnimal.animalName}
            initial={{ scale: 0.8, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-md px-4 py-1.5 sm:px-6 sm:py-2 rounded-full shadow-md border-2 border-emerald-300 inline-flex items-center gap-2 max-w-[95%] truncate"
          >
            <span className="text-xl sm:text-2xl shrink-0">{activeAnimal.animalEmoji}</span>
            <span className="text-emerald-800 font-bold text-xs sm:text-lg truncate">
              {activeAnimal.animalName}: <span className="text-amber-600">{activeAnimal.animalSoundText}</span>
            </span>
          </motion.div>
        ) : (
          <p className="text-slate-500 font-bold text-xs sm:text-base animate-pulse-gentle">
            Ketuk semak atau awan untuk menemukan hewan! 🔍
          </p>
        )}
      </div>

      {/* Grid of Hiding Spots (responsive 2-cols on mobile, 3-cols on tablet/desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-6 max-w-4xl w-full mx-auto my-auto px-1">
        {SPOTS.map((spot) => {
          const isOpen = revealedIds.includes(spot.id);

          return (
            <motion.div
              key={spot.id}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleSpotTap(spot)}
              className="relative aspect-square rounded-2xl sm:rounded-3xl cursor-pointer shadow-md sm:shadow-lg overflow-hidden flex flex-col items-center justify-center border-3 sm:border-4 border-white transition-all bg-white"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="animal"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 p-1.5 sm:p-2"
                  >
                    <span className="text-4xl sm:text-7xl filter drop-shadow animate-wiggle">
                      {spot.animalEmoji}
                    </span>
                    <span className="font-bold text-slate-700 text-xs sm:text-base mt-1 sm:mt-2">
                      {spot.animalName}
                    </span>
                    <span className="text-[10px] sm:text-xs text-amber-600 font-semibold">
                      {spot.animalSoundText}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cover"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`flex flex-col items-center justify-center w-full h-full ${spot.coverColor} p-1.5 sm:p-2 text-white`}
                  >
                    <span className="text-4xl sm:text-7xl filter drop-shadow animate-bounce-slow">
                      {spot.coverEmoji}
                    </span>
                    <span className="font-bold text-white text-xs sm:text-base mt-1 sm:mt-2 drop-shadow">
                      {spot.coverName}
                    </span>
                    <span className="text-[10px] sm:text-xs bg-white/30 backdrop-blur-sm px-2 py-0.5 rounded-full mt-0.5 sm:mt-1 font-semibold">
                      Ketuk Aku!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Button to Hide Animals Again */}
      <div className="flex justify-center mt-1">
        <button
          onClick={handleReset}
          className="bg-white/95 hover:bg-white text-emerald-800 font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md border-2 border-emerald-300 active:scale-95 transition-all text-xs sm:text-base flex items-center gap-1.5"
        >
          <span>🙈 Sembunyi Lagi (Cilukba)</span>
        </button>
      </div>
    </div>
  );
};
