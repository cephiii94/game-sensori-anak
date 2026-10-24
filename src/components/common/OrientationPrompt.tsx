import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Smartphone, Maximize2 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../audio/soundManager';

export const OrientationPrompt: React.FC = () => {
  const { orientationMode } = useGameStore();
  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth;
  });
  const [temporarilyDismissed, setTemporarilyDismissed] = useState<boolean>(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
      // Reset dismiss when user physically rotates to match desired state
      if (orientationMode === 'landscape' && !portrait) {
        setTemporarilyDismissed(false);
      } else if (orientationMode === 'portrait' && portrait) {
        setTemporarilyDismissed(false);
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [orientationMode]);

  // Reset temporary dismiss when orientationMode changes
  useEffect(() => {
    setTemporarilyDismissed(false);
  }, [orientationMode]);

  if (orientationMode === 'auto' || temporarilyDismissed) {
    return null;
  }

  const needsLandscape = orientationMode === 'landscape' && isPortrait;
  const needsPortrait = orientationMode === 'portrait' && !isPortrait;

  if (!needsLandscape && !needsPortrait) {
    return null;
  }

  const handleFullscreenAndLock = async () => {
    sound.playTap();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      const orientation = (screen as unknown as { orientation?: { lock?: (m: string) => Promise<void> } }).orientation;
      if (orientation && typeof orientation.lock === 'function') {
        await orientation.lock(orientationMode);
      }
    } catch {
      // Browser might reject orientation lock; the user will still rotate physically
    }
  };

  const handleDismiss = () => {
    sound.playTap();
    setTemporarilyDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/85 backdrop-blur-md p-6 text-white text-center select-none"
      >
        <motion.div
          initial={{ scale: 0.85, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="bg-white/10 border-2 border-white/20 rounded-3xl p-6 sm:p-8 max-w-sm w-full flex flex-col items-center shadow-2xl backdrop-blur-xl"
        >
          {/* Animated Device Icon */}
          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            {needsLandscape ? (
              <motion.div
                animate={{ rotate: [0, 90, 90, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-20 border-4 border-amber-300 rounded-2xl flex items-center justify-center bg-amber-400/20 shadow-lg"
              >
                <div className="w-8 h-1 bg-amber-300/60 rounded-full mb-auto mt-1" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ rotate: [90, 0, 0, 90] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-20 border-4 border-sky-300 rounded-2xl flex items-center justify-center bg-sky-400/20 shadow-lg"
              >
                <div className="w-8 h-1 bg-sky-300/60 rounded-full mb-auto mt-1" />
              </motion.div>
            )}
            <RotateCw className="w-7 h-7 text-amber-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-amber-300 mb-2">
            {needsLandscape ? 'Miringkan HP Kamu 🔄' : 'Tegakkan HP Kamu 📱'}
          </h3>

          <p className="text-sm text-slate-200 leading-relaxed mb-6 font-medium">
            {needsLandscape
              ? 'Pengaturan diatur ke mode Lanskap (Mendatar) agar area bermain balita lebih luas & menyenangkan.'
              : 'Pengaturan diatur ke mode Potret (Tegak) agar pas dipegang dengan satu tangan.'}
          </p>

          <div className="w-full flex flex-col gap-2.5">
            <button
              onClick={handleFullscreenAndLock}
              className="w-full py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-bold flex items-center justify-center gap-2 shadow-lg transition-transform"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Putar Otomatis & Layar Penuh</span>
            </button>

            <button
              onClick={handleDismiss}
              className="w-full py-2 px-4 rounded-xl text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              {needsLandscape ? 'Tetap Lanjut Posisi Tegak' : 'Tetap Lanjut Posisi Miring'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
