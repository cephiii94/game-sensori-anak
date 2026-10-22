import React from 'react';
import { Home, Volume2, VolumeX, Sparkles, Settings } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../audio/soundManager';

interface HeaderNavProps {
  title: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ title }) => {
  const { setScreen, soundEnabled, toggleSound, openParentalGate } = useGameStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 sm:px-6 pointer-events-none">
      {/* Home / Back Button */}
      <button
        onClick={() => setScreen('menu')}
        className="pointer-events-auto flex items-center gap-2 bg-white/90 hover:bg-white text-sky-700 px-4 py-2.5 rounded-full shadow-lg border-2 border-sky-200 active:scale-95 transition-all text-base sm:text-lg font-bold"
        aria-label="Kembali ke Menu"
      >
        <Home className="w-6 h-6 text-sky-500" />
        <span className="hidden sm:inline">Menu</span>
      </button>

      {/* Game Title Pill */}
      <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-md border border-white/50 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
        <h1 className="text-slate-800 font-bold text-base sm:text-xl tracking-wide">{title}</h1>
      </div>

      {/* Control Buttons */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={toggleSound}
          className={`p-2.5 rounded-full shadow-lg border-2 active:scale-95 transition-all ${
            soundEnabled 
              ? 'bg-amber-100 border-amber-300 text-amber-700' 
              : 'bg-slate-200 border-slate-300 text-slate-500'
          }`}
          aria-label="Toggle Suara"
        >
          {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>

        <button
          onClick={() => {
            sound.playTap();
            openParentalGate(() => {
              alert('Menu Pengaturan Orang Tua:\n- Volume Suara Aktif\n- Durasi Layar: Tanpa Batas\n- Mode Anti-Sentuh: Aktif');
            });
          }}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-600 shadow-lg border-2 border-slate-200 active:scale-95 transition-all"
          aria-label="Pengaturan Orang Tua"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};
