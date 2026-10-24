import { create } from 'zustand';
import { sound } from '../audio/soundManager';

export type GameScreen = 'menu' | 'bubble-pop' | 'shape-match' | 'animal-safari' | 'glow-paint';
export type OrientationMode = 'auto' | 'landscape' | 'portrait';
export type SidebarTab = 'home' | 'games' | 'progress' | 'badges' | 'favorites';

interface GameState {
  currentScreen: GameScreen;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  parentalGateOpen: boolean;
  settingsModalOpen: boolean;
  orientationMode: OrientationMode;
  pendingAction: (() => void) | null;

  // Dashboard state & stats
  childName: string;
  stars: number;
  dayStreak: number;
  badgesCount: number;
  playedGamesCount: number;
  favorites: GameScreen[];
  activeTab: SidebarTab;

  setScreen: (screen: GameScreen) => void;
  toggleSound: () => void;
  toggleHaptic: () => void;
  setOrientationMode: (mode: OrientationMode) => void;
  openParentalGate: (onSuccess: () => void) => void;
  closeParentalGate: () => void;
  openSettings: () => void;
  closeSettings: () => void;

  setChildName: (name: string) => void;
  setActiveTab: (tab: SidebarTab) => void;
  toggleFavorite: (game: GameScreen) => void;
  addStars: (amount: number) => void;
  incrementPlayedGames: () => void;
}

const getStoredOrientation = (): OrientationMode => {
  if (typeof window === 'undefined') return 'auto';
  const saved = localStorage.getItem('sensori_orientation_mode');
  if (saved === 'landscape' || saved === 'portrait' || saved === 'auto') {
    return saved;
  }
  return 'auto';
};

const getStoredChildName = (): string => {
  if (typeof window === 'undefined') return 'Aaliyah';
  return localStorage.getItem('sensori_child_name') || 'Aaliyah';
};

const getStoredStars = (): number => {
  if (typeof window === 'undefined') return 1250;
  const val = localStorage.getItem('sensori_stars');
  return val ? parseInt(val, 10) : 1250;
};

const getStoredFavorites = (): GameScreen[] => {
  if (typeof window === 'undefined') return ['bubble-pop', 'glow-paint'];
  try {
    const raw = localStorage.getItem('sensori_favorites');
    return raw ? JSON.parse(raw) : ['bubble-pop', 'glow-paint'];
  } catch {
    return ['bubble-pop', 'glow-paint'];
  }
};

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'menu',
  soundEnabled: true,
  hapticEnabled: true,
  parentalGateOpen: false,
  settingsModalOpen: false,
  orientationMode: getStoredOrientation(),
  pendingAction: null,

  childName: getStoredChildName(),
  stars: getStoredStars(),
  dayStreak: 7,
  badgesCount: 18,
  playedGamesCount: 2,
  favorites: getStoredFavorites(),
  activeTab: 'home',

  setScreen: (screen: GameScreen) => {
    sound.playTap();
    if (screen !== 'menu') {
      get().incrementPlayedGames();
    }
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
      if (typeof window !== 'undefined' && 'screen' in window && screen.orientation) {
        const orientation = screen.orientation as unknown as { lock?: (m: string) => Promise<void>; unlock?: () => void };
        if (mode === 'auto') {
          if (typeof orientation.unlock === 'function') {
            orientation.unlock();
          }
        } else {
          if (typeof orientation.lock === 'function') {
            orientation.lock(mode).catch(() => {});
          }
        }
      }
    } catch {
      // Ignore orientation lock errors
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
  },

  setChildName: (name: string) => {
    try {
      localStorage.setItem('sensori_child_name', name);
    } catch {}
    set({ childName: name });
  },

  setActiveTab: (tab: SidebarTab) => {
    sound.playTap();
    set({ activeTab: tab });
  },

  toggleFavorite: (game: GameScreen) => {
    sound.playTap();
    const cur = get().favorites;
    const next = cur.includes(game) ? cur.filter(g => g !== game) : [...cur, game];
    try {
      localStorage.setItem('sensori_favorites', JSON.stringify(next));
    } catch {}
    set({ favorites: next });
  },

  addStars: (amount: number) => {
    const newStars = get().stars + amount;
    try {
      localStorage.setItem('sensori_stars', String(newStars));
    } catch {}
    set({ stars: newStars });
  },

  incrementPlayedGames: () => {
    const cur = get().playedGamesCount;
    const next = cur >= 3 ? 3 : cur + 1;
    set({ playedGamesCount: next });
  }
}));
