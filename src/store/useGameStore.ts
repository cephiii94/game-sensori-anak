import { create } from 'zustand';
import { sound } from '../audio/soundManager';

export type GameScreen = 'menu' | 'bubble-pop' | 'shape-match' | 'animal-safari' | 'glow-paint';
export type OrientationMode = 'auto' | 'landscape' | 'portrait';

interface GameState {
  currentScreen: GameScreen;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  parentalGateOpen: boolean;
  settingsModalOpen: boolean;
  orientationMode: OrientationMode;
  pendingAction: (() => void) | null;

  setScreen: (screen: GameScreen) => void;
  toggleSound: () => void;
  toggleHaptic: () => void;
  setOrientationMode: (mode: OrientationMode) => void;
  openParentalGate: (onSuccess: () => void) => void;
  closeParentalGate: () => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const getStoredOrientation = (): OrientationMode => {
  if (typeof window === 'undefined') return 'auto';
  const saved = localStorage.getItem('sensori_orientation_mode');
  if (saved === 'landscape' || saved === 'portrait' || saved === 'auto') {
    return saved;
  }
  return 'auto';
};

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'menu',
  soundEnabled: true,
  hapticEnabled: true,
  parentalGateOpen: false,
  settingsModalOpen: false,
  orientationMode: getStoredOrientation(),
  pendingAction: null,

  setScreen: (screen: GameScreen) => {
    sound.playTap();
    set({ currentScreen: screen });
  },

  toggleSound: () => {
    const next = !get().soundEnabled;
    sound.setSoundEnabled(next);
    if (next) sound.playTap();
    set({ soundEnabled: next });
  },

  toggleHaptic: () => {
    const next = !get().hapticEnabled;
    sound.setHapticEnabled(next);
    if (next) sound.triggerHaptic(30);
    set({ hapticEnabled: next });
  },

  setOrientationMode: (mode: OrientationMode) => {
    sound.playTap();
    try {
      localStorage.setItem('sensori_orientation_mode', mode);
      // Attempt browser screen orientation lock if supported
      if (typeof window !== 'undefined' && 'screen' in window && screen.orientation) {
        const orientation = screen.orientation as unknown as { lock?: (m: string) => Promise<void>; unlock?: () => void };
        if (mode === 'auto') {
          if (typeof orientation.unlock === 'function') {
            orientation.unlock();
          }
        } else {
          if (typeof orientation.lock === 'function') {
            orientation.lock(mode).catch(() => {
              // Browser may require fullscreen or user gesture, handled gracefully
            });
          }
        }
      }
    } catch {
      // Ignore localStorage or orientation errors
    }
    set({ orientationMode: mode });
  },

  openParentalGate: (onSuccess: () => void) => {
    set({ parentalGateOpen: true, pendingAction: onSuccess });
  },

  closeParentalGate: () => {
    set({ parentalGateOpen: false, pendingAction: null });
  },

  openSettings: () => {
    set({ settingsModalOpen: true });
  },

  closeSettings: () => {
    set({ settingsModalOpen: false });
  }
}));
