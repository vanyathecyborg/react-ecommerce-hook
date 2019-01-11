export const createStorageMethods = (key: string) => {
  if (!localStorage) {
    throw Error('localStorage is not available');
  }

  return {
    set: value => {
      const stringified = JSON.stringify(value);
      localStorage.setItem(key, stringified);
    },
    get: () => {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    },
  };
};
