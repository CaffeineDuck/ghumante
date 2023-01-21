const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getStorage = (key) => {
  return localStorage.getItem(key);
};

const removeStorage = (key) => {
  return localStorage.removeItem(key);
};

export { setStorage, getStorage, removeStorage };
