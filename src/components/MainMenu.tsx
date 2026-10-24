import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Gamepad2, 
  Trophy, 
  Shield, 
  Heart, 
  Settings, 
  Pencil, 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowRight
} from 'lucide-react';
import { useGameStore, GameScreen, SidebarTab } from '../store/useGameStore';
import { sound } from '../audio/soundManager';
import { EditChildNameModal } from './common/EditChildNameModal';
import { BadgesModal } from './common/BadgesModal';

interface GameCardData {
  screen: GameScreen;
  title: string;
  category: string;
  topBadge: string;
  emojiArt: string;
  artBg: string;
  btnBg: string;
}

const GAME_CARDS: GameCardData[] = [
  {
    screen: 'bubble-pop',
    title: 'Bubble Pop',
    category: 'Taktil & Letup Balon',
    topBadge: '🫧 Suara & Taktil',
    emojiArt: '🫧 🎈',
    artBg: 'from-sky-300 via-sky-400 to-blue-500',
    btnBg: 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white'
  },
  {
    screen: 'shape-match',
    title: 'Colors & Shapes',
    category: 'Cocokkan Bentuk Lucu',
    topBadge: '🧩 Motorik Halus',
    emojiArt: '⭐ 🔷 🟣',
    artBg: 'from-amber-300 via-orange-400 to-rose-400',
    btnBg: 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white'
  },
  {
    screen: 'animal-safari',
    title: 'Animal Safari',
    category: 'Cilukba Hewan Liar',
    topBadge: '🦁 Auditori & Visual',
    emojiArt: '🦁 🌿 🐾',
    artBg: 'from-emerald-300 via-teal-400 to-emerald-500',
    btnBg: 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white'
  },
  {
    screen: 'glow-paint',
    title: 'Glow Paint',
    category: 'Lukisan Jari Neon',
    topBadge: '✨ Eksplorasi Seni',
    emojiArt: '🎨 ✨ 🌈',
    artBg: 'from-purple-300 via-pink-400 to-purple-500',
    btnBg: 'bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white'
  }
];

