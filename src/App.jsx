import { useState, useEffect, useCallback } from "react";
import { getAllUsers, searchUsers } from "./services/users";
import { clear } from "./services/localStorage";
import UsersList from "./components/UsersList";
import Search from "./components/ui/Search";
import Loader from "./components/ui/Loader";
import "./App.css";

function App() {
  const [info, setInfo] = useState({ data: [], error: null, isLoading: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const updateInfo = (updates) => {
    if(modalIsOpen) return;
    setInfo((prev) => ({ ...prev, ...updates }));
  };

  const handleOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

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

  const getUsers = useCallback(() => {
    if (searchTerm || modalIsOpen) {
      return;
    }
    fetchUsers(getAllUsers);
  }, [searchTerm, modalIsOpen]);

  const handleSearch = useCallback(() => {
    if (!searchTerm || modalIsOpen) {
      getUsers();
      return;
    }
    fetchUsers(searchUsers, searchTerm);
  }, [searchTerm, getUsers, modalIsOpen]);

  useEffect(() => {
    getUsers();
    const interval = setInterval(getUsers, 30 * 1000);
    return () => clearInterval(interval);
  }, [getUsers]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <div className="app-container">
      <Search onSearch={(value) => setSearchTerm(value)} />
      {info.isLoading ? <Loader /> : <UsersList users={info.data} onOpenModal={handleOpenModal}/>}
    </div>
  );
}

export default App;
