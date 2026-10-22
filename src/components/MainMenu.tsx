import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Settings } from 'lucide-react';
import { useGameStore, GameScreen } from '../store/useGameStore';
import { sound } from '../audio/soundManager';

interface MenuItem {
  screen: GameScreen;
  title: string;
  subtitle: string;
  emoji: string;
  bgGradient: string;
  borderColor: string;
  badge: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    screen: 'bubble-pop',
    title: 'Gelembung Ajaib',
    subtitle: 'Sentuh & letupkan balon warna-warni',
    emoji: '🫧',
    bgGradient: 'from-sky-300 to-blue-400',
    borderColor: 'border-sky-300',
    badge: 'Taktil & Suara'
  },
  {
    screen: 'shape-match',
    title: 'Cocokkan Bentuk',
    subtitle: 'Tarik bentuk lucu ke tempatnya',
    emoji: '🧩',
    bgGradient: 'from-amber-300 to-orange-400',
    borderColor: 'border-amber-300',
    badge: 'Motorik Halus'
  },
  {
    screen: 'animal-safari',
    title: 'Cilukba Hewan',
    subtitle: 'Temukan hewan bersembunyi',
    emoji: '🦁',
    bgGradient: 'from-emerald-300 to-teal-400',
    borderColor: 'border-emerald-300',
    badge: 'Auditori & Visual'
  },
  {
    screen: 'glow-paint',
    title: 'Cahaya Pelangi',
    subtitle: 'Melukis bebas dengan jari bersinar',
    emoji: '✨',
    bgGradient: 'from-purple-300 to-pink-400',
    borderColor: 'border-purple-300',
    badge: 'Eksplorasi Bebas'
  }
];

export const MainMenu: React.FC = () => {
  const { setScreen, soundEnabled, toggleSound, openParentalGate } = useGameStore();

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 select-none touch-none p-4 sm:p-6">
      {/* Background Floating Elements */}
      <div className="absolute top-6 left-8 text-7xl select-none pointer-events-none animate-wiggle">
        ☀️
      </div>
      <div className="absolute top-12 right-12 w-32 h-14 bg-white/60 rounded-full blur-lg pointer-events-none animate-pulse-gentle" />
      <div className="absolute bottom-16 left-12 w-44 h-20 bg-white/50 rounded-full blur-xl pointer-events-none" />

      {/* Top Header Controls */}
      <header className="relative z-20 flex justify-between items-center max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-slate-700 font-bold text-sm sm:text-base">Dunia Sensori Balita</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className={`p-3 rounded-full shadow-lg border-2 active:scale-95 transition-all ${
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
                alert('Pintu Pengaturan Orang Tua Terbuka!\n\nSemua mini-game dirancang aman tanpa iklan dan tanpa fail state.');
              });
            }}
            className="p-3 rounded-full bg-white/90 text-slate-600 shadow-lg border-2 border-slate-200 active:scale-95 transition-all"
            aria-label="Pengaturan Orang Tua"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Hero Welcome Title */}
      <div className="relative z-10 text-center my-4 sm:my-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-sky-800 drop-shadow-sm tracking-wide"
        >
          Ayo Bermain & Belajar! 🎈
        </motion.h1>
        <p className="text-slate-600 text-base sm:text-lg font-semibold mt-2">
          Pilih permainan ceria untuk jemari kecilmu:
        </p>
      </div>

      {/* Grid of 4 Sensory Games */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl w-full mx-auto my-auto">
        {MENU_ITEMS.map((item, index) => (
          <motion.div
            key={item.screen}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setScreen(item.screen)}
            className={`cursor-pointer rounded-3xl p-5 sm:p-6 bg-gradient-to-br ${item.bgGradient} text-white shadow-xl border-4 ${item.borderColor} flex items-center gap-4 sm:gap-6 transition-all`}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0 animate-bounce-slow">
              {item.emoji}
            </div>

            <div className="flex-1">
              <span className="inline-block px-3 py-0.5 rounded-full bg-white/25 text-xs font-bold uppercase tracking-wider mb-1">
                {item.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight drop-shadow">
                {item.title}
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-medium mt-1">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Friendly Note */}
      <footer className="relative z-10 text-center mt-4">
        <p className="text-xs sm:text-sm text-slate-500 font-semibold">
          👶 Khusus Balita Usia 1–3 Tahun • Ramah Layar Sentuh • Bebas Iklan
        </p>
      </footer>
    </div>
  );
};
