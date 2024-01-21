import fetchData from '../utils/fetchData';

// Получение всех пользователей
export async function getAllUsers() {
  try {
    const users = await fetchData("https://dummyjson.com/users");
    return users;
  } catch (error) {
    console.error("Ошибка при получении всех пользователей:", error);
  }
}

// Получение пользователя по id
export async function getUserById(id) {
  try {
    const user = await fetchData(`https://dummyjson.com/users/${id}`);
    return user;
  } catch (error) {
    console.error(`Ошибка при получении пользователя с id=${id}:`, error);
  }
}

// Поиск пользователей по query params
export async function searchUsers(query) {
  try {
    const users = await fetchData(`https://dummyjson.com/users/search?q=${query}`);
    return users;
  } catch (error) {
    console.error(`Ошибка при поиске: ${query}:`, error);
  }
}

export default { getAllUsers, getUserById, searchUsers };
