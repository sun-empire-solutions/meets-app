const saveToStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

const getFromStorage = (key: string) => JSON.parse(localStorage.getItem(key));

const removeFromStorage = (key: string) => localStorage.removeItem(key);

const clearStorage = () => localStorage.clear();

export { saveToStorage, getFromStorage, removeFromStorage, clearStorage };
