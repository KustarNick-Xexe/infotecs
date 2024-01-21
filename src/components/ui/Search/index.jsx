import { useState } from "react";
import "./search.scss";

const SearchComponent = ({ onSearch, ...props }) => {
  const [search, setSearch] = useState('');
  return (
    <div className="search-container" {...props}>
      <input
        type="text"
        placeholder="Введите некий текст"
        value={search}
        onChange={(e) => setSearch(e.target.value) }
        className="search-input"
      />
      <button onClick={() => onSearch(search)} className="search-button">
        Поиск
      </button>
    </div>
  );
};

export default SearchComponent;
