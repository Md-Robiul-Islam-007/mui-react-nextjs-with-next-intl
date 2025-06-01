// utils/settingsStorage.ts
export const loadSettingsFromStorage = () => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('appSettings');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveSettingsToStorage = (settings: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('appSettings', JSON.stringify(settings));
};

export const clearSettingsFromStorage = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('appSettings');
};
