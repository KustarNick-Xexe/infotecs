import { useState, useEffect, useCallback } from "react";
import { getAllUsers, searchUsers } from "./services/users";
import UsersList from "./components/UsersList";
import Search from "./components/ui/Search";
import Loader from "./components/ui/Loader";
import "./App.css";

function App() {
  const [info, setInfo] = useState({ data: [], error: null, isLoading: false });
  const [searchTerm, setSearchTerm] = useState('');

  // загрузка данных 
  const updateInfo = (updates) => {
    setInfo((prev) => ({ ...prev, ...updates }));
  };

  const fetchUsers = async (fetchFunction, args) => {
    updateInfo({ isLoading: true });
    try {
      const data = await fetchFunction(args);
      updateInfo({ data: data.users, isLoading: false });
    } catch (error) {
      console.error(`Ошибка:`, error);
      updateInfo({ error: error, isLoading: false });
    }
  };

  // если веден поиск, активна сортировка, открыто окно запросы не идут
  const getUsers = useCallback(() => {
    if (searchTerm) {
      return;
    }
    fetchUsers(getAllUsers);
  }, [searchTerm]);

  const handleSearch = useCallback(() => {
    if (!searchTerm) {
      getUsers();
      return;
    }
    fetchUsers(searchUsers, searchTerm);
  }, [searchTerm, getUsers]);

  // загружаем свежие данные
  useEffect(() => {
    getUsers();
    const interval = setInterval(getUsers, 30 * 1000);
    return () => clearInterval(interval);
  }, [getUsers]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="app-container">
      <Search onSearch={(value) => setSearchTerm(value)} />
      {info.isLoading ? <Loader /> : <UsersList users={info.data} />}
    </div>
  );
}

export default App;
