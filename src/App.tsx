import React, { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { MainMenu } from './components/MainMenu';
import { BubblePopGame } from './components/games/BubblePopGame';
import { ShapeMatchGame } from './components/games/ShapeMatchGame';
import { AnimalSafariGame } from './components/games/AnimalSafariGame';
import { GlowPaintGame } from './components/games/GlowPaintGame';
import { ParentalGateModal } from './components/common/ParentalGateModal';
import { SettingsModal } from './components/common/SettingsModal';
import { OrientationPrompt } from './components/common/OrientationPrompt';

export const App: React.FC = () => {
  const { currentScreen } = useGameStore();

  // Prevent default context menu, accidental scrolling & zooming for toddlers
  useEffect(() => {
    const preventDefaultTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault(); // prevent pinch-to-zoom
      }
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener('touchstart', preventDefaultTouch);
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);

  return (
    <main className="w-full h-full min-h-[100dvh] max-h-[100dvh] overflow-hidden relative select-none touch-none">
      {currentScreen === 'menu' && <MainMenu />}
      {currentScreen === 'bubble-pop' && <BubblePopGame />}
      {currentScreen === 'shape-match' && <ShapeMatchGame />}
      {currentScreen === 'animal-safari' && <AnimalSafariGame />}
      {currentScreen === 'glow-paint' && <GlowPaintGame />}

      <ParentalGateModal />
      <SettingsModal />
      <OrientationPrompt />
    </main>
  );
};

export default App;
