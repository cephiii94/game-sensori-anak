import { create } from 'zustand';
import { sound } from '../audio/soundManager';

export type GameScreen = 'menu' | 'bubble-pop' | 'shape-match' | 'animal-safari' | 'glow-paint';

interface GameState {
  currentScreen: GameScreen;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  parentalGateOpen: boolean;
  pendingAction: (() => void) | null;

  setScreen: (screen: GameScreen) => void;
  toggleSound: () => void;
  toggleHaptic: () => void;
  openParentalGate: (onSuccess: () => void) => void;
  closeParentalGate: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'menu',
  soundEnabled: true,
  hapticEnabled: true,
  parentalGateOpen: false,
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

  openParentalGate: (onSuccess: () => void) => {
    set({ parentalGateOpen: true, pendingAction: onSuccess });
  },

  closeParentalGate: () => {
    set({ parentalGateOpen: false, pendingAction: null });
  }
}));
