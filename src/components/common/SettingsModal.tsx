import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Settings, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  RotateCw, 
  Maximize, 
  Minimize, 
  Check, 
  Heart,
  SmartphoneNfc
} from 'lucide-react';
import { useGameStore, OrientationMode } from '../../store/useGameStore';
import { sound } from '../../audio/soundManager';

export const SettingsModal: React.FC = () => {
  const { 
    settingsModalOpen, 
    closeSettings, 
    soundEnabled, 
    toggleSound, 
    hapticEnabled, 
    toggleHaptic,
    orientationMode,
    setOrientationMode
  } = useGameStore();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!settingsModalOpen) return null;

  const toggleFullscreen = async () => {
    sound.playTap();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request denied:', err);
    }
  };

  const orientationOptions: { mode: OrientationMode; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      mode: 'auto',
      label: 'Otomatis',
      desc: 'Bebas mengikuti rotasi HP',
      icon: <RotateCw className="w-5 h-5" />
    },
    {
      mode: 'landscape',
      label: 'Lanskap',
      desc: 'Posisi miring / melebar',
      icon: <span className="text-xl">↔️</span>
    },
    {
      mode: 'portrait',
      label: 'Potret',
      desc: 'Posisi tegak vertikal',
      icon: <span className="text-xl">↕️</span>
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="bg-white rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl border-4 border-amber-300 my-auto text-slate-800"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5 border-b pb-3 border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg sm:text-xl text-slate-800">Pengaturan</h2>
                <p className="text-xs text-slate-500">Khusus Orang Tua / Pendamping</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                closeSettings();
              }}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Section 1: Orientasi Layar */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-sky-500" />
                Orientasi Tampilan Layar (HP)
              </label>

              <div className="grid grid-cols-3 gap-2">
                {orientationOptions.map((opt) => {
                  const isSelected = orientationMode === opt.mode;
                  return (
                    <button
                      key={opt.mode}
                      onClick={() => setOrientationMode(opt.mode)}
                      className={`flex flex-col items-center text-center p-2.5 rounded-2xl border-2 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-sm font-bold ring-2 ring-sky-200'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="mb-1 text-sky-600">{opt.icon}</div>
                      <span className="text-xs sm:text-sm">{opt.label}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{opt.desc}</span>
                      {isSelected && (
                        <div className="mt-1 w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Audio & Haptic Switches */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-3">
              {/* Sound */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${soundEnabled ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'}`}>
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">Efek Suara</div>
                    <div className="text-xs text-slate-400">Musik dan bunyi sensori ceria</div>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                    soundEnabled ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      soundEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Haptic */}
              <div className="flex items-center justify-between border-t border-slate-200/60 pt-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${hapticEnabled ? 'bg-teal-100 text-teal-600' : 'bg-slate-200 text-slate-400'}`}>
                    <SmartphoneNfc className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">Getaran (Haptic)</div>
                    <div className="text-xs text-slate-400">Sensasi sentuh saat letup balon</div>
                  </div>
                </div>
                <button
                  onClick={toggleHaptic}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                    hapticEnabled ? 'bg-teal-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      hapticEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Section 3: Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 text-sky-800 hover:from-sky-100 hover:to-blue-100 transition-all active:scale-98"
            >
              <div className="flex items-center gap-2.5">
                {isFullscreen ? <Minimize className="w-5 h-5 text-sky-600" /> : <Maximize className="w-5 h-5 text-sky-600" />}
                <div className="text-left">
                  <div className="text-sm font-bold">{isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh (Fullscreen)'}</div>
                  <div className="text-[11px] text-sky-600/80">Sembunyikan menu browser saat anak bermain</div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-sky-200/70 text-sky-800">
                {isFullscreen ? 'Aktif' : 'Aktifkan'}
              </span>
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Aman untuk balita: Tanpa iklan & tanpa mikrotransaksi</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
