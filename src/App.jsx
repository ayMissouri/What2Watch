import { useState } from "react";
import "./App.css";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import * as data from "../TOKEN.json";

function App() {
  const [currentSearch, setCurrentSearch] = useState();
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState([]);

  const token = data.TOKEN;

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  const autoComplete = (searchType, query, typeOf) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    fetch(`https://api.themoviedb.org/3/${searchType}/${query}`, options)
      .then((response) => response.json())
      .then((data) => setCurrentSearch([data.items]))
      .catch((err) => console.error(err));
  };

  const selected = document.getElementById("type-selector");

  return (
    <div className="App">
      {openModal && (
        <Modal closeModal={setOpenModal} selectedMovie={selectedMovie} />
      )}

      <Navbar autoComplete={autoComplete} getList={getList} />

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
      
      <div className="content">
        <ul id="list">
          {currentSearch
            ? currentSearch[0].map((item, index) => {
                const name = item.name ? item.name : item.title;

                let poster = "";
                if (
                  item.poster_path !== undefined &&
                  item.poster_path !== null
                ) {
                  poster = `https://image.tmdb.org/t/p/original/${item.poster_path}`;
                } else if (
                  item.profile_path !== undefined &&
                  item.profile_path !== null
                ) {
                  poster = `https://image.tmdb.org/t/p/original/${item.profile_path}`;
                } else {
                  poster =
                    "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png";
                }

                let year = "";
                if (
                  item.first_air_date !== undefined &&
                  item.first_air_date.length > 3
                ) {
                  year = `(${item.first_air_date.toString().slice(0, 4)})`;
                } else if (
                  item.release_date !== undefined &&
                  item.release_date.length > 3
                ) {
                  year = `(${item.release_date.toString().slice(0, 4)})`;
                } else {
                  year = "";
                }
                const type = item.media_type
                  ? `(${item.media_type.toUpperCase()})`
                  : "";
                return (
                  <li
                    key={index}
                    className="listItem"
                    onClick={() => {
                      setSelectedMovie((selectedMovie) => ({
                        ...selectedMovie,
                        cover: poster,
                        id: item.id,
                        type:
                          item.media_type === undefined
                            ? selected.value
                            : item.media_type,
                      }));
                      setOpenModal(true);
                    }}
                  >
                    <img src={poster} alt={name} /> <h2>{name}</h2>{" "}
                    <p>{year}</p>
                    <span>{type}</span>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default App;
