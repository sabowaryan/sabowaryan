declare global {
  interface Window {
    __: (key: string, replace?: Record<string, string>) => string;
  }
}

export const __ = (key: string, replace?: Record<string, string>): string => {
  const translation = window.__(key, replace);
  return translation || key;
}; 