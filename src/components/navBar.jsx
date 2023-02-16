import React, { useState } from "react";
import "./navbar.css";

const Navbar = (props) => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div style={{ width: "100%" }}>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>

      <div className={menu_class}>
        <div className="buttonsInNav">
          <p className="navCtg">Movies</p>
          <a
            className="navBtn"
            onClick={() => {
              props.getList("list", "8240710");
              updateMenu();
            }}
          >
            Top Rated
          </a>
          <a
            className="navBtn"
            onClick={() => {
              props.autoComplete("trending", "week", "movie/");
              updateMenu();
            }}
          >
            Trending
          </a>
          <a
            className="navBtn"
            onClick={() => {
              props.getList("list", "8240737");
              updateMenu();
            }}
          >
            Top Grossing
          </a>
          {/* TODO: Implement random Movie on click */}
          <a className="navBtn" onClick={() => {}}>
            Random
          </a>
          <p className="navCtg">Tv Shows</p>
          <a
            className="navBtn"
            onClick={() => {
              props.getList("list", "8240728");
              updateMenu();
            }}
          >
            Top Rated
          </a>
          <a
            className="navBtn"
            onClick={() => {
              props.autoComplete("trending", "week", "tv/");
              updateMenu();
            }}
          >
            Trending
          </a>
          {/* TODO: Implement random Tv Show on click */}
          <a className="navBtn" onClick={() => {}}>
            Random
          </a>
        </div>
      </div>
    </div>
  );
};

export default {Navbar, updateMenu};
