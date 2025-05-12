export const storage = {
  getItem: (key: string) => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  },

  setItem: (key: string, value: unknown): void =>
    localStorage.setItem(key, JSON.stringify(value)),

  removeItem: (key: string): void => localStorage.removeItem(key),

  clear: (): void => localStorage.clear(),
  clearSession: (): void => sessionStorage.clear(),
};

export const KEYS = {
  user: 'user',
  isAuthenticated: 'isAuthenticated',
  history: 'commandHistory',
} as const;
