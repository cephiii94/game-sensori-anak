import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Play, Home, Settings, X, Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../audio/soundManager';

interface HeaderNavProps {
  title: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ title }) => {
  const { setScreen, soundEnabled, toggleSound, openParentalGate, openSettings } = useGameStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    sound.playTap();
    setMenuOpen(true);
  };

  const handleResume = () => {
    sound.playTap();
    setMenuOpen(false);
  };

  const handleGoHome = () => {
    sound.playTap();
    setMenuOpen(false);
    setScreen('menu');
  };

  const handleOpenSettings = () => {
    sound.playTap();
    setMenuOpen(false);
    openParentalGate(() => {
      openSettings();
    });
  };

  return (
    <>
      {/* Floating Hamburger Button (Top Right Corner Only) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleOpenMenu}
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40 p-2.5 sm:p-3 rounded-2xl bg-white/90 hover:bg-white text-slate-700 shadow-xl border-2 border-white/80 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer pointer-events-auto"
        aria-label="Menu Permainan"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </motion.button>

      {/* Pop-up Pause Menu */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-4 border-indigo-200 text-center relative"
            >
              {/* Close Button (X) */}
              <button
                onClick={handleResume}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Pause Icon & Title */}
              <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mb-3 shadow-inner">
                ⏸️
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-wide">
                Permainan Dijeda
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-bold mb-6">
                {title}
              </p>

              {/* 3 Main Action Buttons */}
              <div className="space-y-3">
                {/* 1. Lanjutkan */}
                <button
                  onClick={handleResume}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-transform"
                >
                  <Play className="w-5 h-5 fill-white stroke-[2.5]" />
                  <span>Lanjutkan</span>
                </button>

                {/* 2. Home / Menu Utama */}
                <button
                  onClick={handleGoHome}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-transform"
                >
                  <Home className="w-5 h-5 stroke-[2.5]" />
                  <span>Home</span>
                </button>

                {/* 3. Pengaturan */}
                <button
                  onClick={handleOpenSettings}
                  className="w-full py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Pengaturan</span>
                </button>
              </div>

              {/* Audio Quick Toggle */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">Suara & Musik:</span>
                <button
                  onClick={toggleSound}
                  className={`p-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                    soundEnabled ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="font-bold">{soundEnabled ? 'Aktif' : 'Mati'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
