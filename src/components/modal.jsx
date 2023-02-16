import React, { useEffect, useState } from "react";
import "./modal.scss";

function Modal({ closeModal, selectedMovie }) {
    
  const [movieDetails, setMovieDetails] = useState([]);

  const getDetails = (searchType, id) => {
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhZDk0OTA3MjE1ZTExN2ZiM2E2ODUxZTA5ZTExYyIsInN1YiI6IjYxYzU4MTk5ZTcyZmU4MDA4NTcyZmIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95IxkLrZnLinOPUjX0ppd1XSzVDwDIvKA0QYlUHfjF0",
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    fetch(`https://api.themoviedb.org/3/${searchType}/${id}`, options)
      .then((response) => response.json())
      .then((data) => setMovieDetails([data]))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (selectedMovie.type === "movie") {
      getDetails("movie", selectedMovie.id);
    } else if (selectedMovie.type === "tv") {
      getDetails("tv", selectedMovie.id);
    } else if (selectedMovie.type === "person") {
      getDetails("person", selectedMovie.id);
    }
  });

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">
          <div className="movie-card">
            <div className="container">
              <a href="#">
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.cover}`}
                  alt="cover"
                  className="cover"
                  width="26%"
                />
              </a>

              <div className="hero">
                <button className="closebtn" onClick={() => closeModal(false)}>
                  ❌ Close
                </button>
                <div className="details">
                  <div className="title1">
                    {movieDetails.length > 0
                      ? movieDetails[0].title || movieDetails[0].name
                      : ""}
                  </div>
                  <div className="title2">
                    {movieDetails.length > 0 ? movieDetails[0].tagline : ""}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <span className="ratingP">
                    {" "}
                    {movieDetails.length > 0
                      ? movieDetails[0].vote_average ? movieDetails[0].vote_average.toFixed(1) : 0
                      : ""}
                    /10
                  </span>{" "}
                  <span className="ratingAmount">
                    ({movieDetails.length > 0 ? movieDetails[0].vote_count ? movieDetails[0].vote_count : "There is no votes for people" : ""}
                    )
                  </span>
                </div>
              </div>

              <div className="description">
                <div className="column1">
                  {movieDetails.length > 0
                    ? movieDetails[0].genres ? movieDetails[0].genres.map((genre, index) => {
                        return (
                          <p key={index} className="tag">
                            {genre.name}
                          </p>
                        );
                      }) : ""
                    : ""}
                </div>

                <div className="column2">
                  <p>
                    {movieDetails.length > 0 ? movieDetails[0].overview : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
