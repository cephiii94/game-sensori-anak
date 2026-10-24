import React from 'react';
import { Home, Volume2, VolumeX, Sparkles, Settings } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../audio/soundManager';

interface HeaderNavProps {
  title: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ title }) => {
  const { setScreen, soundEnabled, toggleSound, openParentalGate, openSettings } = useGameStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-2.5 py-2 sm:px-6 sm:py-3 pointer-events-none select-none">
      {/* Home / Back Button */}
      <button
        onClick={() => setScreen('menu')}
        className="pointer-events-auto flex items-center gap-1.5 bg-white/95 hover:bg-white text-sky-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-md border-2 border-sky-200 active:scale-95 transition-all text-xs sm:text-base font-bold shrink-0"
        aria-label="Kembali ke Menu"
      >
        <Home className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
        <span className="hidden xs:inline sm:inline">Menu</span>
      </button>

      {/* Game Title Pill */}
      <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-5 sm:py-2 rounded-full shadow-sm border border-white/70 flex items-center gap-1.5 mx-1 max-w-[55%] truncate">
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
        <h1 className="text-slate-800 font-bold text-xs sm:text-base md:text-lg tracking-wide truncate">{title}</h1>
      </div>

      {/* Control Buttons */}
      <div className="pointer-events-auto flex items-center gap-1.5 shrink-0">
        <button
          onClick={toggleSound}
          className={`p-2 sm:p-2.5 rounded-full shadow-md border-2 active:scale-95 transition-all ${
            soundEnabled 
              ? 'bg-amber-100 border-amber-300 text-amber-700' 
              : 'bg-slate-200 border-slate-300 text-slate-500'
          }`}
          aria-label="Toggle Suara"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>

        <button
          onClick={() => {
            sound.playTap();
            openParentalGate(() => {
              openSettings();
            });
          }}
          className="p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-600 shadow-md border-2 border-slate-200 active:scale-95 transition-all"
          aria-label="Pengaturan Orang Tua"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  );
};
