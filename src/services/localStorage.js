const localStorageQueue = [];
const CACHED_USERS_COUNT = 10;

// Чтение данных из localStorage
export function get(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Ошибка при чтении с локального хранилища', error);
    return null;
  }
};

// Запись данных в localStorage с учетом очереди
export function set(key, value) {
  try {
    if (localStorageQueue.length >= CACHED_USERS_COUNT) {
      const oldKey = localStorageQueue.shift();
      localStorage.removeItem(oldKey);
    }

    localStorage.setItem(key, JSON.stringify(value));
    localStorageQueue.push(key);
  } catch (error) {
    console.error('Ошибка при записи в локальное хранилище:', error);
  }
};

// Удаление данных из localStorage с учетом очереди
export function remove(key) {
  try {
    const index = localStorageQueue.indexOf(key);
    if (index !== -1) {
      localStorageQueue.splice(index, 1);
    }
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Ошибка при удалении из локального хранилища:', error);
  }
};

// Полная очистка localStorage и очереди
export function clear() {
  try {
    localStorage.clear();
    localStorageQueue.length = 0;
  } catch (error) {
    console.error('Ошибка при очистке локального хранилища:', error);
  }
};

export default { get, set, remove, clear }