export const MainMenu: React.FC = () => {
  const { 
    setScreen, 
    soundEnabled, 
    toggleSound, 
    openParentalGate, 
    openSettings,
    childName,
    stars,
    dayStreak,
    badgesCount,
    playedGamesCount,
    favorites,
    toggleFavorite,
    activeTab,
    setActiveTab
  } = useGameStore();

  const [editNameOpen, setEditNameOpen] = useState(false);
  const [badgesModalOpen, setBadgesModalOpen] = useState(false);

  const handleEditNameClick = () => {
    sound.playTap();
    openParentalGate(() => {
      setEditNameOpen(true);
    });
  };

  const handleSettingsClick = () => {
    sound.playTap();
    openParentalGate(() => {
      openSettings();
    });
  };

  const displayedGames = activeTab === 'favorites'
    ? GAME_CARDS.filter(g => favorites.includes(g.screen))
    : GAME_CARDS;

  return (
    <div className="w-full h-full min-h-[100dvh] flex flex-col md:flex-row bg-[#F4F6FC] overflow-x-hidden font-sans select-none touch-none text-slate-800">
      {/* ===================== LEFT SIDEBAR ===================== */}
      <aside className="hidden md:flex w-20 lg:w-24 bg-[#5E3DE8] flex-col items-center justify-between py-5 text-white z-30 shrink-0 shadow-xl">
        {/* Top Smiling Star Mascot */}
        <div className="flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-amber-300 flex items-center justify-center text-2xl shadow-md cursor-pointer"
            onClick={() => sound.playCelebration()}
          >
            ⭐
          </motion.div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2.5 w-full px-2">
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full py-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
              activeTab === 'home'
                ? 'bg-white text-[#5E3DE8] font-bold shadow-md scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] tracking-wide">Home</span>
          </button>

          {/* Games */}
          <button
            onClick={() => setActiveTab('games')}
            className={`w-full py-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
              activeTab === 'games'
                ? 'bg-white text-[#5E3DE8] font-bold shadow-md scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="text-[10px] tracking-wide">Games</span>
          </button>

          {/* Progress */}
          <button
            onClick={() => setBadgesModalOpen(true)}
            className="w-full py-2.5 rounded-2xl flex flex-col items-center gap-1 text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] tracking-wide">Progress</span>
          </button>

          {/* Badges */}
          <button
            onClick={() => setBadgesModalOpen(true)}
            className="w-full py-2.5 rounded-2xl flex flex-col items-center gap-1 text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            <Shield className="w-5 h-5" />
            <span className="text-[10px] tracking-wide">Badges</span>
          </button>

          {/* Favorites */}
          <button
            onClick={() => setActiveTab(activeTab === 'favorites' ? 'home' : 'favorites')}
            className={`w-full py-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
              activeTab === 'favorites'
                ? 'bg-white text-[#5E3DE8] font-bold shadow-md scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart className={`w-5 h-5 ${activeTab === 'favorites' ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="text-[10px] tracking-wide">Favorites</span>
          </button>

          {/* Settings (Parental Protected) */}
          <button
            onClick={handleSettingsClick}
            className="w-full py-2.5 rounded-2xl flex flex-col items-center gap-1 text-white/80 hover:text-white hover:bg-white/10 transition-all mt-1"
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] tracking-wide">Settings</span>
          </button>
        </nav>

        {/* Bottom Mascot - Friendly Green Alien Monster */}
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-12 h-14 flex items-center justify-center cursor-pointer"
          onClick={() => sound.playBoing()}
        >
          <svg viewBox="0 0 100 120" className="w-12 h-14 drop-shadow-md">
            {/* Body */}
            <ellipse cx="50" cy="70" rx="40" ry="42" fill="#34D399" />
            {/* Belly */}
            <ellipse cx="50" cy="76" rx="26" ry="26" fill="#A7F3D0" />
            {/* Antennae */}
            <circle cx="28" cy="22" r="7" fill="#34D399" />
            <path d="M 32 30 Q 30 24 28 22" stroke="#34D399" strokeWidth="5" strokeLinecap="round" />
            <circle cx="72" cy="22" r="7" fill="#34D399" />
            <path d="M 68 30 Q 70 24 72 22" stroke="#34D399" strokeWidth="5" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="36" cy="58" r="9" fill="white" />
            <circle cx="37" cy="58" r="5" fill="#0F172A" />
            <circle cx="35" cy="56" r="2.5" fill="white" />
            <circle cx="64" cy="58" r="9" fill="white" />
            <circle cx="63" cy="58" r="5" fill="#0F172A" />
            <circle cx="62" cy="56" r="2.5" fill="white" />
            {/* Mouth */}
            <path d="M 36 78 Q 50 96 64 78" stroke="#0F172A" strokeWidth="4" fill="#F43F5E" strokeLinecap="round" />
            <rect x="47" y="77" width="6" height="5" rx="2" fill="white" />
          </svg>
        </motion.div>
      </aside>

      {/* ===================== MAIN CONTENT AREA ===================== */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#F4F6FC] p-3 sm:p-5 lg:p-6 pb-20 md:pb-6">
        {/* 1. TOP GRADIENT BANNER */}
        <header className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF7AA2] via-[#B47BFA] to-[#4F86F7] p-4 sm:p-6 text-white shadow-md overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Subtle Background Clouds */}
          <div className="absolute top-1 left-12 w-28 h-8 bg-white/20 rounded-full blur-[2px] pointer-events-none" />
          <div className="absolute bottom-2 right-20 w-36 h-10 bg-white/20 rounded-full blur-[2px] pointer-events-none" />
          <div className="absolute -top-6 right-6 text-5xl opacity-40 select-none pointer-events-none animate-spin" style={{ animationDuration: '20s' }}>
            ✨
          </div>

          {/* Left Greeting & Editable Name */}
          <div className="relative z-10">
            <div className="text-[10px] sm:text-xs font-black tracking-widest text-white/90 uppercase drop-shadow-sm flex items-center gap-1.5">
              <span>HELLO, LITTLE EXPLORER!</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow tracking-wide">
                {childName}
              </h1>

              {/* Edit Pencil Button */}
              <button
                onClick={handleEditNameClick}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-purple-700 flex items-center justify-center shadow-md active:scale-95 transition-transform"
                title="Ganti Nama Anak (Khusus Orang Tua)"
              >
                <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Action Icons (Sound & Mobile Settings) */}
          <div className="relative z-10 flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={toggleSound}
              className={`p-2.5 sm:p-3 rounded-full shadow-md backdrop-blur-md border border-white/40 active:scale-95 transition-all ${
                soundEnabled ? 'bg-white/25 text-white' : 'bg-black/20 text-white/70'
              }`}
              title="Toggle Suara"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Mobile Only Settings button */}
            <button
              onClick={handleSettingsClick}
              className="md:hidden p-2.5 rounded-full bg-white/25 text-white shadow-md border border-white/40 active:scale-95 transition-all"
              title="Pengaturan Orang Tua"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 2. TOP STATS CARDS ROW (3 CARDS) */}
        <section className="grid grid-cols-3 gap-2.5 sm:gap-4 my-3 sm:my-4">
          {/* Card 1: Stars */}
          <motion.div 
            whileTap={{ scale: 0.96 }}
            onClick={() => sound.playTap()}
            className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-100 flex items-center gap-2 sm:gap-3.5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-amber-100/70 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
              ⭐
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block truncate">Stars</span>
              <span className="text-base sm:text-2xl font-black text-slate-800 tracking-tight">
                {stars.toLocaleString()}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Day Streak */}
          <motion.div 
            whileTap={{ scale: 0.96 }}
            onClick={() => sound.playTap()}
            className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-100 flex items-center gap-2 sm:gap-3.5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-orange-100/70 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
              🔥
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block truncate">Day Streak</span>
              <span className="text-base sm:text-2xl font-black text-slate-800 tracking-tight">
                {dayStreak}
              </span>
            </div>
          </motion.div>

          {/* Card 3: Badges */}
          <motion.div 
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              sound.playTap();
              setBadgesModalOpen(true);
            }}
            className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-100 flex items-center gap-2 sm:gap-3.5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-purple-100/70 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
              🛡️
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block truncate">Badges</span>
              <span className="text-base sm:text-2xl font-black text-slate-800 tracking-tight">
                {badgesCount}
              </span>
            </div>
          </motion.div>
        </section>

        {/* 3. MIDDLE SECTION: EXPLORE GAMES */}
        <section className="my-1 sm:my-2">
          <div className="flex justify-between items-center mb-2.5 sm:mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl">🚀</span>
              <h2 className="text-sm sm:text-lg font-black text-slate-800 tracking-wide">
                {activeTab === 'favorites' ? 'Favorite Games' : 'Explore Games'}
              </h2>
            </div>

            <button
              onClick={() => setActiveTab('home')}
              className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal Grid of Games */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {displayedGames.map((game) => {
              const isFav = favorites.includes(game.screen);

              return (
                <motion.div
                  key={game.screen}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col justify-between"
                >
                  {/* Top Artwork Box */}
                  <div className={`w-full aspect-square rounded-xl sm:rounded-2xl bg-gradient-to-br ${game.artBg} flex items-center justify-center text-3xl sm:text-5xl shadow-inner relative overflow-hidden`}>
                    {/* Floating artwork emojis */}
                    <span className="animate-bounce-slow drop-shadow">
                      {game.emojiArt.split(' ')[0]}
                    </span>

                    {/* Favorite Heart Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(game.screen);
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                    </button>
                  </div>

                  {/* Title & Info */}
                  <div className="my-2 sm:my-2.5 text-center">
                    <h3 className="text-xs sm:text-base font-black text-slate-800 truncate">
                      {game.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-semibold truncate mt-0.5">
                      {game.category}
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => setScreen(game.screen)}
                    className={`w-full py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all text-center ${game.btnBg}`}
                  >
                    Play
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. BOTTOM ROW (2 CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 mt-3 sm:mt-4">
          {/* Bottom Card Left: Today's Goal */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs sm:text-base font-black text-slate-800">Today's Goal</h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5">Play 3 sensory games</p>
              </div>
              <span className="text-sm sm:text-base font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {playedGamesCount} / 3
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-3 sm:h-3.5 rounded-full overflow-hidden p-0.5 mt-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (playedGamesCount / 3) * 100)}%` }}
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-400 rounded-full"
              />
            </div>
          </div>

          {/* Bottom Card Right: Keep Going Banner */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-sm border border-slate-100 flex items-center justify-between overflow-hidden">
            <div>
              <h3 className="text-xs sm:text-base font-black text-slate-800">Keep Going! 🌟</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5">
                You're doing amazing!
              </p>
            </div>

            {/* Rainbow & Smiling Sun Art */}
            <div className="flex items-center gap-1.5 text-3xl sm:text-4xl shrink-0 select-none">
              <span className="animate-wiggle">🌈</span>
              <span className="animate-spin" style={{ animationDuration: '10s' }}>☀️</span>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== MOBILE BOTTOM NAV ===================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex justify-around items-center shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold ${
            activeTab === 'home' ? 'text-[#5E3DE8]' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('games')}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold ${
            activeTab === 'games' ? 'text-[#5E3DE8]' : 'text-slate-400'
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          <span className="text-[10px]">Games</span>
        </button>

        <button
          onClick={() => setBadgesModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-400"
        >
          <Shield className="w-5 h-5" />
          <span className="text-[10px]">Badges</span>
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'favorites' ? 'home' : 'favorites')}
          className={`flex flex-col items-center gap-0.5 text-xs font-bold ${
            activeTab === 'favorites' ? 'text-rose-500' : 'text-slate-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${activeTab === 'favorites' ? 'fill-rose-500' : ''}`} />
          <span className="text-[10px]">Favorites</span>
        </button>

        <button
          onClick={handleSettingsClick}
          className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-400"
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>

      {/* ===================== MODALS ===================== */}
      <EditChildNameModal 
        isOpen={editNameOpen} 
        onClose={() => setEditNameOpen(false)} 
      />

      <BadgesModal
        isOpen={badgesModalOpen}
        onClose={() => setBadgesModalOpen(false)}
        stars={stars}
      />
    </div>
  );
};
