import { useState, useEffect, useCallback } from "react";
import { getAllUsers, searchUsers } from "./services/users";
import UsersList from "./components/UsersList";
import Search from "./components/ui/Search";
import Loader from "./components/ui/Loader";
import "./App.css";

function App() {
  const [info, setInfo] = useState({ data: [], error: null, isLoading: false });
  const [searchTerm, setSearchTerm] = useState('');

  const getUsers = useCallback(async () => {
    setInfo((prev) => ({ ...prev, isLoading: true }));
    try {
      const data = await getAllUsers();
      setInfo({ data: data.users, isLoading: false });
    } catch (error) {
      setInfo({ error: error, isLoading: false });
    }
  }, []);

  useEffect(() => {
    getUsers();
    const interval = setInterval(getUsers, 160 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [getUsers]);

  const handleSearch = async () => {
    try {
      const users = await searchUsers(searchTerm);
    } catch (error) {
      console.error(`Ошибка при поиске: ${searchTerm}:`, error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (info.isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <Search onSearch={(value) => setSearchTerm(value)}/>
      </div>
      <UsersList users={info.data} />
    </div>
  );
}

export default App;
