import { useState, useEffect, useCallback } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollDirection {
  horizontal: 'none' | 'left' | 'right';
  vertical: 'none' | 'up' | 'down';
}

interface UseWindowScrollOptions {
  throttleTime?: number;
  initialPosition?: ScrollPosition;
}

interface UseWindowScrollReturn {
  scrollPosition: ScrollPosition;
  scrollDirection: ScrollDirection;
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollTo: (options: ScrollToOptions) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollY: number;
}

/**
 * Hook personnalisé pour gérer le défilement de la fenêtre
 * 
 * @param options Configuration optionnelle du hook
 * @returns Objet contenant les informations et méthodes de défilement
 */
export function useWindowScroll(options?: UseWindowScrollOptions): UseWindowScrollReturn {
  const throttleTime = options?.throttleTime ?? 100;
  const initialPosition = options?.initialPosition ?? { x: 0, y: 0 };

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(initialPosition);
  const [prevScrollPosition, setPrevScrollPosition] = useState<ScrollPosition>(initialPosition);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>({
    horizontal: 'none',
    vertical: 'none',
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Fonction pour calculer la position de défilement actuelle
  const getScrollPosition = useCallback((): ScrollPosition => {
    return {
      x: window.scrollX || window.pageXOffset,
      y: window.scrollY || window.pageYOffset,
    };
  }, []);

  // Fonction pour déterminer la direction du défilement
  const getScrollDirection = useCallback((current: ScrollPosition, previous: ScrollPosition): ScrollDirection => {
    return {
      horizontal: 
        current.x === previous.x ? 'none' :
        current.x > previous.x ? 'right' : 'left',
      vertical: 
        current.y === previous.y ? 'none' :
        current.y > previous.y ? 'down' : 'up',
    };
  }, []);

  // Gestionnaire d'événement de défilement avec limitation de débit (throttling)
  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    // Réinitialiser le délai de défilement
    if (window.scrollTimeoutId) {
      window.clearTimeout(window.scrollTimeoutId);
    }

    window.scrollTimeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, throttleTime);

    const currentPosition = getScrollPosition();
    
    // Mise à jour de la position de défilement
    setScrollPosition(currentPosition);
    
    // Mise à jour de la direction du défilement
    setScrollDirection(getScrollDirection(currentPosition, prevScrollPosition));
    
    // Mise à jour de la position précédente
    setPrevScrollPosition(currentPosition);
    
    // Vérification si la page est en haut ou en bas
    setIsAtTop(currentPosition.y <= 0);
    setIsAtBottom(
      Math.ceil(window.innerHeight + currentPosition.y) >= 
      document.documentElement.scrollHeight
    );
  }, [getScrollDirection, getScrollPosition, prevScrollPosition, throttleTime]);

  // Fonction pour faire défiler vers une position spécifique
  const scrollTo = useCallback((options: ScrollToOptions) => {
    window.scrollTo(options);
  }, []);

  // Fonction pour faire défiler vers le haut de la page
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fonction pour faire défiler vers le bas de la page
  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  // Configurer les écouteurs d'événements et les nettoyer
  useEffect(() => {
    // Configuration du gestionnaire initial
    const initialPosition = getScrollPosition();
    setScrollPosition(initialPosition);
    setPrevScrollPosition(initialPosition);
    setIsAtTop(initialPosition.y <= 0);
    
    // Ajouter un délai pour la limitation de débit (throttling)
    let throttleTimeout: NodeJS.Timeout | number | null = null;
    
    const throttledScrollHandler = () => {
      if (!throttleTimeout) {
        throttleTimeout = window.setTimeout(() => {
          throttleTimeout = null;
          handleScroll();
        }, throttleTime);
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
      if (window.scrollTimeoutId) {
        clearTimeout(window.scrollTimeoutId);
      }
    };
  }, [getScrollPosition, handleScroll, throttleTime]);

  return {
    scrollPosition,
    scrollDirection,
    isScrolling,
    isAtTop,
    isAtBottom,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollY: scrollPosition.y,
  };
}

// Ajouter cette déclaration pour éviter les erreurs TypeScript avec la propriété scrollTimeoutId
declare global {
  interface Window {
    scrollTimeoutId: ReturnType<typeof setTimeout>;
  }
} 