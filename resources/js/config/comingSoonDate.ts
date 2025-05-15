// Date de lancement (format: YYYY-MM-DD)
export const COMING_SOON_DATE = new Date('2025-06-30T23:59:59');

// Fonction pour vérifier si la date est passée
export const isLaunchDatePassed = (): boolean => {
  const now = new Date();
  return now >= COMING_SOON_DATE;
}; 