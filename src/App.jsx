import { useState } from "react";
import './App.css'

function App() {
  const [searchText, setSearchText] = useState("");

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  const autoComplete = (searchType, query, typeOf) => {
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhZDk0OTA3MjE1ZTExN2ZiM2E2ODUxZTA5ZTExYyIsInN1YiI6IjYxYzU4MTk5ZTcyZmU4MDA4NTcyZmIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95IxkLrZnLinOPUjX0ppd1XSzVDwDIvKA0QYlUHfjF0",
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${searchType}/${typeOf}${query}`,
      options
    )
      .then((response) => response.json())
      .then((data) => setCurrentSearch([data.results]))
      .catch((err) => console.error(err));
  };

  const getList = (searchType, query) => {
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhZDk0OTA3MjE1ZTExN2ZiM2E2ODUxZTA5ZTExYyIsInN1YiI6IjYxYzU4MTk5ZTcyZmU4MDA4NTcyZmIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95IxkLrZnLinOPUjX0ppd1XSzVDwDIvKA0QYlUHfjF0",
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    fetch(`https://api.themoviedb.org/3/${searchType}/${query}`, options)
      .then((response) => response.json())
      .then((data) => setCurrentSearch([data.items]))
      .catch((err) => console.error(err));
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
