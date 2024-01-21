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
  
// Запись данных в localStorage
export function set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Ошибка при записи в локальное хранилище:', error);
  }
};
  
// Удаление данных из localStorage
export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Ошибка при удалении из локального хранилища:', error);
  }
};
  
export default { get, set, remove }
  