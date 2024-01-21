// Функция для выполнения GET запросов
export default async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error();
  }
  return await response.json();
}
