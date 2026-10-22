import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../audio/soundManager';

export const ParentalGateModal: React.FC = () => {
  const { parentalGateOpen, closeParentalGate, pendingAction } = useGameStore();
  const [targetNum, setTargetNum] = useState<number>(3);
  const [options, setOptions] = useState<number[]>([]);

  useEffect(() => {
    if (parentalGateOpen) {
      const target = Math.floor(Math.random() * 8) + 1;
      setTargetNum(target);
      // Generate options including target
      const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => n !== target);
      const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
      shuffled.push(target);
      setOptions(shuffled.sort(() => 0.5 - Math.random()));
    }
  }, [parentalGateOpen]);

  if (!parentalGateOpen) return null;

  const handleSelect = (num: number) => {
    if (num === targetNum) {
      sound.playCelebration();
      closeParentalGate();
      if (pendingAction) {
        pendingAction();
      }
    } else {
      sound.playBoing();
    }
  };

  const numberWords: Record<number, string> = {
    1: 'Satu (1)',
    2: 'Dua (2)',
    3: 'Tiga (3)',
    4: 'Empat (4)',
    5: 'Lima (5)',
    6: 'Enam (6)',
    7: 'Tujuh (7)',
    8: 'Delapan (8)',
    9: 'Sembilan (9)'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-300"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-lg">
              <ShieldCheck className="w-6 h-6" />
              <span>Khusus Orang Tua</span>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                closeParentalGate();
              }}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-slate-600 mb-6 text-base">
            Untuk memastikan Anda adalah orang tua, ketuk angka:
            <br />
            <strong className="text-2xl text-amber-700 block mt-1 font-bold">
              {numberWords[targetNum]}
            </strong>
          </p>

          <div className="grid grid-cols-2 gap-3">
            {options.map((num) => (
              <button
                key={num}
                onClick={() => handleSelect(num)}
                className="py-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-3xl font-bold transition-transform active:scale-95 shadow-sm"
              >
                {num}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
