import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../audio/soundManager';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
}

interface BadgeItem {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  color: string;
  unlocked: boolean;
}

const BADGES_LIST: BadgeItem[] = [
  { id: '1', name: 'Raja Letup', desc: 'Meletuskan 50+ balon ceria', emoji: '🫧', color: 'from-sky-400 to-blue-500', unlocked: true },
  { id: '2', name: 'Ahli Bentuk', desc: 'Mencocokkan bentuk dengan pas', emoji: '🧩', color: 'from-amber-400 to-orange-500', unlocked: true },
  { id: '3', name: 'Sahabat Hewan', desc: 'Menemukan singa & teman-teman', emoji: '🦁', color: 'from-emerald-400 to-teal-500', unlocked: true },
  { id: '4', name: 'Pelukis Bintang', desc: 'Menggoreskan garis neon pelangi', emoji: '✨', color: 'from-purple-400 to-pink-500', unlocked: true },
  { id: '5', name: 'Telinga Emas', desc: 'Mendengarkan melodi pentatonik', emoji: '🎵', color: 'from-rose-400 to-red-500', unlocked: true },
  { id: '6', name: 'Petualang Hebat', desc: 'Bermain setiap hari penuh semangat', emoji: '🔥', color: 'from-orange-400 to-amber-500', unlocked: true }
];

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose, stars }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border-4 border-indigo-300 text-slate-800 my-auto"
        >
          <div className="flex justify-between items-center mb-5 border-b pb-3 border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-1.5">
                  Lencana & Prestasi 🎖️
                </h3>
                <p className="text-xs text-slate-500">Pencapaian sensori si kecil</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                onClose();
              }}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Star total banner */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-2xl p-3.5 mb-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-3xl animate-bounce-slow">⭐</span>
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-amber-100">Total Bintang Terkumpul</div>
                <div className="text-2xl font-black">{stars.toLocaleString()} Bintang</div>
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-yellow-200 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BADGES_LIST.map((badge) => (
              <div
                key={badge.id}
                className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 flex flex-col items-center text-center shadow-sm hover:scale-102 transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} text-white flex items-center justify-center text-2xl shadow-md mb-2 relative`}>
                  {badge.emoji}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                  </div>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800">{badge.name}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{badge.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="w-full mt-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md active:scale-95"
          >
            Tutup
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
