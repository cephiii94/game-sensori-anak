import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../audio/soundManager';

interface EditChildNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditChildNameModal: React.FC<EditChildNameModalProps> = ({ isOpen, onClose }) => {
  const { childName, setChildName } = useGameStore();
  const [nameInput, setNameInput] = useState(childName);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      sound.playCelebration();
      setChildName(nameInput.trim());
      onClose();
    }
  };

  const suggestions = ['Aaliyah', 'Alvaro', 'Kenzo', 'Mikayla', 'Arka', 'Luna'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border-4 border-purple-300 text-slate-800"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Nama Petualang Cilik</h3>
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

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Ketik nama panggilan anak:
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={16}
                autoFocus
                placeholder="Contoh: Aaliyah"
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg font-bold text-purple-900 bg-purple-50/50"
              />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Pilihan Cepat:</span>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setNameInput(s);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      nameInput === s
                        ? 'bg-purple-600 text-white border-purple-600 font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  onClose();
                }}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Simpan</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
