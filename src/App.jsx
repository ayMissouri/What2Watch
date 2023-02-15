import { useState } from "react";
import './App.css'

function App() {
  const [searchText, setSearchText] = useState("");

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          id="searchTextarea"
          onChange={onChange}
          value={searchText}
          placeholder="Search..."
          required
        />

        <select id="type-selector">
          <option value="multi">All</option>
          <option value="movie">Movies</option>
          <option value="tv">Tv Shows</option>
          <option value="person">People</option>
        </select>

        <button
          onClick={() => {
            if (searchText.length <= 0) {
              const textareaSearch = document.getElementById("searchTextarea");
              textareaSearch.classList.add("error");
              setTimeout(function () {
                textareaSearch.classList.remove("error");
              }, 300);
            } else {
              autoComplete("search", `?query=${searchText}`, selected.value);
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default App
